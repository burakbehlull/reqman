import { ContentHeader, TabsContent } from "@components";
import { useState, ChangeEvent } from "react";
import Request from "@request";

interface FileGroup {
  fieldName: string;
  files: File[];
}

interface FormState {
  json: string;
  uri: string;
  method: string;
  headers: Record<string, string>;
  queries: Record<string, string>;
  files: FileGroup[];
}

function Container() {
  const [form, setForm] = useState<FormState>({
    json: "{}",
    uri: "http://",
    method: "GET",
    headers: {},
    queries: {},
    files: []
  });

  const [response, setResponse] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    const request = new Request();
    let dataToSend: any;
    let isFormData = false;

    const hasFiles =
      Array.isArray(form.files) &&
      form.files.some((group) => group.files && group.files.length > 0);

    if (hasFiles) {
      isFormData = true;
      const formData = new FormData();

      try {
        const parsed = JSON.parse(form.json);
        for (const [key, value] of Object.entries(parsed)) {
          formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
        }
      } catch (err) {
        console.warn("JSON parse edilemedi:", err);
      }

      form.files.forEach((group) => {
        if (!group.fieldName) return;
        group.files.forEach((file) => {
          formData.append(group.fieldName, file);
        });
      });

      dataToSend = formData;
    } else {
      try {
        dataToSend = JSON.parse(form.json);
      } catch (err) {
        console.warn("Geçersiz JSON:", err);
        dataToSend = {};
      }
    }

    try {
      const res = await request.send(form.method, form.uri, {
        params: form.queries,
        data: dataToSend,
        config: {
          headers: {
            ...form.headers,
            ...(isFormData ? {} : { "Content-Type": "application/json" })
          }
        }
      });

      const parseResponse = JSON.stringify(res, null, 2);
      setResponse(parseResponse);
    } catch (error: any) {
      setResponse(error?.message || "Bir hata oluştu");
    }
  }

  return (
      
    <div className="h-[20%] p-2 rounded-md">
          <ContentHeader handleChange={handleChange} handleSubmit={handleSubmit} values={form} />
        </div>

        <div className="h-[80%] mt-4 flex flex-row gap-4">
          <div className="flex-1 p-2 rounded-md">
            <TabsContent handleChange={handleChange} values={form} setter={setForm} />
          </div>

          <div className="flex-1 p-2 rounded-md">
            <textarea
              name="response"
              className="resize-none textarea h-[95%] w-[90%]"
              value={response}
              readOnly
            ></textarea>
          </div>
    </div>
    
  );
}

export default Container;

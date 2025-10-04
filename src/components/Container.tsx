import { Sidebar, ContentHeader, TabsContent } from "@components";
import { useState } from "react"

import Request from "@request"

function Container() {

  const [form, setForm] = useState({
    json: '{}',
    uri: 'http://',
    method: 'GET',
	headers: {},
	files: []
  })

  const [response, setResponse] = useState()

  const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit() {
	  const request = new Request();
	  let dataToSend;
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
			formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
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
		const response = await request.send(form.method, form.uri, {
		  data: dataToSend,
		  config: {
			headers: {
			  ...form.headers,
			  ...(isFormData ? {} : { "Content-Type": "application/json" }),
			},
		  },
		});

		const parseResponse = JSON.stringify(response, null, 2);
		setResponse(parseResponse);
	  } catch (error) {
		setResponse(error.message);
	  }
	}


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-[80wh] p-4">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="h-[20%] p-2 rounded-md">
          <ContentHeader 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={form}
          />
        </div>

        <div className="h-[80%] mt-4 flex flex-row gap-4">
		  
          <div className="flex-1 p-2 rounded-md">
			<TabsContent 
				handleChange={handleChange}
				values={form}
				setter={setForm}
				
			/>
          </div>
          <div className="flex-1 p-2 rounded-md">
            <textarea
              name="response"
              className="resize-none textarea h-[95%] w-[90%]" 
              value={response}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;

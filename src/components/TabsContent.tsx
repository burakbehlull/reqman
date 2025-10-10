import { TabUI, DynamicInputs } from "@components";
import { useState, useEffect } from "react";

export default function TabsContent({ values, handleChange, setter }) {
  const [rows, setRows] = useState([{ key: null, content: null }]);
  const [queries, setQueries] = useState([{ key: null, content: null }]);
  const [fileGroups, setFileGroups] = useState([
    { fieldName: "file", files: [] },
  ]);

  const headerParser = () => {
    if (rows.length > 0) {
      const obj = rows.reduce((acc, item) => {
        if (item.key) acc[item.key] = item.content;
        return acc;
      }, {});
      return obj;
    }
  };
  
  const queryParser = () => {
    if (queries.length > 0) {
      const obj = queries.reduce((acc, item) => {
        if (item.key) acc[item.key] = item.content;
        return acc;
      }, {});
      return obj;
    }
  };

  useEffect(() => {
    const headerParsed = headerParser();
    setter({ ...values, headers: headerParsed });
  }, [rows]);
  
  useEffect(() => {
    const queryParsed = queryParser();
    setter({ ...values, queries: queryParsed });
  }, [queries]);

  const handleFileChange = (index, e) => {
    const selected = Array.from(e.target.files);
    const updatedGroups = [...fileGroups];
    updatedGroups[index].files = selected;
    setFileGroups(updatedGroups);
    setter({ ...values, files: updatedGroups });
  };

  const handleAddFileField = () => {
    setFileGroups([...fileGroups, { fieldName: "", files: [] }]);
  };

  const handleRemoveFileField = (index) => {
    const filtered = fileGroups.filter((_, i) => i !== index);
    setFileGroups(filtered.length ? filtered : [{ fieldName: "file", files: [] }]);
  };

  const handleFieldNameChange = (index, e) => {
    const updated = [...fileGroups];
    updated[index].fieldName = e.target.value;
    setFileGroups(updated);
    setter({ ...values, files: updated });
  };

  return (
    <>
      <TabUI
        tabs={[
          {
            name: "body",
            content: (
              <textarea
                name="json"
                className="resize-none textarea h-[95%] w-[90%]"
                placeholder="JSON"
                value={values.json}
                onChange={handleChange}
              ></textarea>
            ),
          },
          {
            name: "headers",
            content: <DynamicInputs rows={rows} setRows={setRows} />,
          },
		  {
            name: "queries",
            content: <DynamicInputs rows={queries} setRows={setQueries} />
          },
          {
            name: "files",
            content: (
              <div className="flex flex-col gap-3">
                {fileGroups.map((group, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="input input-sm w-[10rem]"
                      placeholder="Alan adı (ör: avatar)"
                      value={group.fieldName}
                      onChange={(e) => handleFieldNameChange(index, e)}
                    />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(index, e)}
                      className="file-input file-input-bordered file-input-sm w-full"
                    />
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleRemoveFileField(index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-sm btn-neutral mt-2"
                  onClick={handleAddFileField}
                >
                  ➕ Yeni alan ekle
                </button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}

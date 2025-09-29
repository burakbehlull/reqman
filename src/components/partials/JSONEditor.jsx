import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function JSONEditor() {
  const [jsonValue, setJsonValue] = useState(`{
  "name": "Burak",
  "age": 25
}`);
  const [error, setError] = useState(null);

  const handleEditorChange = (value) => {
    setJsonValue(value);

    try {
      JSON.parse(value); // JSON geçerli mi kontrol et
      setError(null);
    } catch (err) {
      setError(err.message); // Hata varsa göster
    }
  };

  const handleButtonClick = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      alert("JSON objesi geçerli! Konsola yazıldı.");
      console.log(parsed);
    } catch (err) {
      alert("Hatalı JSON: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ height: "400px", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={jsonValue}
          onChange={handleEditorChange}
          theme="vs" // beyaz tema
          options={{
            minimap: { enabled: false },
            formatOnPaste: true,
            formatOnType: true,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      {error && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Hatalı JSON: {error}
        </div>
      )}

      <button onClick={handleButtonClick} style={{ padding: "8px 12px", borderRadius: "6px" }}>
        JSON'ı Al / Konsola Yaz
      </button>
    </div>
  );
}

export default JSONEditor;

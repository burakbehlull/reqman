
export default function DynamicInputs({ rows, setRows }) {
  

  const handleChange = (index, e) => {
    const newRows = [...rows]
    newRows[index][e.target.name] = e.target.value
    setRows(newRows)
  }

  const handleAdd = () => {
    setRows([...rows, { key: null, content: null }])
  }

  const handleRemove = (index) => {
    const newRows = rows.filter((_, i) => i !== index)
    setRows(newRows.length ? newRows : [{ key: null, content: null }])
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, index) => (
        <div key={index} className="join w-full flex items-center gap-2">
          
          <input
            name="key"
            type="text"
            placeholder="key"
            className="input input-sm join-item w-[8rem]"
            value={row.key}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            name="content"
            type="text"
            placeholder="content"
            className="input input-sm join-item flex-1"
            value={row.content}
            onChange={(e) => handleChange(index, e)}
          />

          <button
            type="button"
            className="btn btn-sm btn-neutral join-item"
            onClick={handleAdd}
          >
            ➕
          </button>

          <button
            type="button"
            className="btn btn-sm btn-error join-item"
            onClick={() => handleRemove(index)}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  )
}
import { useState } from 'react'

function ContentHeader() {
  const [method, setMethod] = useState('GET')
  return (
    <div className="flex flex-row h-full justify-center items-center">
	  <div className="flex gap-4 w-full">
		
		<select name="method" value={method} onChange={(e)=> setMethod(e.target.value)} className="select-sm w-[10rem]">
		  <option disabled={true}>İstek Methodu</option>
		  <option value="GET">GET</option>
		  <option value="POST">POST</option>
		  <option value="PUT">PUT</option>
		  <option value="PATCH">PATCH</option>
		  <option value="DELETE">DELETE</option>
		</select>
	  
        <input
          type="text"
          placeholder="request url"
          className="input flex-1"
        />

        <button className="btn btn-neutral">
          İstek at
        </button>
      </div>
    </div>
  );
}

export default ContentHeader;

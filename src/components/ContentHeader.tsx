import { useState } from 'react'

function ContentHeader({handleChange, values, handleSubmit}) {
  
  return (
    <div className="flex flex-row h-full justify-center items-center">
	  <div className="flex gap-4 w-full">
		
		<select name="method" value={values.method} onChange={handleChange} className="select-sm w-[10rem]">
		  <option disabled={true}>İstek Methodu</option>
		  <option value="GET">GET</option>
		  <option value="POST">POST</option>
		  <option value="PUT">PUT</option>
		  <option value="PATCH">PATCH</option>
		  <option value="DELETE">DELETE</option>
		</select>
	  
        <input
          name="uri"
          type="text"
          placeholder="request url"
          className="input flex-1"
          value={values.uri}
          onChange={handleChange}
        />

        <button className="btn btn-neutral" onClick={handleSubmit}>
          İstek at
        </button>
      </div>
    </div>
  );
}

export default ContentHeader;

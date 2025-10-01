import { Sidebar, ContentHeader, TabsContent } from "@components";
import { useState } from "react"

import Request from "@request"

function Container() {

  const [form, setForm] = useState({
    json: '{}',
    uri: 'http://',
    method: 'GET',
  })

  const [response, setResponse] = useState()

  const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(){
      const parsed = JSON.parse(form.json)
      const request = new Request()
      const response = await request.send(form.method, form.uri, {
         data: parsed
      })
      const parseResponse = JSON.stringify(response)
      setResponse(parseResponse)
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

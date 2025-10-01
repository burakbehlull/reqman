import { TabUI, DynamicInputs } from "@components";
import { useState, useEffect } from "react"


export default function TabsContent({values, handleChange, setter}){
	const [rows, setRows] = useState([
		{ key: null, content: null }
	])
	const headerParser = ()=> {
		if(rows.length > 0){
			const obj = rows.reduce((acc, item) => {
			  acc[item.key] = item.content;
			  return acc;
			}, {});
			return obj
		}
		
	}
	useEffect(()=> {
		const parsed = headerParser()
		setter({...values, headers: parsed})
	},[rows])
	
	return(
		<>
		<TabUI 
				tabs={[
					{
						name: 'body',
						content: 
						<>
							<textarea
							  name="json"
							  className="resize-none textarea h-[95%] w-[90%]" 
							  placeholder="JSON"
							  value={values.json}
							  onChange={handleChange}
							></textarea>
						</>
					},
					{
						name: 'headers',
						content: <DynamicInputs rows={rows} setRows={setRows} />
						
					}
				]}
			/>
		</>
	)
}
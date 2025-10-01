import { TabUI } from "@components";

export default function TabsContent({values, handleChange}){
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
						name: 'he',
						content: 'he children'
					}
				]}
			/>
		</>
	)
}
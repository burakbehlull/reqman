export default function TabUI({
	tabs=[]
}){
	return (
		<>
			<div className="tabs tabs-lift">
				{tabs?.map((tab, i)=> <>
					<label className="tab">
						<input type="radio" name="my_tabs_4" />
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 me-2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
						{tab?.name}
					</label>
					<div className="tab-content bg-base-100 border-base-300 p-6">{tab?.content}</div>

				</>)}
			</div>
		</>
	)
}
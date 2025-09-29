import { Sidebar } from '@components'

function Container() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
	  <div className="w-full lg:basis-1/3 p-4">
		<Sidebar />
	  </div>

	  <div className="flex-1 bg-green-500 p-4">
		%70 Kutu
	  </div>
	</div>
  )
}

export default Container
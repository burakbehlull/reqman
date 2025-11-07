import { useRoutes } from 'react-router-dom'
import { RequestPage } from '@pages'

export default function Routes(){

    return useRoutes([
		{
			path: '/',
			element: <RequestPage />,
		},
		
	])
}


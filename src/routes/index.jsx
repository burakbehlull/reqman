import { useRoutes } from 'react-router-dom'
import { RequestPage, Settings } from '@pages'

export default function Routes(){

    return useRoutes([
		{
			path: '/',
			element: <RequestPage />,
		},
		{
			path: '/settings',
			element: <Settings />,
		},
		
	])
}


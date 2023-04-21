import { ReactNode } from 'react'
import Meta from './Meta'

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Meta />
			{children}
		</div>
	)
}

export default Layout

import { useState } from 'react'
import Container from './Container'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
		<Container />
    </>
  )
}

export default App
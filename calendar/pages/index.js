import Head from 'next/head'
import styles from '../styles/Home.module.css'


const aaa = async(email) => {
  const res = await fetch(`http://localhost:3000/api/hello?email=${email}`)
  const data = await res.json()
  console.log(data.name)
}

export default function Home() {
  aaa('testemail@gmail.com')
  return (
    <div>
      
    </div>
  )
}

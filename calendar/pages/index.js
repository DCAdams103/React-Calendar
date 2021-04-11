import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'

let data;

const getEntry = async(email) => {

  const res = await fetch(`http://localhost:3000/api/hello?email=${email}`)
  data = await res.json()

}

export default function Home() {
  const [dataToDisplay, setdataToDisplay] = useState(0)

  getEntry('testemail@gmail.com').then(function() {
    
    if(data.name.row != null)
    {
      setdataToDisplay(data.name.row.email)
    }
    else
    {
      console.log('Email not found')
    }
    
  })

  return (
    
    <div>
      {dataToDisplay}
    </div>
  )
}

import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import Image from 'next/image'
import {Grid, Box, Button, TextField} from '@material-ui/core'
import styles from '../styles/Home.module.css'
import {withStyles} from '@material-ui/core'
import logo from '../public/logo.png'


import firebase from 'firebase'

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   })
// }else {
//   firebase.app(); // if already initialized, use that one
// }

var db = firebase.firestore()

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, rgba(106,61,210,.5), rgba(61,66,210,.8))',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(106,61,210,.3)',
    minWidth: '10vw',
    marginBottom: '1vh',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);



export default function Home() {

  // .doc('') for custom id
  // db.collection('test').add({
  //   first: 'test',
  //   last: 'test'
  // }).then((docRef) => {
  //   console.log('doc written with ID: ', docRef.id)
  // }).catch((error) => {
  //   console.error('error adding document: ', error)
  // })

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const [error, setError] = useState(' ')
  const { authUser, loading } = useAuth()
  const { signInWithEmailAndPassword } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading && authUser){
      router.push('/LoggedIn')
    }
  }, [authUser, loading])
  
  return (
    
    <div className={styles.page}>
      
      <Box className={styles.logo}>
        <Image  src='/logo.png' width={1000} height={200} alt="Calendar" />
      </Box>

      <p className={styles.error}>{error}</p>
      
      <Grid container direction='column' alignItems='center' justifyContent='center' style={{minHeight:'48vh'}}>
        
        <div className={styles.borderBox} />
        
        <TextField style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Email'
              inputProps={{
                style: {
                  backgroundColor: 'rgba(0,0,0,.01)',
                  border:'1px solid black',
                  borderRadius: 3,
                }
        }} />

        <TextField style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Password'
          inputProps={{ 
            style: {
              backgroundColor: 'rgba(0,0,0,.01)',
              border:'1px solid black',
              borderRadius: 3,
            }
        }} />

        
        <StyledButton onClick={()=>{
          setError(null)
          signInWithEmailAndPassword(email, password)
          .then(authUser => {
            router.push('/LoggedIn')
          })
          .catch(error => {
            setError(error.message)
          })
        }}> 
          Login 
        </StyledButton>

        <p className={styles.or}> ---- Or ----</p>
        
        <StyledButton onClick={()=>{ router.push('/signup') }}> Sign Up </StyledButton>

      </Grid>
    </div>
    
  )
}

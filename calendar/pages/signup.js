import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import Image from 'next/image'
import {Grid, Box, Button, TextField} from '@material-ui/core'
import styles from '../styles/Home.module.css'
import {withStyles} from '@material-ui/core'
import firebase from 'firebase'

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

export default function SignUp() {

    const [email, setEmail] = useState('')
    const [passOne, setPassOne] = useState('')
    const [passTwo, setPassTwo] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()
    const { createUserWithEmailAndPassword } = useAuth() 

    return(
        <div className={styles.page}>
        
            <Box className={styles.logo}>
            <Image  src='/logo.png' width={1000} height={200} alt="Calendar" />
            </Box>

            <p className={styles.error}>{error}</p>
            
            <Grid container direction='column' alignItems='center' justifyContent='center' style={{minHeight:'48vh'}}>
            
                <div className={styles.borderBox} />
                
                <TextField onChange={e => setEmail(e.target.value) } style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Email'
                        inputProps={{
                        style: {
                            backgroundColor: 'rgba(0,0,0,.01)',
                            border:'1px solid black',
                            borderRadius: 3,
                        }
                }} />

                <TextField onChange={e => setPassOne(e.target.value) } style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Password'
                    inputProps={{ 
                    style: {
                        backgroundColor: 'rgba(0,0,0,.01)',
                        border:'1px solid black',
                        borderRadius: 3,
                    }
                }} />

                <TextField onChange={e => setPassTwo(e.target.value) } style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Confirm Password'
                    inputProps={{ 
                    style: {
                        backgroundColor: 'rgba(0,0,0,.01)',
                        border:'1px solid black',
                        borderRadius: 3,
                    }
                }} />
                
                <StyledButton 
                onClick={() => {
                    console.log(email)
                    if(email === "" || null) { setError('Please enter your email.') }
                    if((passOne === '' || null) || (passTwo === '' | null)) { setError('Please enter your password.') }
                    if(passOne != passTwo) { setError('Passwords do not match.') } else {
                        createUserWithEmailAndPassword(email, passOne).then(authUser => {
                            console.log('Successful user creation')
                            router.push('/LoggedIn')
                        })
                        .catch(error => {
                            setError(error.message)
                        })
                    }
                    if(email && passOne && passTwo && (passOne === passTwo)) { setError('') }
                }}> 
                    Create Account 
                </StyledButton>

            </Grid>
        </div>
    )
}
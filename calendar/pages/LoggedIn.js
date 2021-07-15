import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import Image from 'next/image'
import {Grid, Box, Button, TextField} from '@material-ui/core'
import styles from '../styles/Home.module.css'
import {withStyles} from '@material-ui/core'
import firebase from 'firebase'


export default function LoggedIn(){

    const { authUser, loading, signOut } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !authUser)
        {
            router.push('/')
        }
    }, [authUser, loading])

    return(
        <div>
            <Button onClick={()=>{signOut()}}>Sign Out</Button>
        </div>
    )
}
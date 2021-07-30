import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthUserContext'
import Image from 'next/image'
import {Grid, Box, Button, TextField} from '@material-ui/core'
import styles from '../styles/LoggedIn.module.css'
import {withStyles} from '@material-ui/core'
import firebase from 'firebase'
import {StyledButton, DateBox} from '../lib/Components'

export default function LoggedIn(){

    const { authUser, loading, signOut } = useAuth()
    const router = useRouter()

    {/* if Firebase's authUser changes, it indicates the user has logged out, then they're sent to the Home page */}
    useEffect(() => {
        if (!loading && !authUser)
        {
            router.push('/')
        }
    }, [authUser, loading])

    {/* Get current date */}
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var fullDate = new Date()
    var month = monthNames[fullDate.getMonth()]
    var shownMonth = fullDate.getMonth();
    var day = fullDate.getDate()
    var year = fullDate.getFullYear();

    function leftNavClick()
    {
        shownMonth -= 1;
        if(shownMonth < 0) { shownMonth = 11; }
        if (shownMonth > 11) { shownMonth = 0; }
    }
    
    {/* Variable where the DateBoxes are stored */}
    var rows = []
    var isToday = false;

    {/* For Loop to put set amount of DateBoxes into the variable 'rows' */}
    for(var i = 1; i <= 31; i++ )
    {
        if(i == day) { isToday = true; } else { isToday = false; }
        rows.push(<DateBox number={i} highlight={isToday}></DateBox>)
    }

    return(
        <Box display="flex" >

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,200;1,400&display=swap');
            </style>

            {/* Left Side Menu w/ Sign Out button */}
            <Box width="100%" className={styles.sideMenu} component="div" >
                <StyledButton onClick={()=>{signOut()}}>Sign Out</StyledButton>
            </Box>

            {/* Main Content */}
            <Box className={styles.monthBox} component="div">

                <p className={styles.month}>{month} {year}</p>
                
                {/* Side Nav Bars */}
                <Box className={styles.leftNav} onClick={()=>{ leftNavClick() }}> {'<'} </Box>
                <Box className={styles.rightNav}> {'>'} </Box>

                <Box className={styles.dateRows} component="div" >

                    {rows}
                    
                </Box>

            </Box>
        </Box>
    )
}
import {Box, Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, TextField} from '@material-ui/core'
import {withStyles, makeStyles} from '@material-ui/core'
import React, {useState} from 'react';
import PropTypes from 'prop-types'
import styles from '../styles/LoggedIn.module.css'
import Image from 'next/image'

const DateBoxStyling = withStyles({
    root: {
        width: "100%",
        height: "100%",
        maxWidth: '18%',
        maxHeight: '19%',
        background: 'linear-gradient(45deg, rgba(106,61,210,.3), rgba(61,66,210,.3))',
        margin: '.5%',
        marginTop: '.5%',
        boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
        border: '1px solid rgba(0,0,0,.5)',
        borderRadius: '10px',
    }
})(Box)

const DateBoxStylingToday = withStyles({
    root: {
        width: "100%",
        height: "100%",
        maxWidth: '18%',
        maxHeight: '19%',
        background: 'linear-gradient(45deg, rgba(106,61,210,.7), rgba(61,66,210,.7))',
        margin: '.5%',
        marginTop: '.5%',
        boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
        border: '1px solid rgba(0,0,0,.5)',
        borderRadius: '10px',
    }
})(Box)

export const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, rgba(106,61,210,.3), rgba(61,66,210,.3))',
        border: '1px solid rgba(0,0,0,.5)',
        borderRadius: '10px',
        color: 'rgba(255,255,255,.8)',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
        minWidth: '10vw',
        marginBottom: '1vh',
        marginTop: '85vh',
        display:'block',
    },
})(Button);

function Parent(props) {
    const [lines, setLines] = useState([''])
    return lines.map(m => <Child key={m} caption={`Test ${m}`} pstate={{lines, setLines}}/> )
}

function Child(props)
{
    const {caption} = props;
    const {lines, setLines} = props.pstate;
    return <Button onClick={()=>{
        setLines([...lines, 'a'])
    }}>
        {caption}
    </Button>
}

const useStyles = makeStyles(theme => ({
    dialogWrapped: {
        backgroundColor: 'rgba(40,105,255,.8)',
        color: 'white',
    },
    dialogTitle: {
        paddingBottom: '0',
    },
    textField: {
        paddingTop: '0',
        color: 'white',
    },
    input: {
        paddingTop: '0',
    },
    label: {
        color: 'white',
    },
}))

function AddEventDialog(props)
{
    const classes = useStyles();
    const { onClose, inputValue, open } = props

    const handleClose = () => {
        onClose(inputValue)
    }

    const handleInputValue = (value) => { 
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogWrapped}}>
            <DialogTitle id='simple-dialog-title' classes={{ root: classes.dialogTitle}}>Add Event</DialogTitle>
            <DialogContent>
                <TextField className={classes.textField} onChange={(e)=>inputValue(e.target.value)} id='standard-basic' label='test' InputProps={{ classes: { input: classes.input }}} InputLabelProps={{ className: classes.label }} />
            </DialogContent>
        </Dialog>
    )
    
}

AddEventDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    inputValue: PropTypes.string.isRequired,
}

export function DateBox(props)
{
        var todo = []

        function addTodo(message)
        {
            // todo.push(<Box className={styles.todo}> Test </Box>)
            // console.log(todo)
            todo.push(<p>Test</p>)
        }

        const [open, setOpen] = useState(false)
        const [inputValue, setInputValue] = React.useState('')

        const handleOpen = () => {
            setOpen(true)
        }

        const handleClose = (value) => {
            setOpen(false)
            setInputValue(value)
        }

        if(props.highlight == true)
        {
            {/* Highlighted Box - indicating today's date */}
            return(
                <DateBoxStylingToday display='block' justifyContent='center'>
                    
                    <p className={styles.number}>
                        {props.number}
                        <Box className={styles.add}>
                            <Image src='/plus.png' width={16} height={16} alt="Add Event" />
                        </Box>
                    </p>
                    <Parent />
                </DateBoxStylingToday>
            )
        }
        else {

            {/* Non-highlighted Boxes */}
            return(
                <DateBoxStyling display='block' justifyContent='center'>

                    <AddEventDialog inputValue={''} open={open} onClose={handleClose} />

                    <p className={styles.number}>
                        {props.number}
                        <Box className={styles.add}>
                            <Image onClick={()=>{ handleOpen() }} src='/plus.png' width={16} height={16} alt="Add Event" />
                        </Box>
                    </p>
                    {todo}
                </DateBoxStyling>
            )
        }
    
}
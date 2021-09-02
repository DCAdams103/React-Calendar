import {Box, Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, ThemeProvider, createTheme} from '@material-ui/core'
import {withStyles, makeStyles} from '@material-ui/core'
import React, {useState} from 'react';
import PropTypes from 'prop-types'
import styles from '../styles/LoggedIn.module.css'
import Image from 'next/image'


{/* Styling for the Date Boxes using Material UI's Box component */}

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

{/* Styling for the current date's box */}

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

{/* A Styled Material UI Button component */}

export const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, rgba(106,61,210,.3), rgba(61,66,210,.3))',
        border: '1px solid rgba(0,0,0,.5)',
        borderRadius: '10px',
        color: 'rgba(255,255,255,1)',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0,0,0,.3)',
        minWidth: '10vw',
        marginBottom: '1vh',
        display:'block',
    },
})(Button);

{/* Parent and Child components for event components */}

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

{/* Create styles for dialog components */}

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

{/* Create a theme to change the TextFields focus color */}

const theme = createTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                "&$focused": {
                    color: 'white',
                }
            },

            focused: {},
        }
    }
})

var todo = []

{/* Functional component called when the plus is clicked to add an event */}
function AddEventDialog(props)
{
    const classes = useStyles();
    const { onClose, inputValue, open } = props
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleClose = () => {
        onClose(inputValue)
    }

    const handleInputValue = (value) => { 
        onClose(value)
    }


    {/* Modal Pop-up to input event details */}

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogWrapped}}>
            
            <DialogTitle id='simple-dialog-title' classes={{ root: classes.dialogTitle}}>Add Event</DialogTitle>
            <DialogContent>

               <ThemeProvider theme={theme}>
                    <TextField fullWidth onChange={ e => setTitle(e.target.value) } style={{paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Event Title'
                        InputProps={{ 
                            style: {
                                backgroundColor: 'rgba(0,0,0,.01)',
                                border:'1px solid rgba(255,255,255,.5)',
                                borderRadius: 10,
                                boxShadow: '0 1px 3px 1px rgba(0,0,0,.3)',
                                color: 'white',
                            },
                            disableUnderline: true,
                        }}
                        InputLabelProps={{ className: classes.label }}
                    />

                    <TextField fullWidth onChange={ e => setTitle(e.target.value) } style={{ paddingBottom:'2vh'}} id='filled-name' variant='filled' label='Event Description (Optional)'
                        InputProps={{ 
                            style: {
                                backgroundColor: 'rgba(0,0,0,.01)',
                                border:'1px solid rgba(255,255,255,.5)',
                                borderRadius: 10,
                                boxShadow: '0 1px 3px 1px rgba(0,0,0,.3)',
                                color: 'white',
                            },
                            disableUnderline: true,
                        }}
                        InputLabelProps={{ className: classes.label }}
                    />

                    {/* Add Event and Cancel buttons */}
                    <div style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                        <StyledButton style={{marginRight:'7%'}}>Add Event</StyledButton>
                        <StyledButton onClick={handleClose}>Cancel</StyledButton>
                    </div>

               </ThemeProvider>
               
               
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
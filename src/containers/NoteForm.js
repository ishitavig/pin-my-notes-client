import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper, TextField, Typography } from '@material-ui/core';  
import './MainPage.scss'
import axios from 'axios';

const NoteForm = (props) => {
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');

    const handleNoteCreate = async () => {
        props.saveNote({heading: heading, body: body}); 
        // Send POST request to 'notes/create' endpoint
        await axios
          .post(`http://localhost:5000/notes/create/${props.user ? props.user.userId : ''}`, {
            heading: heading,
            body: body
          })
          .then(res => {
            setHeading(''); 
            setBody('');
          })
          .catch(error => console.error(`There was an error creating the note ${heading} with error: ${error}`))
      }

    return (
        <Paper className='container-paper'>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                <Typography>
                    Heading
                </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setHeading(e.target.value)}} value={heading}/>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                    <Typography>
                        Note
                    </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setBody(e.target.value)}} value={body}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-6' style={{margin:'auto'}}>
                    <Button 
                        variant='outlined' 
                        color='secondary' 
                        style={{margin:30}}
                        onClick={() => {
                            setHeading(''); 
                            setBody('');
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        style={{margin:30}} 
                        onClick={async () => await handleNoteCreate()}>
                        Save
                    </Button>
                </div>
            </div>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user && state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NoteForm));
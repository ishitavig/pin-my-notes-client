import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import './MainPage.scss';
import Header from './Header';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { setUser } from '../redux-store/actions/users-action';

const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [access, setAccess] = useState(false);
    
    useEffect(() => {
        const fetchNotes = async (userId) => {
            axios
              .get(`http://localhost:5000/notes/${userId}`)
              .then(response => {
                setNotes(response.data);
              })
              .catch(error => console.error(`There was an error retrieving the notes list: ${error}`))
        }

        if(props.user && Object.keys(props.user).length !== 0 && props.user.constructor === Object) {
            setAccess(true);
            props.user && fetchNotes(props.user.userId)
        } else {
            setAccess(false);
        }
        
    },[access,props.user]);

    const handleLogout = async () => {
        localStorage.removeItem('user');
        await props.setUser({})
        window.location.href = '/'
    }

    return (
        <div className='main-container'>
            <Header />
            {access ? (
                <>
                    <NoteForm saveNote={(data) => setNotes([...notes,data])}/>
                    <div className='row' style={{margin:'auto',display: 'flex',justifyContent: 'center',marginTop:20}}>
                        <div className='col-4'>
                            <Button 
                                variant='contained' 
                                color='secondary' 
                                style={{margin:10}} 
                                onClick={() => handleLogout()}
                            >
                                Sign Out
                            </Button>
                        </div>
                    </div>
                    <div className='row' style={{margin:50}}>
                    {notes.map(note => (
                        <div key={note.noteId}>
                            <NoteCard note={note}/>
                        </div>
                    ))}
                    </div>
                </>
            ) : (
                <>
                <div>
                    <Typography style={{color:'white'}} variant='h6'>
                        You don't have access to this area. Please Sign In to start pinning your notes!
                    </Typography>
                    <div className='row' style={{margin:'auto',display: 'flex',justifyContent: 'center'}}>
                    <div className='col-2'>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            style={{margin:10}} 
                            onClick={() => props.history.push('/login')}
                        >
                            Sign In
                        </Button>
                    </div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user && state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => dispatch(setUser(data))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Notes));
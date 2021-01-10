import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import './MainPage.scss';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';

const Registration = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateUser = async () => {
        // Send POST request to 'users/create' endpoint
        await axios
          .post(`https://pin-my-notes-server.herokuapp.com/users/create`, {
            name: name,
            email: email,
            password: password
          })
          .then(res => {
            setName('');
            setEmail(''); 
            setPassword('');
          })
          .catch(error => console.error(`There was an error creating user ${email} note: ${error}`))
      }

    return (
        <div className='main-container'>
            <Header />
            <Paper className='container-paper' style={{height:350}}>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                <Typography style={{fontWeight:'bold'}} variant='h6'>
                    Name
                </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setName(e.target.value)}} value={name}/>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                <Typography style={{fontWeight:'bold'}} variant='h6'>
                    Email
                </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                    <Typography style={{fontWeight:'bold'}} variant='h6'>
                        Password
                    </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setPassword(e.target.value)}} value={password} />
                </div>
            </div>
            <div className='row' style={{margin:'auto',display: 'flex',justifyContent: 'center',marginTop:20}}>
                <div className='col-6'>
                    <Button 
                        variant='outlined' 
                        color='secondary' 
                        style={{margin:10}} 
                        onClick={() => props.history.push('/login')}>
                        Already a member? Sign In
                    </Button>
                </div>
                <div className='col-4'>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        style={{margin:10}} 
                        onClick={() => handleCreateUser()}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            </Paper>
        </div>
    )
}

export default withRouter(Registration);
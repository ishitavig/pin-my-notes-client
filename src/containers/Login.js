import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../redux-store/actions/users-action';
import './MainPage.scss';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import Header from './Header';
import axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Send POST request to 'users/login' endpoint
        await axios
          .post(`http://localhost:5000/users/login`, {
            email: email,
            password: password
          })
          .then(res => {
            if(res.data && res.data.token) {
                res.data && props.setUser(res.data)
                localStorage.setItem('user', res.data.token)
                props.history.push('/notes')
                setEmail(''); 
                setPassword('');
            }
          })
          .catch(error => console.error(`There was an error logging in user ${email} note: ${error}`))
      }

    return (
        <div className='main-container'>
            <Header />
            <Paper className='container-paper'>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                <Typography>
                    Email
                </Typography>
                </div>
                <div className='col-8' style={{marginTop:50}}>
                    <TextField style={{width:'100%'}} onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                </div>
            </div>
            <div className='row text-center'>
                <div className='col-3' style={{marginTop:50}}>
                    <Typography>
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
                        onClick={() => props.history.push('/registration')}>
                        Not a member? Sign Up
                    </Button>
                </div>
                <div className='col-4'>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        style={{margin:10}} 
                        onClick={() => handleLogin()}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => dispatch(setUser(data))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
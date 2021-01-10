import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import { Button } from '@material-ui/core';
import './MainPage.scss';

const Home = (props) => {
    useEffect(() => {
        if(props.user && Object.keys(props.user.user).length !== 0 && props.user.constructor === Object) {
            props.history.push('/notes')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.user])

    return (
        <div className='main-container'>
            <Header />
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
                <div className='col-2'>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        style={{margin:10}} 
                        onClick={() => props.history.push('/registration')}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
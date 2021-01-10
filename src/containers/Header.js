import React from 'react';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'


const Header = (props) => {
    return (
        <>
            <Typography variant='h2' style={{color:'lightskyblue',margin:20}}>
            <FontAwesomeIcon icon={faThumbtack}/> Pin My Notes
            </Typography>
        </>
    )
}

export default Header;
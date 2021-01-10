import React from 'react';
import './MainPage.scss';
import { Card, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

const NoteCard = (props) => {
    const { note } = props;

    return (
        <Card elevation={3} style={{height:200, width:200,margin:20}}> 
            <FontAwesomeIcon icon={faThumbtack}/> 
            <Typography style={{color:'darkmagenta'}} variant='h5'>
                {note.heading}
            </Typography>
            <Typography variant='h6'>
                {note.body}
            </Typography>
        </Card>
    )
}

export default NoteCard;
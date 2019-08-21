import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chat from "../chat/Chat";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));




export default function List(props) {
    const classes = useStyles();


    return (
        <Chat classes={classes} cookies={props.cookies} />
    );
}
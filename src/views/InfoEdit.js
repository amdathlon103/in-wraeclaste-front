import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InfoEditForm from "../components/InfoEditForm";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        // justifyContent: 'space-around',
        overflow: 'hidden',
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
    paper:{
        padding: theme.spacing(3),
    },
    popover: {
        pointerEvents: 'none',
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    card: {
        // width: 400,
        // height: 400,
        margin: 5,
    },
    infoCard: {
        maxWidth: 600,
        // height: 820,
        margin: 5,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
    gridList: {
        // width: 850,
        // height: 650,
        // justifyContent: 'flex-start',
        justifyContent: 'center',
    },
    gridTile: {
        justifyContent: 'center',
    },
    avatar: {
        // width: 400,
        height: 400,
    },
    subTitle: {
        marginLeft: 25,
        fontSize: 16,
    },
    info: {
        fontSize: 16,
        color: "#6c757d"
    },
    // spanInfo: {
    //     // marginLeft: 25,
    //     fontSize: 16,
    // },
    quoteAuthor:{
        textAlign: "right",
        fontSize: 16,
    },
}));


export default function InfoEdit(props) {
    const classes = useStyles();
    // const theme = useTheme();
    // const [auth, setAuth] = React.useState(true);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    // function handleChange(event) {
    //     setAuth(event.target.checked);
    // }
    //
    // function handleMenu(event) {
    //     setAnchorEl(event.currentTarget);
    // }
    //
    // function handleClose() {
    //     setAnchorEl(null);
    // }


    return (
        <InfoEditForm classes={classes} cookies={props.cookies} login={props.login}/>
    );
}
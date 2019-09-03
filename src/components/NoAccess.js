import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import NewTopbar from "../views/NewTopbar";
import {Link} from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';


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
    link:{
        color: "#007bff",
        fontSize: 25,
        textDecoration: 'underline',
    }
}));


export default function NoAcc(props) {
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
        <div className={classes.root}>
            <NewTopbar cookies={props.cookies} pageName="Error"/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <h1>Unauthorised!</h1>
                        <Link to="/" className={classes.link}>{"Return to home"}</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
//
// export default class NoAccess extends React.Component {
//     render() {
//         return (
//             <div>
//                 <TopLine cookies={this.props.cookies}/>
//                 <div className="row">
//                     <div className="col-md-6 ml-3">
//                         <h1>Unauthorised!</h1>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
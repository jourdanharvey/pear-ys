
import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
import * as routes from '../../constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);


interface UserProfile 
{
    displayName: string | null
}

// https://firebase.google.com/docs/auth/web/manage-users   as 
export default function PearysAppBar() {
    const classes = useStyles();
    const firebase = useFirebase();
    const history = useHistory();

    const auth = useSelector<RootState, UserProfile>(state => state.firebase.auth);
    
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    
    const loggedIn = !isEmpty(auth);
    const displayName = auth.displayName;
    const brandName = '🍐ys';

    
    
    const handleHomeClick = () => history.push(routes.HOME);
    const handleSignInClick = async () => history.push(routes.SIGNIN);
    const handleLogoutClick = async () => firebase.logout();
    
    return (
        <AppBar position="sticky">
            <Toolbar variant="regular">
                <Typography variant="h6" onClick={handleHomeClick} className={classes.title}>
                    {brandName}
                </Typography>
                {displayName}
                <IconButton
                    edge="end"
                    onClick={handleSignInClick}
                    color="inherit"
                >
                <AccountCircleIcon />
                </IconButton>
                {loggedIn && <IconButton
                    edge="end"
                    onClick={handleLogoutClick}
                    color="inherit">
                    <LogoutIcon />
                </IconButton>}
            </Toolbar>
        </AppBar>
    );
}
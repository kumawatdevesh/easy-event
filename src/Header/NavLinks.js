import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './NavLinks.module.css';

function NavLinks(props) {

    const logout = () => {
        props.logout();
    };

    const storedData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        if(storedData && storedData.userToken && 
            new Date(storedData.timeUp) > new Date()
        ) {
            props.login(storedData.userId, storedData.userToken, 
                new Date(storedData.timeUp)
            );
        }
    }, [props.login]);
    
    let clearTimer;

    useEffect(() => {
        if(props.userToken && props.timeUp) {
            const remTime = props.timeUp - new Date(new Date().getTime());
            clearTimer = setTimeout(props.logout, remTime);
        }else {
            clearTimeout(clearTimer);
        }
    }, [props.timeUp, props.logout]);

    return (
        <div className={styles.links}>
            {
                !props.userToken && <NavLink to="/auth">Auth</NavLink>
            }
            {
                props.userToken && <NavLink to="/auth" onClick={logout}>Logout</NavLink>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        userToken: state.userToken,
        timeUp: state.timeUp
    }
};

const mapStateToDispatch = dispatch => {
    return {
        logout: () => dispatch({type: 'logout'}),
        login: (id, token, time) => dispatch({type: 'login', userId: id, userToken: token, timeUp: time}) 
    }
};

export default connect(mapStateToProps, mapStateToDispatch)(NavLinks);

import React, {useState} from 'react';
import {connect} from 'react-redux';
import styles from './Auth.module.css';
import Backdrop from '../Error/Backdrop';
import Modal from '../Error/Modal';

function Auth(props) {

    const [loginMode, setLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('')
    const [error, setError] = useState(false);

    const loginModeHandler = () => {
        setLoginMode(prevState => !prevState);
    };

    const signUpHandler = (e) => {
        e.preventDefault();

        if(name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError(true);
            setErrorMess('field should not be empty');
            return;
        }

        const data = {
            name: name,
            email: email,
            password: password
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if(res.login) {
                props.signup(res.id , res.token)
                props.history.push('/');
            } else if(res.err) {
                setError(true);
                setErrorMess(res.err);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const loginHandler = (e) => {
        e.preventDefault();

        if(password.trim().length === 0 || email.trim().length === 0) {
            console.log('entered');
            setError(true);
            setErrorMess('field should not be empty');
            return;
        }

        const data = {
            email: email,
            password: password
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if(res.login) {
                props.login(res.id , res.token)
                props.history.push('/');
            } else if(res.err) {
                setError(true);
                setErrorMess(res.err);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const closeModal = () => {
        setError(false);
    };  

    return (
        <div className={styles.row}>
            {error && <Modal msg={errorMess} closeModal={closeModal} />}
            {error && <Backdrop closeModal={closeModal} />}
            <div className={styles.auth}>
                <form className={styles.auth__form} onSubmit={loginMode ? loginHandler : signUpHandler}>
                    {
                    !loginMode && <div className={styles.name}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="enter name" onChange={e => setName(e.target.value)} />
                    </div>
                    }
                    <div className={styles.email}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="enter mail" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="enter password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.submit}>
                        <input type="submit" value={loginMode ? 'Login' : 'SignUp'} />
                    </div>
                </form>
                <button onClick={loginModeHandler} className={styles.auth__change}>{loginMode ? 'signup' : 'login'}</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
};

const mapStateToDispatch = dispatch => {
    return {
        login: (id, token) => dispatch({type: 'login', userId: id, userToken: token}),
        signup: (id, token) => dispatch({type: 'signup', userId: id, userToken: token})
    }
};

export default connect(mapStateToProps, mapStateToDispatch)(Auth);

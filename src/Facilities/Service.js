import React, {useRef, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Service.module.css';
import Booking from './Booking';
import BookingDetails from './BookingDetails';

function Service() {

    const [link, setLink] = useState(true);
    const serRef = useRef();
    const bookRef = useRef();

    useEffect(() => {
        if(link) {
            serRef.current.classList.add(styles.services);
            serRef.current.style.color = '#fca311';
            bookRef.current.style.color = '#000';
            bookRef.current.classList.remove(styles.services);
        } else {
            serRef.current.classList.remove(styles.services);
            bookRef.current.classList.add(styles.services);
            serRef.current.style.color = '#000';
            bookRef.current.style.color = '#fca311';
        }
    }, [link]);

    const serChangeFocus = () => {
        setLink(true);
    };

    const bookChangeFocus = () => {
        setLink(false);
    };

    return (
        <div className={styles.row}>
            <div className={styles.options}>
                <NavLink to="/" onClick={serChangeFocus} ref={serRef} className={styles.services}>Services</NavLink>
                <NavLink to="/" onClick={bookChangeFocus} ref={bookRef}>Booking Details</NavLink>
            </div>
            {link && <Booking />}
            {!link && <BookingDetails />}
        </div>
    )
}

export default Service;

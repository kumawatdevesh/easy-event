import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Spinner from '../UI/Spinner';
import styles from './BookingDetails.module.css';

function BookingDetails() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLodaing] = useState(false);

    const storedData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        setLodaing(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/booking-details/${storedData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + storedData.userToken
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            setLodaing(false);
            setBookings([...res.booking]);
        })
        .catch(err => {
            console.log(err);
        });

    }, [storedData.userId, storedData.userToken]);

    const onCancelHandler = (id, index) => {
        const data = {
            id: id
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cancel-booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + storedData.userToken
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if(res.msg) {
                const arr = bookings.filter(i => i.id !== id);
                setBookings(arr);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className={styles.details}>
            {loading && <Spinner />}
            {bookings.map((i, index) => {

                return <div className={styles.items} key={index}>
                    <div>
                        <h3>{i.activity}</h3>
                        <p>{i.sch}</p>
                        <p>{i.slot}</p>
                    </div>
                    <div>
                        <NavLink to="/" onClick={() => onCancelHandler(i.id, index)} className={styles.cancel}>Cancel</NavLink>
                    </div>
                </div>
            })}
        </div>
    )
}

export default BookingDetails;

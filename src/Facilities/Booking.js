import React, {useState} from 'react';
import Modal from '../Error/Modal';
import Backdrop from '../Error/Backdrop';
import styles from './Booking.module.css';

function Booking() {

    const [name, setName] = useState('');
    const [activity, setActivity] = useState('');
    const [schedule, setSchedule] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [slot, setSlot] = useState('');

    const storedData = JSON.parse(localStorage.getItem('userData'));
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(name.trim().length === 0 || activity.trim().length === 0 || schedule.trim().length === 0|| 
        slot.trim().length === 0 || storedData.userId.trim().length === 0) {
            setError(true);
            setErrorMsg('field can\'t be empty');
            return;
        }
        
        const data = {
            name: name,
            activity: activity,
            schedule: schedule,
            slot: slot,
            creator: storedData.userId
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/booking`, {
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
            if(res.err) {
                setError(true);
                setErrorMsg(res.err);
            }else if(res.booking) {
                setName('');
                setActivity('');
                setSchedule('');
                setSlot('');
                setError(true);
                setErrorMsg('booking confirmed');
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
        <div className={styles.bookings}>
            {error && <Modal msg={errorMsg} closeModal={closeModal} />}
            {error && <Backdrop closeModal={closeModal} />}
            <form className={styles.book__form} onSubmit={onSubmitHandler}>
                <div className={styles.name}>
                    <label>name</label>
                    <input type="text" value={name} placeholder="enter name" onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.activity}>    
                    <label>activity</label>
                    <select name="activities" value={activity} id="activities" onChange={e => setActivity(e.target.value)}>
                        <option defaultValue="">select an option</option>
                        <option value="Tennis Court">Tennis Court</option>
                        <option value="Swimming Pool">Swimming Pool</option>
                        <option value="Badminton Court">Badminton Court</option>
                        <option value="Gym">Gym</option>
                        <option value="Club House">Club House</option>
                        <option value="Cycle tracks">Cycle tracks</option>
                    </select>
                </div>
                <div className={styles.time}>
                    <label>schedule</label>
                    <input type="date" value={schedule} onChange={e => setSchedule(e.target.value)} />
                </div>
                <div className={styles.slot}>
                    <label>Slot</label>
                    <select name="time" id="time" value={slot} onChange={e => setSlot(e.target.value)}>
                        <option defaultValue="">select an option</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 AM</option>
                        <option>01:00 PM</option>
                        <option>02:00 PM</option>
                        <option>03:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:00 PM</option>
                    </select>
                </div>
                <div className={styles.book}>
                    <input type="submit" value="Book" />
                </div>
            </form>
        </div>
    )
}

export default Booking;

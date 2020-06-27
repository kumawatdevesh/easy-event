import React from 'react';
import styles from './Modal.module.css';

function Modal(props) {

    const modalToggle = () => {
        props.closeModal();
    };

    return (
        <div className={styles.modal}>
            <h2 className={styles.msg}>{props.msg}</h2>
            <button className={styles.cancel} onClick={modalToggle}>Cancel</button>
        </div>
    )
}

export default Modal;

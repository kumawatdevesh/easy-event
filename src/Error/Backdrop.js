import React from 'react';
import styles from './Backdrop.module.css';

function Backdrop(props) {

    const toggleBackdrop = () => {
        props.closeModal();
    };

    return (
        <div className={styles.backdrop} onClick={toggleBackdrop}>
            
        </div>
    )
}

export default Backdrop;

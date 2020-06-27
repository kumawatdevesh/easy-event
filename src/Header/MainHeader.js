import React from 'react';
import NavLinks from './NavLinks';
import styles from './MainHeader.module.css';

function MainHeader() {
    return (
        <div className={styles.header}>
            <h1>EasyEvent</h1>
            <NavLinks />
        </div>
    )
}

export default MainHeader;

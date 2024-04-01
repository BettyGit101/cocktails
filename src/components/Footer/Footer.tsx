import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter ,FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return(
        <div className={styles.footer}>
            <div>Find Your Coctail</div>
            <div className={styles.social_media}>
                <span><FaFacebook size={25} /></span>
                <span><FaTwitter size={25} /></span>
                <span><FaInstagram size={25} /></span>
                <span><FaLinkedin size={25} /></span>
            </div>
        </div>
    )
}

export default Footer;
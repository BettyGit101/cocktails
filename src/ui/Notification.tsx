import React, {memo} from 'react';
import styles from './Notification.module.css';

const Notification = (props: { message: string | null }) => {
    return (
        <div className={styles.notification}>
            <p>{props.message}</p>
        </div>
    )
}

export default memo(Notification);
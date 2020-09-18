import React, { useState, useEffect } from 'react';

// Styles
import './sass/Notifications.scss';

// Services
import { subscribe, unsubscribe } from './services/notifications';

function Notifications(){
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        subscribe(receiveNotificationEvent);
        return () => unsubscribe(receiveNotificationEvent);
    })

    useEffect(() => {
        let now = new Date().getTime();
        let timeouts = [];
        notifications.forEach(notification => {
            if(notification.createdAt + notification.duration < now) deleteNotification(notification.createdAt);
            else {
                let timeLeft = notification.createdAt + notification.duration - now;
                timeouts.push(setTimeout(() => deleteNotification(notification.createdAt), timeLeft));
            }
        })
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    });

    var receiveNotificationEvent = (data) => {
        if(data.event === 'deliver') setNotifications([...notifications, data.notification]);
    }

    var deleteNotification = (createdAt) => {
        let index = notifications.findIndex(notification => notification.createdAt === createdAt);
        if(index === -1) return;
        let copy = notifications;
        copy.splice(index, 1);
        setNotifications([...copy]);
    }

    return (
        <div id="notifications" className="is-hidden-mobile">
            {notifications.map((notification, i) => <Notification key={i} notification={notification} destroy={deleteNotification} />)}
        </div>
    )
}

function Notification(props){
    let notification = props.notification;
    
    var destroy = () => props.destroy(notification.createdAt);

    return (
        <div className={'message is-' + notification.type}>
            <div className="message-header">
                <p>{notification.title}</p>
                <button className="delete" aira-label="delete" onClick={destroy}></button>
            </div>
            <div className="message-body">
                {notification.message}
            </div>
        </div>
    )
}

export default Notifications;
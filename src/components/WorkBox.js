import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import styles from './WorkBox.module.scss';

function WorkBox(props) {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        
    }, []);

    return (
        <div className={`workbox ${styles.workbox} ${styles[props.thumb]}`}>
            <Link to={`/project/${props.item.idx}`} className={`workbox ${styles.workbox}`}>
            
                <div className={styles.wrapper}>
                    <div className={styles['item-img']}>
                        {props.thumb==='square'
                        ?
                            <img src={`/works/${props.item.idx}/thumb_square/${props.item.thumb_square}`}></img>
                        :
                            <img src={`/works/${props.item.idx}/thumb_rectangle/${props.item.thumb_rectangle}`}></img>
                        } 
                    </div>
                    <div className={styles['box-overlay']}>
                        <div className={styles['logo-img']} style={{backgroundImage: `url(/works/${props.item.idx}/logo_img/${props.item.logo_img})`}}></div>
                    </div>
                </div>
                {
                props.desc ?
                <div className={`workbox__desc ${styles['workbox-desc']}`}>
                    <p className={styles['client-name']}>{props.item.client_name}</p>
                    <span className={styles.title}>{props.item.work_title}</span>
                </div> :
                ""
                }
            </Link>
        </div>
    );
}

export default WorkBox;
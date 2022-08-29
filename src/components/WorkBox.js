import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import styles from './WorkBox.module.scss';

function WorkBox(props) {

    const boxRef = useRef(null);
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // if(!boxRef.current) {
        //     console.log('null');
        // }
    }, []);
    function LinkWithBoxPosition() {
        // window.scrollTo(0, 0);
        // console.log(boxRef.current.getBoundingClientRect().y);
        const RectInfo = boxRef.current.getBoundingClientRect();
        const offsetObject = {
            x: RectInfo.x,
            // y: window.pageYOffset+RectInfo.y,
            y: RectInfo.y,
            width: RectInfo.width,
            height: RectInfo.height,
            // pageY: window.pageYOffset
        };
        // console.log('workbox', offsetObject.y);
        setTimeout(() => {navigate(`/project/${props.item.idx}`, {state: offsetObject})}, 300);
        // navigate(`/project/${props.item.idx}`, {state: offsetObject})
    }

    return (
        <div className={`workbox ${styles.workbox} ${styles[props.thumb]}`}>
        {/* <Link to={`/project/${props.item.idx}`} className={`workbox ${styles.workbox} ${styles[props.thumb]}`} ref={boxRef} onClick={LinkWithBoxPosition}> */}
            <div className={styles.wrapper}>
                <div className={styles['item-img']} ref={boxRef} onClick={LinkWithBoxPosition}>
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
                <p className={styles['client-name']}>{props.item.work_title}</p>
                <span className={styles.title}>{props.item.work_title_kor}</span>
            </div> :
            ""
            }
        {/* </Link> */}
        </div>
    );
}

export default WorkBox;
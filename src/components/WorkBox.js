import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './WorkBox.module.scss';

function WorkBox(props) {

    let [workClick, setWorkClick] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(workClick);
        if(workClick === true) {
            navigate('/project/'+props.item.idx);
        }
    }, [workClick]);

    return (
        // <div className={`workbox ${styles.workbox}`}>
        <div className={`workbox ${styles.workbox}`} onClick={() => {setWorkClick(true)}}>
            {/* <Link to={`/project/${props.item.idx}`} className={styles.logo}> */}
                <div className={styles.wrapper}>
                    <div className={styles['item-img']}>
                        <img src={`/works/${props.item.idx}/thumb_rectangle/${props.item.thumb_rectangle}`}></img>
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
            {/* </Link> */}
        </div>
    );
}

export default WorkBox;
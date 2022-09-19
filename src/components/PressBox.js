import React from "react";
import styles from './PressBox.module.scss';

function PressBox(props) {
    let pressDate = props.press_date;

    return (
        <a href={props.item.press_link} target="_blank" rel="noopener noreferrer" className={styles.pressbox}>
            <div className={styles['img-block']}>
                <img src={props.item.press_thumb} alt="" />
            </div>
            <div className={styles['text-block']}>
                <p className={styles['title']}>{props.item.press_title}</p>
                <p className={styles['date']}>{props.item.press_date}</p>
            </div>
        </a>
    )
}
export default PressBox;
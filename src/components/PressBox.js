import React from 'react';
import styles from './PressBox.module.scss';

function PressBox(props) {
    let rawPressDate = new Date(props.item.press_date);
    // rawPressDate.setHours(rawPressDate.getHours()+9);
    console.log(rawPressDate);
    let pressDate = rawPressDate.getFullYear() + '.' + (rawPressDate.getMonth() + 1) + '.' + rawPressDate.getDate();
    console.log(pressDate);
    // let pressDate = rawPressDate.getFullYear() + "." + rawPressDate.() + "." + rawPressDate.getDay();

    let pressTitle = (props.item.press_title).replaceAll("<br>", "\n");
    pressTitle = pressTitle.replaceAll("&gt;", ">");
    pressTitle = pressTitle.replaceAll("&lt;", "<");
    pressTitle = pressTitle.replaceAll("&quot;", '"');
    pressTitle = pressTitle.replaceAll("&nbsp;", " ");
    pressTitle = pressTitle.replaceAll("&amp;", "&");   

    return (
        <a href={props.item.press_link} target="_blank" rel="noopener noreferrer" className={styles.pressbox}>
            <div className={styles['img-block']}>
                <img className={styles['thumb']} src={`/journalists/${props.item.idx}/press_thumb/${props.item.press_thumb}`} alt=""></img>
            </div>
            <div className={styles['text-block']}>
                <p className={styles['title']}>{pressTitle}</p>
                <p className={styles['date']}>{pressDate}</p>
            </div>
        </a>
    );
}
export default PressBox;

import React from 'react';
import styles from './PressBox.module.scss';

function PressBox(props) {
    let rawPressDate = new Date(props.item.press_date);

    const year = rawPressDate.getFullYear();
    const month = rawPressDate.toLocaleString('en-US', { month: 'long' });
    const day = rawPressDate.getDate();

    const convertedDate = `${month} ${day}, ${year}`;

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
                <p className={styles['date']}>{convertedDate}</p>
            </div>
        </a>
    );
}
export default PressBox;

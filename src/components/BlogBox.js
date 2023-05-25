import React from 'react';
import styles from './BlogBox.module.scss';
import { Link } from 'react-router-dom';

function BlogBox(props) {
    // let rawPressDate = new Date(props.item.press_date);
    // // rawPressDate.setHours(rawPressDate.getHours()+9);
    // // console.log(rawPressDate);
    // let pressDate = rawPressDate.getFullYear() + '.' + (rawPressDate.getMonth() + 1) + '.' + rawPressDate.getDate();
    // // console.log(pressDate);
    // // let pressDate = rawPressDate.getFullYear() + "." + rawPressDate.() + "." + rawPressDate.getDay();

    // let pressTitle = (props.item.press_title).replaceAll("<br>", "\n");
    // pressTitle = pressTitle.replaceAll("&gt;", ">");
    // pressTitle = pressTitle.replaceAll("&lt;", "<");
    // pressTitle = pressTitle.replaceAll("&quot;", '"');
    // pressTitle = pressTitle.replaceAll("&nbsp;", " ");
    // pressTitle = pressTitle.replaceAll("&amp;", "&");

    return (
        // <Link to={"/blog/"+props.item.idx} className={styles.blogbox}>
        <Link to={'/blog/1'} className={styles.blogbox}>
            <div className={styles['title-block']}>
                <p className={styles['date']}>May 9, 2023</p>
                <p className={styles['title']}>미니버타이징 타이틀입니다. 미니버타이징 타이틀입니다.</p>
            </div>
            <div className={styles['img-block']}>
                {/* <img className={styles['thumb']} src={`/postings/${props.item.idx}/press_thumb/${props.item.press_thumb}`} alt=""></img> */}
                <img className={styles['thumb']} src={`/postings/1/WpllNiiTlM.png`} alt=""></img>
            </div>
            <div className={styles['text-block']}>
                <div className={styles['author-box']}>
                    <p className={styles['by']}>by</p>
                    <div className={styles['icon']}>
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.24605 0.0756836V10.288H6.83714V3.39396L5.87916 7.97089H4.16781L3.15403 3.55606V10.288H0.745117V0.0756836H4.30733C4.40963 0.685941 5.02349 4.17585 5.02349 4.17585L5.66524 0.0756836H9.25535H9.24605Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <p className={styles['name']}>Kim sejin</p>
                </div>
                <p className={styles['desc']}>내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용 추가내용추가내용 추가내용 추가내용....</p>
            </div>
        </Link>
    );
}
export default BlogBox;

import React, { useState, useEffect } from 'react';
import styles from './BlogBox.module.scss';
import { Link } from 'react-router-dom';

function BlogBox(props) {
    // console.log(props);
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
    const [title, setTitle] = useState('');
    const [firstImage, setFirstImage] = useState('');
    const [textHeader, setTextHeader] = useState('');

    useEffect(() => {
        setTitle(props.item.blog_title);
        const editorData = JSON.parse(props.item.blog_json);
        const firstImageObj = editorData.blocks.find(item => item.type === 'image');
        setFirstImage(firstImageObj.id);
        const textHeaderObj = editorData.blocks.find(item => item.type === 'header')
        setTextHeader(textHeaderObj.data.text);


        // console.log(editorData);
        // console.log(firstImage);
        // console.log(textHeader);
    }, []);
    // useEffect(() => {
    //     console.log(editorData);
    //     setBlocks(editorData.blocks);
    //     firstImage = editorData.blocks.find(item => item.type === 'image');
    //     console.log(firstImage);
    // }, [editorData]);

    return (
        // <Link to={"/blog/"+props.item.idx} className={styles.blogbox}>
        <Link to={'/blog/1'} className={styles.blogbox}>
            <div className={styles['title-block']}>
                <p className={styles['date']}>May 9, 2023</p>
                <p className={styles['title']}>{title}</p>
            </div>
            <div className={styles['img-block']}>
                <img className={styles['thumb']} src={`/postings/${props.item.idx}/${firstImage}.png`} alt=""></img>
                {/* <img className={styles['thumb']} src={`/postings/1/WpllNiiTlM.png`} alt=""></img> */}
            </div>
            <div className={styles['text-block']}>
                <div className={styles['author-box']}>
                    <p className={styles['by']}>by</p>
                    <div className={styles['icon']}>
                        <svg viewBox="0 0 8.5 10.2">
                            <path d="M8.5,0v10.2H6.1V3.3l-1,4.6H3.4l-1-4.4v6.7H0V0h3.6c0.1,0.6,0.7,4.1,0.7,4.1L4.9,0H8.5L8.5,0z" />
                        </svg>
                    </div>
                    <p className={styles['name']}>Kim sejin</p>
                </div>
                <p className={styles['desc']}>
                    {textHeader}
                </p>
            </div>
        </Link>
    );
}
export default BlogBox;

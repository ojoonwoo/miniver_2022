import React, { useState, useEffect } from 'react';
import styles from './BlogBox.module.scss';
import { Link } from 'react-router-dom';

function BlogBox(props) {
    // console.log(props);
    // console.log(props.item.blog_register_date);
    let rawBlogDate = new Date(props.item.blog_register_date);

    const year = rawBlogDate.getFullYear();
    const month = rawBlogDate.toLocaleString('en-US', { month: 'long' });
    const day = rawBlogDate.getDate();

    const convertedDate = `${month} ${day}, ${year}`;
    // console.log(convertedDate);

    const [title, setTitle] = useState('');
    const [firstImage, setFirstImage] = useState('');
    const [textHeader, setTextHeader] = useState('');
    const [iconColor, setIconColor] = useState('');
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        setTitle(props.item.blog_title);
        const editorData = JSON.parse(props.item.blog_json);
        const firstImageObj = editorData.blocks.find(item => item.type === 'image');
        if(firstImageObj) {
            setFirstImage(firstImageObj.id);
        }
        const textHeaderObj = editorData.blocks.find(item => item.type === 'header')
        const textDescObj = editorData.blocks.find(item => item.type === 'paragraph')
        if(textHeaderObj) {
            setTextHeader(textHeaderObj.data.text);
        } else {
            setTextHeader(textDescObj.data.text);
        }
        setIconColor(props.item.blog_color);
        setAuthorName(props.item.blog_writer);


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
                <p className={styles['date']}>{convertedDate}</p>
                <p className={styles['title']}>{title}</p>
            </div>
            {firstImage &&
            <div className={styles['img-block']}>
                <img className={styles['thumb']} src={`/postings/${props.item.idx}/${firstImage}.png`} alt=""></img>
                {/* <img className={styles['thumb']} src={`/postings/1/WpllNiiTlM.png`} alt=""></img> */}
            </div>
            }
            <div className={styles['text-block']}>
                <div className={styles['author-box']}>
                    <p className={styles['by']}>by</p>
                    <div className={styles['icon']} style={{backgroundColor: iconColor}}>
                        <svg viewBox="0 0 8.5 10.2">
                            <path d="M8.5,0v10.2H6.1V3.3l-1,4.6H3.4l-1-4.4v6.7H0V0h3.6c0.1,0.6,0.7,4.1,0.7,4.1L4.9,0H8.5L8.5,0z" />
                        </svg>
                    </div>
                    <p className={styles['name']}>{authorName}</p>
                </div>
                {textHeader &&
                <p className={styles['desc']}>
                    {textHeader}
                </p>
                }
            </div>
        </Link>
    );
}
export default BlogBox;

import React, { useEffect, useMemo } from 'react';
import styles from './BlogBox.module.scss';
import { Link } from 'react-router-dom';

function BlogBox({item}) {

    // * React의 destructuring을 사용하여 props.item 객체에서 필요한 속성들을 바로 추출해서 변수 선언.
    const {
        blog_title, 
        blog_register_date, 
        blog_json, 
        blog_color, 
        blog_writer, 
        idx
    } = item;

    const editorData = JSON.parse(blog_json);

    // * useMemo를 사용하여, 최적화. 기존은 useEffect안에서 useState로 값을 넣었으나 리렌더링등의 상황에서 대상 값이 변하지 않더라도 대상도 리렌더링되서 불필요한 렌더가 발생.
    // * useMemo는 useMemo 마지막 부분의 []안에 들어있는 대상의 값이 변하지 않는 이상 리렌더링하지않기때문에 불필요한 렌더가 사라짐.
    const dateFormatted = useMemo(() => {
        let rawBlogDate = new Date(blog_register_date);
        const year = rawBlogDate.getFullYear();
        const month = rawBlogDate.toLocaleString('en-US', { month: 'long' });
        const day = rawBlogDate.getDate();
        return `${month} ${day}, ${year}`;
    }, [blog_register_date]);

    const firstImage = useMemo(() => {
        const firstImageObj = editorData.blocks.find(block => block.type === 'image');
        return firstImageObj ? firstImageObj.id : null;
    }, [editorData]);

    const firstText = useMemo(() => {
        // const textHeaderObj = editorData.blocks.find(block => block.type === 'header');
        const textDescObj = editorData.blocks.find(block => block.type === 'paragraph');
        // return textHeaderObj ? textHeaderObj.data.text : textDescObj.data.text;
        return textDescObj.data.text;
    }, [editorData]);

    // * 변수 firstText의 값에서 HTML 태그들을 찾아 지우는 함수
    const stripHtmlTags = (str) => {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    useEffect(() => {
        // console.log('마운트');
        return () => {
            // console.log('언마운트');
        };
    }, []);

    return (
        // * 기존은 'props.item.idx'였으나 위에서 변수 선언해두었기때문에 'idx'로 축약됨.
        <Link to={`/blog/${idx}`} className={styles.blogbox}>
            <div className={styles['title-block']}>
                <p className={styles['date']}>{dateFormatted}</p>
                <p className={styles['title']}>{blog_title}</p>
            </div>
            {firstImage &&
            <div className={styles['img-block']}>
                <img className={styles['thumb']} src={`/postings/${idx}/${firstImage}.png`} alt=""></img>
            </div>
            }
            <div className={styles['text-block']}>
                <div className={styles['author-box']}>
                    <p className={styles['by']}>by</p>
                    <div className={styles['icon']} style={{backgroundColor: blog_color}}>
                        <svg viewBox="0 0 8.5 10.2">
                            <path d="M8.5,0v10.2H6.1V3.3l-1,4.6H3.4l-1-4.4v6.7H0V0h3.6c0.1,0.6,0.7,4.1,0.7,4.1L4.9,0H8.5L8.5,0z" />
                        </svg>
                    </div>
                    <p className={styles['name']}>{blog_writer}</p>
                </div>
                {firstText &&
                <p className={styles['desc']}>
                    {stripHtmlTags(firstText)}
                </p>
                }
            </div>
        </Link>
    );
}
export default BlogBox;

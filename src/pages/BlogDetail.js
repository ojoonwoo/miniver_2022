import React, { useState, useEffect, useMemo, useLayoutEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useResizeObserver from '@react-hook/resize-observer';

import Header from '../components/Header';
import Footer from '../components/Footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function BlogDetail(props) {
    const params = useParams();
    let dispatch = useDispatch();
    let device = useSelector((state) => {
        return state.currentDevice;
    });
    const [blogData, setBlogData] = useState([]);
    const [blogAdjoinList, setBlogAdjoinList] = useState([]);
    const [editorData, setEditorData] = useState([]);

    useEffect(() => {
        dispatch(changeColor('black'));
        async function getBlogData() {
            const result = await axios({
                method: 'get',
                url: '/api/posting/getdetail',
                params: { idx: params.id },
            });

            // console.log(result.data);
            setBlogData(result.data);
            // console.log(result.data[0].blog_json);
            setEditorData(JSON.parse(result.data.blog_json));

            console.log(editorData);
            
            
        }
        async function getBlogAdjoinList() {
            const result = await axios({
                method: 'get',
                url: '/api/posting/getadjoinlist',
                params: { curidx: params.id },
            });
            
            setBlogAdjoinList(result.data.list);
        }
        getBlogData();
        getBlogAdjoinList();
    }, []);

    

    // const textHeader = useMemo(() => {
    //     const textHeaderObj = editorData.blocks.find(block => block.type === 'header');
    //     const textDescObj = editorData.blocks.find(block => block.type === 'paragraph');
    //     return textHeaderObj ? textHeaderObj.data.text : textDescObj.data.text;
    // }, [editorData]);
    
    const convertDateENUS = (dateString) => {
        let raw = new Date(dateString);
        const year = raw.getFullYear();
        const month = raw.toLocaleString('en-US', { month: 'long' });
        const day = raw.getDate();
        const str = month + ' ' + day + ', ' + year;

        return str;
    };
    const convertEditorBlock = (block, key) => {
        console.log(block);
        let returnElem = null;
        let classOptions = [];
        let classOptionsStr = '';

        switch (block.type) {
            case 'image':
                block.data.stretched && classOptions.push('is-stretched');
                block.data.withBackground && classOptions.push('is-withBackground');
                block.data.withBorder && classOptions.push('is-withBorder');

                returnElem = `<img src=${block.data.url}>`;
                break;
            case 'header':
                const level = block.data.level;
                returnElem = `<h${level}>${block.data.text}</h${level}>`;
                break;
            case 'paragraph':
                returnElem = `<p>${block.data.text}</p>`;
                break;
            case 'list':
                returnElem = `<ul>`;
                block.data.items.forEach((data, idx) => {
                    returnElem += `<li>${data}</li>`
                })
                returnElem += `</ul>`;
                break;
            default:
                returnElem = '';
                break;
        }

        classOptionsStr = classOptions.join(' ');

        return <div key={key} className={classOptionsStr} dangerouslySetInnerHTML={{ __html: returnElem }}></div>;
    };
    const goTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            duration: 0.1,
        });
    };

    const firstImage = () => {
        return editorData.blocks ? editorData.blocks.find(block => block.type === 'image').data.url : process.env.PUBLIC_URL+'/assets/og_image.jpg';
    }
    const firstDesc = () => {
        return editorData.blocks ? editorData.blocks.find(block => block.type === 'paragraph').data.text : '궁극의 용감함 크리에이티브';
    }
    
    const stripHtmlTags = (str) => {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    return (
        <PageTransition>
            <div id="container" className={props.pageName}>
                <Header />
                <div className="contents">
                    <div className="grid-inner">
                        {blogData && (
                            <>
                                <div className="blog-content">
                                    <div className="blog-content__head">
                                        <p className="blog-content__head-date">
                                            {/* {blogData.blog_register_date} */}
                                            {convertDateENUS(blogData.blog_register_date)}
                                        </p>
                                        <h2 className="blog-content__head-subject">{blogData.blog_title}</h2>
                                        <div className="blog-content__head-writer">
                                            <span className="icon" style={{ backgroundColor: blogData.blog_color }}>
                                                <svg viewBox="0 0 8.5 10.2">
                                                    <path d="M8.5,0v10.2H6.1V3.3l-1,4.6H3.4l-1-4.4v6.7H0V0h3.6c0.1,0.6,0.7,4.1,0.7,4.1L4.9,0H8.5L8.5,0z" fill="#ffffff" />
                                                </svg>
                                            </span>
                                            <span className="author">{blogData.blog_writer}</span>
                                        </div>
                                    </div>
                                    <div className="blog-content__body">{editorData.blocks && editorData.blocks.map((block, idx) => convertEditorBlock(block, block.id))}</div>
                                    <div className="blog-content__foot">
                                        {blogAdjoinList && (
                                            <div className="blog-remote">
                                                {blogAdjoinList.map((data, idx) => (
                                                    <Link to={`/blog/${data.idx}`} key={data.idx} className={`remote-link ${data.idx > params.id ? 'next' : 'prev'}`}>
                                                        {/* <span>{data.idx > params.id ? '다음' : '이전'} 글</span> */}
                                                        {data.idx < params.id && (
                                                            <svg viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8.26326 1.20158L1.28125 8.18359L8.26326 15.1656" stroke="white" strokeWidth="1.31654" />
                                                            </svg>
                                                        )}
                                                        <div className={`inner`}>
                                                            <p className={`date`}>{convertDateENUS(data.blog_register_date)}</p>
                                                            <p className={`title`}>{data.blog_title}</p>
                                                        </div>
                                                        {data.idx > params.id && (
                                                            <svg viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.82463 15.3863L7.80664 8.4043L0.82463 1.42229" stroke="white" strokeWidth="1.31654" />
                                                            </svg>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        <button type="button" className="go-top" onClick={goTopHandler}>
                                            Back to top
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {device === 'mobile' ? null : <Footer />}
            </div>
        </PageTransition>
    );
}

export default BlogDetail;

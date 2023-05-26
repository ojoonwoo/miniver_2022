import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useResizeObserver from '@react-hook/resize-observer';

import Footer from '../components/Footer';
import Header from '../components/Header';

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

    useEffect(() => {
        dispatch(changeColor('black'));
        console.log(params.id);
        async function getBlogData() {
            const result = await axios({
                method: 'get',
                url: '/api/posting/getdetail',
                params: { idx: params.id },
            });
            
            console.log(result.data);
            setBlogData(result.data);
        }
        getBlogData();
    }, []);
    
    const convertDate = (dateString) => {
        let raw = new Date(dateString);
        const str = raw.getMonth().toString() + ' ' + raw.getDate() + ', ' + raw.getFullYear()
        return str;
    }

    return (
        <PageTransition>
            <div id="container" className={props.pageName}>
                <Header />
                <div className="contents">
                    {blogData &&
                    <>
                    <div className="blog-remote"></div>
                    <div className="blog-content">
                        <div className="blog-content__head">
                            <p className="blog-content__head-date">
                                {/* {blogData.blog_register_date} */}
                                {convertDate(blogData.blog_register_date)}
                            </p>
                            <h2 className="blog-content__head-subject">
                                {blogData.blog_title}
                            </h2>
                            <div className="blog-content__head-writer">
                                <span className="icon" style={{ backgroundColor: blogData.blog_color }}>
                                    <em>M</em>
                                </span>
                                <span className="writer">{blogData.blog_writer}</span>
                            </div>
                        </div>    
                    </div>
                    </>
                    }
                </div>
                {device === 'mobile' ? null : <Footer />}
            </div>
        </PageTransition>
    );
}

export default BlogDetail;

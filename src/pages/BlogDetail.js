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
        }
        getBlogData();
    }, []);

    return (
        <PageTransition>
            <div id="container" className={props.pageName}>
                <Header />
                <div className="contents"></div>
                {device === 'mobile' ? null : <Footer />}
            </div>
        </PageTransition>
    );
}

export default BlogDetail;

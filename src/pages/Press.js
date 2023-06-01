import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import PressBox from './../components/PressBox';
import Footer from '../components/Footer';
import { changeColor } from '../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';
import { Routes, Route, useLocation, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// todo
// 프로젝트 컨테이너 만들어서 리스트, 뷰 분리

function Project(props) {
    const location = useLocation();
    const navigate = useNavigate();

    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    const params = useParams();
    let dispatch = useDispatch();
    const [pressData, setPressData] = useState([]);

    let device = useSelector((state) => {
        return state.currentDevice;
    });

    useEffect(() => {
        dispatch(changeColor('black'));
        getPressData();

        // console.log('프레스 리스트 마운트');
        return () => {
            // console.log('프레스 리스트 언마운트');
        };
    }, []);

    const getPressData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/press/getlist',
        });
        setPressData(result.data.list);
        // console.log(result.data.list);
    };

    return (
        <PageTransition>
            <div id="container" className={props.pageName}>
                <Helmet>
                    <title>{`미니버타이징 - ${props.pageName}`}</title>
                    <meta name="title" content={`미니버타이징 - ${props.pageName}`} />
                    <meta property="og:title" content={`미니버타이징 - ${props.pageName}`} />
                </Helmet>
                <Header />
                <div className="contents">
                    <div className="grid-inner">
                        <h1 className="page-title">Press</h1>
                        <div className="pressbox-container">
                            {pressData.map((item) => (
                                <PressBox key={item.idx} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <>{device === 'mobile' ? null : <Footer />}</>
            </div>
            <Outlet />
        </PageTransition>
    );
}

export default Project;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { motion } from 'framer-motion';
import BlogBox from './../components/BlogBox';

import Footer from '../components/Footer';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';
import { Routes, Route, useLocation, Link, Outlet, useParams, useNavigate } from 'react-router-dom';

function Blog(props) {
    const params = useParams();
    let device = useSelector((state) => {
        return state.currentDevice;
    });
    let dispatch = useDispatch();

    const [blogData, setBlogData] = useState([]);


    useEffect(() => {
        dispatch(changeColor('black'));
    }, []);

    const getBlogData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/press/getlist',
        });
        setBlogData(result.data.list);
        // console.log(result.data.list);
    };

    return (
        <PageTransition>
            <div id="container" className="Blog">
                <Header />
                <div className="contents">
                    <div className="grid-inner">
                        <h1 className="page-title">Blog</h1>
                        <div className="blogbox-container">
                            {/* {blogData.map((item) => (
                                <BlogBox key={item.idx} item={item} />
                            ))} */}
                            <BlogBox key={'1'} />
                        </div>
                    </div>
                </div>
                <>{device === 'mobile' ? null : <Footer />}</>
            </div>
            <Outlet />
        </PageTransition>
    );
}

export default Blog;

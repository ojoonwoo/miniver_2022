import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import PageTransition from '../components/PageTransition';
import { useLocation, Link, Outlet } from 'react-router-dom';

function Project(props) {
    const location = useLocation();

    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    // console.log(headerColor);
    let dispatch = useDispatch();
    const [projectData, setProjectData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        let cate = '';
        if (location.hash) {
            cate = location.hash.split('#')[1];
        } else {
            cate = 'all';
        }

        getCategoryData();
        getProjectData(cate);
        dispatch(changeColor('black'));

        return () => {
            console.log('unmount');
        };
    }, []);

    const getProjectData = async (cate) => {
        if (!cate) cate = 'all';
        const result = await axios({
            method: 'get',
            url: '/api/work/getlist',
            params: { cate: cate },
        });
        console.log(cate);
        setProjectData(result.data.list);
        // console.log(result.data.list);
    };
    const getCategoryData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getcategories',
        });
        // categoryData = result.data.list;
        setCategoryData(result.data.list);
        // console.log(result.data.list);
    };

    const cateClick = (cate, e) => {
        e.preventDefault();
        const hash = '#' + cate;
        window.location.hash = hash;
        getProjectData(cate);
    };

    return (
        // <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PageTransition>
                <div id="container" className={props.pageName}>
                    {/* <Header color="black"/> */}
                    <div className="contents">
                        <div className="grid-inner">
                            <h1 className="page-title">Project</h1>
                            <div className="categories">
                                <CategoryItem classActive={location.hash.split('#')[1] == 'all' || !location.hash ? 'isActive' : ''} item={{ idx: 'all', category_name: 'All' }} onClick={cateClick} />
                                {categoryData.map((item) => (
                                    <CategoryItem key={item.idx} classActive={location.hash.split('#')[1] == `${item.idx}` ? 'isActive' : ''} item={item} onClick={cateClick} />
                                ))}
                            </div>
                            <div className="workbox-container">
                                {projectData.map((item) => (
                                    <WorkBox key={item.idx} item={item} desc={true} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* </motion.div> */}
                <Outlet />
            </PageTransition>
    );
}

export default Project;

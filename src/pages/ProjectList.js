import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
// import Header from '../components/Header';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import PageTransition from '../components/PageTransition';
import { useLocation, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { TransitionGroup, SwitchTransition, CSSTransition } from "react-transition-group";


function ProjectList(props) {
    const location = useLocation();
    const navigate = useNavigate();

    let headerColor = useSelector((state) => {
        return state.headerColor;
    });
    // console.log(headerColor);
    const params = useParams();
    let dispatch = useDispatch();
    const [projectData, setProjectData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    
    useEffect(() => {
        
        // if(workFlag === true) {
        //     console.log(workFlag);
        //     navigate('/project/'+props.item.idx);
        // }

        let cate = '';
        if (location.hash) {
            cate = location.hash.split('#')[1];
        } else {
            cate = 'all';
        }

        getCategoryData();
        getProjectData(cate);
        dispatch(changeColor('black'));

        console.log('project list mount');
        // alert('project list mount');
        return () => {
            console.log('project list unmount');
            // alert('project list unmount');
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
        // <div id="container" className={props.pageName}>
            /* <Header color="black"/> */
        <div className="contents Project">
            <div className="grid-inner">
                <h1 className="page-title">Project</h1>
                <div className="categories">
                    <CategoryItem classActive={(location.hash.split('#')[1] == 'all' || !location.hash) ? 'isActive' : ''} item={{idx: 'all', category_name: 'All'}} onClick={cateClick}/>
                    {categoryData.map((item) => (
                        <CategoryItem key={item.idx} classActive={location.hash.split('#')[1] == `${item.idx}` ? 'isActive' : ''} item={item} onClick={cateClick}/>
                    ))}
                </div>
                <div className="workbox-container">
                    {projectData.map((item) =>
                        // <WorkBox key={item.idx} item={item} desc={true} onClick={props.workboxClick}/>
                        <WorkBox key={item.idx} item={item} desc={true}/>
                        // <WorkBox key={item.idx} item={item} desc={true} onClick={(e) => {props.workboxClick(item.idx, e)}}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
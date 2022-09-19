import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import PressBox from './../components/PressBox';
import { changeColor } from '../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Routes, Route, useLocation, Link, Outlet, useParams, useNavigate } from 'react-router-dom';

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
    
    useEffect(() => {
        dispatch(changeColor('black'));
        getPressData();

        console.log('프레스 리스트 마운트');
        return () => {
            console.log('프레스 리스트 언마운트');
        };
    }, []);
    
    const getPressData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/press/getlist',
        });
        setPressData(result.data.list);
        console.log(result.data.list);
    };

    return (
        <PageTransition>
            <div id="container" className={props.pageName}>
                {/* <Header color="black"/> */}
                <div className="contents">
                    <div className="inner">
                        <h1 className="page-title">Press</h1>
                        <div className="pressbox-container">
                            {pressData.map((item) =>
                                <PressBox key={item.idx} item={item}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </PageTransition>
    );
}

export default Project;

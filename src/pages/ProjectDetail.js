import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';

function ProjectDetail() {
    const params = useParams();
    console.log('ProjectDetail', params);

    let headerColor = useSelector((state) => {
        return state.headerColor;
    });
    console.log(headerColor);
    let dispatch = useDispatch();
    useEffect(() => {
        console.log('useEffect');
        dispatch(changeColor('black'));
        return () => {
            console.log('unmount');
        };
    }, []);
    return (
        <PageTransition>
            {/* <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div className="ProjectDetail">
                <div id="container">ProjectDetail</div>
            </div>
        </PageTransition>
    );
}

export default ProjectDetail;

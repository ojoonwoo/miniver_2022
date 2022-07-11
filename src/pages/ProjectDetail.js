import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
// import { param } from '../../server/api/work.js';

function ProjectDetail(props) {
    const params = useParams();

    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    
    let dispatch = useDispatch();

    const [projectData, setProjectData] = useState([]);

    const [categories, setCategories] = useState([]);

    const categorySplit = (cateData) => {
        let idxArr = '';
        if(cateData.includes(',')) {
            idxArr = cateData.split(',');
        } else {
            idxArr = cateData;
        }
        // idxArr.forEach(function(item, idx) {
        //     console.log(item);
        // })
        // return idxArr;
    }

    useEffect(() => {
        dispatch(changeColor('black'));
        async function getProjectData() {
            const result = await axios({
                method: 'get',
                url: '/api/work/getdetail',
                params: { idx: params.id },
            });
            setProjectData(result.data.results[0]);
            const cate = await categorySplit(result.data.results[0].work_categories);
            setCategories(cate);
        }
        getProjectData();

        return () => {
            console.log('unmount');
        };
    }, []);
    return (
        <PageTransition>
            {/* <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div id="container" className={props.pageName}>
                <div className="contents">
                    <div className="project-detail__top-block">
                        <h1 className="page-title project-detail__title">{projectData.work_title}</h1>
                        <p className="project-detail__title-kr">{projectData.work_title_kor}</p>
                        <span>{categories}</span>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default ProjectDetail;

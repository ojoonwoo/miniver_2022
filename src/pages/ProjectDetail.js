import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useParams, Link } from 'react-router-dom';
import { changeColor, changeTransitionMode } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { changeIdx } from './../store.js';

import WorkBox from '../components/WorkBox';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ProjectDetail(props) {
    const params = useParams();

    const location = useLocation();

    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    // 나머지 opacity 0 -> 1

    // console.log(location.pathname);
    // if(location.pathname===`/project/${params.id ? params.id : props.id}`) {
    //     console.log('디테일');
    // }
    
    let dispatch = useDispatch();

    const [projectData, setProjectData] = useState([]);
    const [relatedWork, setRelatedWork] = useState([]);

    useEffect(() => {
 
        dispatch(changeColor('black'));

        async function getProjectData() {
            const result = await axios({
                method: 'get',
                url: '/api/work/getdetail',
                params: { idx: params.id ? params.id : props.id },
            });
            setProjectData(result.data);
            
            const relatedWork = await axios({
                method: 'get',
                url: '/api/work/getlist',
                params: { cate: result.data.work_categories.substring(0, 1), exclude: result.data.idx, limit: 3}
            })
            setRelatedWork(relatedWork.data.list);
        }
        getProjectData();
            console.log('project detail mount');
        return () => {
            console.log('project detail unmount');
        };
    }, []);
    return (
        <PageTransition variantsName="detail">
            {/* <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div id="container" className={props.pageName}>
                <div className="contents">
                    <div className="project-detail__top-block">
                        <h1 className="page-title project-detail__title">{projectData.work_title}</h1>
                        <p className="project-detail__title-kr">{projectData.work_title_kor}</p>
                        <div className="project-detail_categories">
                            {projectData.category_names &&
                                projectData.category_names.map((value, idx) => (
                                    <span key={idx} className="project-detail__category">
                                        #{value}
                                    </span>
                                ))}
                        </div>
                        <Link to={{pathname: '/project'}} className="go-list"><span>View List</span></Link>
                    </div>
                    <div className="project-detail__hero">
                        {projectData.hero_source && <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>}
                    </div>
                    <div className="project-detail__middle-block">
                        <div className="grid-inner">
                            <div className="project-detail__desc">
                                <dl>
                                    <dt className="small-title">Client</dt>
                                    <dd>{projectData.client_name}</dd>
                                </dl>
                                <dl>
                                    <dt className="small-title">Overview</dt>
                                    <dd>{projectData.work_overview}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="project-detail__details">
                            <Swiper
                                // install Swiper modules
                                modules={[Scrollbar, FreeMode, A11y]}
                                spaceBetween={10}
                                slidesPerView={'auto'}
                                slidesOffsetBefore={30}
                                slidesOffsetAfter={30}
                                scrollbar={{ el: '.slideshow-scrollbar', draggable: false }}
                                freemode={{ freemode: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {projectData.detail_sources1_arr &&
                                    projectData.detail_sources1_arr.map((slideContent, index) => (
                                        <SwiperSlide key={index}>
                                            <ImageVideo src={`/works/${projectData.idx}/detail_sources1/${slideContent}`}></ImageVideo>
                                        </SwiperSlide>
                                    ))}
                                <div className="slideshow-scrollbar"></div>
                            </Swiper>
                        </div>
                        <div className="project-detail__details __2">
                            <Swiper
                                // install Swiper modules
                                modules={[Scrollbar, FreeMode, A11y]}
                                spaceBetween={10}
                                slidesPerView={'auto'}
                                slidesOffsetBefore={30}
                                slidesOffsetAfter={30}
                                scrollbar={{ el: '.slideshow-scrollbar', draggable: false }}
                                freemode={{ freemode: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {projectData.detail_sources2_arr &&
                                    projectData.detail_sources2_arr.map((slideContent, index) => (
                                        <SwiperSlide key={index}>
                                            <ImageVideo src={`/works/${projectData.idx}/detail_sources2/${slideContent}`}></ImageVideo>
                                        </SwiperSlide>
                                    ))}
                                <div className="slideshow-scrollbar"></div>
                            </Swiper>
                        </div>
                        <div className="contact-block">
                            <p className="small-title">Contact</p>
                            <Link to="/contact">
                                <span>프로젝트 문의하기</span>
                            </Link>
                        </div>
                    </div>
                    <div className="project-detail__bottom-block">
                        <p className="small-title">Related Work</p>
                        <div className="box-container">
                            {relatedWork.map((item) =>
                                <div className="related-box" key={item.idx}>
                                    <WorkBox item={item} thumb="square"/>
                                </div>
                            )}
                        </div>
                        <button type="button" className="go-top">Back to top</button>
                    </div>
                </div>

            </div>
            
        </PageTransition>
    );
}

function ImageVideo(props) {
    let item = '';
    if (props.src.split('.')[1] == 'mp4') {
        item = (
            <video>
                <source src={props.src} type="video/mp4"></source>
            </video>
        );
    } else {
        item = <img src={props.src} />;
    }
    return <div>{item}</div>;
}

export default ProjectDetail;

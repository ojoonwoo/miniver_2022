import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ProjectDetail(props) {
    const params = useParams();

    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    let dispatch = useDispatch();

    const [projectData, setProjectData] = useState([]);
    
    useEffect(() => {
        dispatch(changeColor('black'));
        async function getProjectData() {
            const result = await axios({
                method: 'get',
                url: '/api/work/getdetail',
                params: { idx: params.id },
            });
            setProjectData(result.data);
            console.log(result.data);
        }
        getProjectData();
        sequence();
            console.log('project detail mount');
        return () => {
            console.log('project detail unmount');
        };
    }, []);

    const heroAnimation = useAnimation();
    const otherAnimation = useAnimation();
    async function sequence() {
        await heroAnimation.start({ margin: 0,
            transition:{delay: 1, duration: 0.5}
         });
        await heroAnimation.start({ padding: 0 });
        await otherAnimation.start({ opacity: 1,
            transition:{duration: 0.3}
         }) 
        // await middleAnimation.start({ opacity: 1,
        //     transition:{duration: 0.3}
        // })
    }

    return (
        <PageTransition variantsName="detail">
            {/* // <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div id="container" className={props.pageName}>
                <div className="contents">
                    {/* <div className="project-detail__top-block"> */}
                    <motion.div animate={otherAnimation} className="project-detail__top-block">
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
                        <Link to={`/project/`} className="go-list">
                            <span>View List</span>
                        </Link>
                    </motion.div>
                    {/* </div> */}
                    {/* <div className="project-detail__hero">{projectData.hero_source && <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>}</div> */}
                    <motion.div animate={heroAnimation} className="project-detail__hero">{projectData.hero_source && <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>}</motion.div>
                    {/* <div className="project-detail__middle-block"> */}
                    <motion.div animate={otherAnimation} className="project-detail__middle-block">
                        <div className="grid-inner">
                            <div className="project-detail__desc">
                                <dl>
                                    <dt>Client</dt>
                                    <dd>{projectData.client_name}</dd>
                                </dl>
                                <dl>
                                    <dt>Overview</dt>
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
                    </motion.div>
                    {/* </div> */}
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

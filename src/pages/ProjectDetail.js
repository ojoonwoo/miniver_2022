import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';
import { Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import WorkBox from '../components/WorkBox';
import * as common from './../CommonFunction';
import useResizeObserver from '@react-hook/resize-observer';
import { heroBoxChangeColor } from './../store.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ProjectDetail(props) {
    const heroAnimation = useAnimation();
    const otherAnimation = useAnimation();
    const params = useParams();
    const location = useLocation();
    const [heroBoxPosition, setBoxPosition] = useState(null);
    const [goScrollTop, setScrollTop] = useState(false);
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    let device = useSelector((state) => {
        return state.currentDevice;
    });
    let heroBoxColor = useSelector((state) => {
        // console.log(state);
        return state.heroBoxColor;
    });

    // const [topBlockHeight, setTopBlockHeight] = useState(null);

    // const [rect, ref] = useClientRect();
    const rectRef = useRef(null);
    const rectSize = useSize(rectRef);
    const contentRef = useRef(null);

    let dispatch = useDispatch();

    const [projectData, setProjectData] = useState([]);
    const [relatedWork, setRelatedWork] = useState([]);

    useEffect(() => {
        dispatch(changeColor('black'));
        async function getProjectData() {
            const result = await axios({
                method: 'get',
                url: '/api/work/getdetail',
                params: { idx: params.id },
            });
            setProjectData(result.data);
            // console.log(result.data);
            const relatedWork = await axios({
                method: 'get',
                url: '/api/work/getlist',
                params: { cate: result.data.work_categories.substring(0, 1), exclude: result.data.idx, limit: 3 },
            });
            setRelatedWork(relatedWork.data.list);
        }
        getProjectData();

        console.log('project detail mount');
        return () => {
            dispatch(heroBoxChangeColor(''));
            console.log('project detail unmount');
        };
    }, []);

    useEffect(() => {
        if(projectData.hero_color) {
            dispatch(heroBoxChangeColor(projectData.hero_color));
            console.log('hero color is', projectData.hero_color);
        }
        return () => {
            dispatch(heroBoxChangeColor(''));
            console.log('hero color remove');
        };
    }, [projectData]);

    // useEffect(() => {
    //     if(projectData.length<1) {return};
    //     if(!rectSize)  {return;}

    //     const topPadding = parseFloat(window.getComputedStyle(contentRef.current).paddingTop);
    //     console.log('device', device, 'top padding', topPadding);
    //     setTopBlockHeight(rectSize.y+rectSize.height+topPadding);
    //     setBoxPosition(location.state);
    //     if(heroBoxPosition !== null && topBlockHeight !== null)  {
    //         console.log('state changed');
    //         sequence();
    //     }
    // }, [heroBoxPosition, topBlockHeight, rectSize]);
    // useEffect(() => {
    //     console.log('rect detect');
    //     // setTopBlockHeight(topBlockRef.current.clientHeight);
    //     if(rect === null)  {return;}

    //     setTopBlockHeight(rect.y+rect.height);
    //     console.log(rect.y+rect.height);
    //     setBoxPosition(location.state);
    //     if(heroBoxPosition !== null) {
    //         console.log('state changed');
    //         sequence();
    //     }
    // }, [heroBoxPosition, topBlockHeight, rect]);

    // const animInit = () => {
    //     return new Promise(function (resolve, reject) {
    //         // heroAnimation.set({
    //         //     y: heroBoxPosition.pageY
    //         // })
    //         heroAnimation.set({
    //             x: window.innerWidth / 2 - heroBoxPosition.width / 2,
    //             // x: heroBoxPosition.x,
    //             // y: -(topBlockHeight + 137) + heroBoxPosition.y,
    //             // width: heroBoxPosition.width,
    //             // height: heroBoxPosition.height
    //         });
    //         // window.scrollTo(0, 0);
    //         // document.documentElement.scrollTo({
    //         //     top: 0,
    //         //     behavior: "smooth",
    //         //     duration: 0.1
    //         // });
    //         resolve(true);
    //     });
    // };
    // async function sequence() {
    //     // await heroAnimation.start({y: (boxPosition.y-266), width: boxPosition.width});
    //     // await animInit();

    //     await heroAnimation.start({
    //         y: 0,
    //         transition: { duration: 0.3, delay: 0.5, ease: 'circOut' },
    //         // transition: {duration: 0.5}
    //     });
    //     await heroAnimation.start({ x: 0, width: '100%', height: '100%', transition: { duration: 0.3, delay: 0.1, ease: 'circOut' } });
    //     return await otherAnimation.start({ opacity: 1, transition: { duration: 0.2, delay: 0 } });
    //     // await middleAnimation.start({ opacity: 1,
    //     //     transition:{duration: 0.3}
    //     // })
    // }

    const goTopHandler = () => {
        setScrollTop(true);
        console.log(goScrollTop);
        setTimeout(function () {
            setScrollTop(false);
        }, 1000);
    };

    return (
        <PageTransition variantsName="detail" goScrollTop={goScrollTop}>
            {/* // <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div id="container" className={props.pageName}>
                <div className="contents" ref={contentRef}>
                    {projectData.category_names && (
                        <div className="project-detail__hero">
                            <div className="hero-box">
                                <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>
                            </div>
                            <div className="client-box" style={{color:heroBoxColor}}>
                                <h3 className="client-box__title-kr">{projectData.client_name_kor}</h3>
                                <h2 className="client-box__title">{projectData.client_name}</h2>
                            </div>
                        </div>
                    )}
                    <motion.div animate={otherAnimation} className="project-detail__top-block" ref={rectRef}>
                        <div className="left">
                            <h2 className="small-title">Title</h2>
                        </div>
                        <div className="right">
                            <p className="project-detail__title-kr">{projectData.work_title_kor}</p>
                            <p className="page-title project-detail__title">{projectData.work_title}</p>
                            <div className="project-detail_categories">
                                {projectData.category_names &&
                                    projectData.category_names.map((value, idx) => (
                                        <span key={idx} className="project-detail__category">
                                            #{value}
                                        </span>
                                    ))}
                            </div>
                        </div>
                        <Link to={`/project/`} className="go-list">
                            <span>View List</span>
                        </Link>
                    </motion.div>
                    {/* {projectData.category_names && heroBoxPosition && rectSize !== null && */}
                    {/* {projectData.category_names && heroBoxPosition && topBlockHeight &&
                    <div className="project-detail__hero">
                        {`project detail boxPosition y: ${heroBoxPosition.y}`}
                        {`project detail topBlockHeight: ${topBlockHeight}`}
                        {device == 'mobile' ?
                            <motion.div className="hero-box" initial={{
                                x: heroBoxPosition.x,
                                y: (-topBlockHeight + heroBoxPosition.y),
                                width: heroBoxPosition.width,
                                height: heroBoxPosition.height
                                }} animate={heroAnimation}>
                                <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>
                            </motion.div>
                        : 
                            <div className="hero-box">
                                <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`}></ImageVideo>
                            </div>
                        }
                    </div>
                    } */}
                    <motion.div animate={otherAnimation} className="project-detail__middle-block">
                        <div className="project-detail__details">
                            <Swiper
                                // install Swiper modules
                                modules={[Scrollbar, FreeMode, A11y]}
                                spaceBetween={device === 'mobile' ? 10 : 20}
                                slidesPerView={'auto'}
                                // slidesOffsetBefore={device==='mobile' ? 30 : (window.innerWidth-1200)/2}
                                // slidesOffsetBefore={window.innerWidth === 'mobile' ? (window.innerWidth / 100 * 2.666666) * 30 : window.innerWidth / 100 * 7.8125}
                                slidesOffsetBefore={window.innerWidth >= 1200 ? (window.innerWidth / 100 * 0.52) * 15 : window.innerWidth >= 720 ? (window.innerWidth / 100 * 2) * 3 : (window.innerWidth / 100 * 2.666666) * 3}
                                slidesOffsetAfter={window.innerWidth >= 1200 ? (window.innerWidth / 100 * 0.52) * 15 : window.innerWidth >= 720 ? (window.innerWidth / 100 * 2) * 3 : (window.innerWidth / 100 * 2.666666) * 3}
                                scrollbar={{ el: '.slideshow-scrollbar', draggable: false }}
                                freeMode={true}
                                updateOnWindowResize={true}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                                onResize={(swiper) => {
                                    // if(device==='desktop') {
                                    //     swiper.params.slidesOffsetAfter = (window.innerWidth-1200)/2;
                                    //     swiper.params.slidesOffsetBefore = (window.innerWidth-1200)/2;
                                    //     swiper.update();
                                    // }
                                }}
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
                        <div className="grid-inner">
                            <div className="project-detail__desc">
                                <div className="left">
                                    <dl>
                                        <dt className="small-title">Overview</dt>
                                    </dl>
                                </div>
                                <div className="right">
                                    <dl>
                                        <dd>{projectData.work_overview}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="project-detail__mockup">
                            <div className="mockup-box">
                            {projectData.detail_sources2 &&
                                <ImageVideo src={`/works/${projectData.idx}/detail_sources2/${projectData.detail_sources2}`}></ImageVideo>
                            }
                            </div>
                        </div>
                        <div className="contact-block">
                            <div className="inner">
                                <div className="left">
                                    <p className="small-title">Contact</p>
                                </div>
                                <div className="right">
                                    <Link to="/contact">
                                        <span>프로젝트 문의하기</span>
                                        <svg viewBox="0 0 29 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5.97348H27.375L22.4989 1" stroke="#404040" strokeLinecap="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div animate={otherAnimation} className="project-detail__bottom-block">
                        <p className="small-title">Related Work</p>
                        <div className="box-container">
                            <Swiper
                                // install Swiper modules
                                modules={[Scrollbar, A11y]}
                                spaceBetween={device === 'mobile' ? 10 : 20}
                                slidesPerView={'auto'}
                                // slidesOffsetBefore={device === 'mobile' ? 64 : 150}
                                // slidesOffsetAfter={device === 'mobile' ? 64 : 150}
                                slidesOffsetBefore={window.innerWidth >= 1200 ? (window.innerWidth / 100 * 0.52) * 15 : window.innerWidth >= 720 ? (window.innerWidth / 100 * 2) * 6.4 : (window.innerWidth / 100 * 2.666666) * 6.4}
                                slidesOffsetAfter={window.innerWidth >= 1200 ? (window.innerWidth / 100 * 0.52) * 15 : window.innerWidth >= 720 ? (window.innerWidth / 100 * 2) * 6.4 : (window.innerWidth / 100 * 2.666666) * 6.4}
                                // freeMode={true}
                                updateOnWindowResize={true}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                                onResize={(swiper) => {
                                    // if(device==='desktop') {
                                    //     swiper.params.slidesOffsetAfter = (window.innerWidth-1200)/2;
                                    //     swiper.params.slidesOffsetBefore = (window.innerWidth-1200)/2;
                                    //     swiper.update();
                                    // }
                                }}
                            >
                                {relatedWork.map((slideContent, index) => (
                                    <SwiperSlide className="related-box" key={index}>
                                        {/* <div className="related-box" key={item.idx}> */}
                                        <WorkBox item={slideContent} />
                                        {/* </div> */}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <button type="button" className="go-top" onClick={goTopHandler}>
                            Back to top
                        </button>
                        {/* </div> */}
                    </motion.div>
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

// hook으로 빼기
function useClientRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback((node) => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}

const useSize = (target) => {
    const [size, setSize] = useState();

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect());
    }, [target]);

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect));
    return size;
};

export default ProjectDetail;

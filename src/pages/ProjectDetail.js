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
import useResizeObserver from '@react-hook/resize-observer';
import { heroBoxChangeColor } from './../store.js';

import Footer from '../components/Footer';
import Header from '../components/Header';

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
            // console.log(result.data);

            setProjectData(result.data);
            let related_work;
            if(result.data.related_work) {
            // * 연관 프로젝트가 세팅되어있을때
                related_work = result.data.related_work;
                // console.log(related_work);
                const relatedWork = await axios({
                    method: 'get',
                    url: '/api/work/getrelatedlist',
                    params: { idx: related_work, limit: 3 },
                });
                // console.log(relatedWork.data.list);
                setRelatedWork(relatedWork.data.list);
            } else {
            // * 연관 프로젝트가 세팅되어있지않을때
                related_work = result.data.work_categories.substring(0, 1);
                // console.log(related_work);
                const relatedWork = await axios({
                    method: 'get',
                    url: '/api/work/getlist',
                    params: { cate: related_work, exclude: result.data.idx, limit: 3 },
                });
                // console.log(relatedWork.data.list);
                setRelatedWork(relatedWork.data.list);
            }
            // console.log(related_work);
            // console.log(relatedWork.data.list);
            // setRelatedWork(relatedWork.data.list);
        }
        getProjectData();

        // console.log('project detail mount');
        return () => {
            dispatch(heroBoxChangeColor(''));
            // console.log('project detail unmount');
        };
    }, []);

    useEffect(() => {
        if (projectData.hero_color) {
            dispatch(heroBoxChangeColor(projectData.hero_color));
            // console.log('hero color is', projectData.hero_color);
        }
        return () => {
            dispatch(heroBoxChangeColor(''));
            // console.log('hero color remove');
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

    const containerRef = useRef(null);
    const goTopHandler = () => {
        // setScrollTop(true);
            // setScrollTop(false);
            // containerRef.current.scrollTo({
            //     top: 0,
            //     behavior: 'smooth',
            //     duration: 0.1,
            // });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
                duration: 0.1,
            });
    };

    // TODO: videoRef 각 비디오마다 동적으로 들어가도록
    const videoRef = useRef({
        "details1": [],
        "details2": []
    });
    // TODO: handlePlay 각 비디오 ref를 props로 받아서 함수 재활용
    // const [videoPaused, setVideoPause] = useState(true);
    // const [videoPaused, setVideoPause] = useState({
    //     "details1": [],
    //     "details2": []
    // });
    const [playingVideo, setPlayVideo] = useState(null);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    // useEffect(() => {
    //     let itemList = videoPaused.details1.slice();
    //     if(projectData.detail_sources1_arr) {
    //         projectData.detail_sources1_arr.map((item, index) => {
    //             itemList[index] = true;
    //         });
    //         setVideoPause({"details": itemList});
    //     }
    // }, [projectData]);
    function handlePlay(area, index) {

        Object.keys(videoRef.current).forEach(function(key) {
            videoRef.current[key].forEach(function(element, idx) {
                element.pause();
            });
        });
        if(videoRef.current[area][index] == playingVideo) {
            videoRef.current[area][index].pause();
            setPlayVideo(null);
            setPlayingVideoId(null);
        } else {
            videoRef.current[area][index].play();
            setPlayVideo(videoRef.current[area][index]);
            setPlayingVideoId(area+'_'+index);
        }
        // videoPaused.details1[index]
        // setVideoPause(!videoPaused);

        // if(videoPaused) {
        //     Object.keys(videoRef.current).forEach(function(key) {
        //         videoRef.current[key].forEach(function(element, idx) {
        //             element.pause();
        //         });
        //     });
        //     videoRef.current[area][index].play();
        //     setVideoPause(false);
        // } else {
        //     // console.log(videoRef.current);
        //     // videoRef.current.pause();
        //     videoRef.current[area][index].pause();
        //     setVideoPause(true);
        // }
    }
    function swiperSize() {
        let size;
        if(window.innerWidth >= 1200) {
            size = (window.innerWidth / 100) * 0.52 * 15;
        } else if(window.innerWidth < 1200 && window.innerWidth >= 720) {
            size = (window.innerWidth / 100) * 2 * 3;
        } else {
            size = (window.innerWidth / 100) * 2.666666 * 3;
        }
        return size;
    }
    function swiperSizeBottom() {
        let size;
        if(window.innerWidth >= 1200) {
            size = (window.innerWidth / 100) * 0.52 * 15;
        } else if(window.innerWidth < 1200 && window.innerWidth >= 720) {
            size = (window.innerWidth / 100) * 2 * 6.4;
        } else {
            size = (window.innerWidth / 100) * 2.666666 * 3;
        }
        return size;
    }

    function convertHTMLEntity(text){
        const span = document.createElement('span');
    
        return text
        .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
            span.innerHTML = entity;
            return span.innerText;
        });
    }

    return (
        <PageTransition variantsName="detail">
            {/* // <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <div id="container" className={props.pageName} ref={containerRef}>
                <Header />
                <div className="contents" ref={contentRef}>
                    {projectData.category_names && (
                        <div className="project-detail__hero">
                            <div className="hero-box">
                                <ImageVideo src={`/works/${projectData.idx}/hero_source/${projectData.hero_source}`} autoPlay={true}></ImageVideo>
                            </div>
                            <div className="client-box" style={{ color: heroBoxColor }}>
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
                    {projectData.detail_sources1_arr &&
                    <motion.div animate={otherAnimation} className="project-detail__middle-block">
                        <div className="project-detail__details">
                            <Swiper
                                // install Swiper modules
                                modules={[Scrollbar, FreeMode, A11y]}
                                spaceBetween={device === 'mobile' ? 10 : 20}
                                slidesPerView={'auto'}
                                slidesOffsetBefore={swiperSize}
                                slidesOffsetAfter={swiperSize}
                                scrollbar={{ el: '.slideshow-scrollbar', dragSize: device==='mobile' ? (0.02666*window.innerWidth)*20.5/projectData.detail_sources1_arr.length : (0.0052*window.innerWidth)*46.8/projectData.detail_sources1_arr.length, draggable: false }}
                                freeMode={false}
                                updateOnWindowResize={true}
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log('slide change')}
                                onResize={(swiper) => {}}
                            >
                                    {
                                    projectData.detail_sources1_arr.map((slideContent, index) => (
                                        <SwiperSlide key={index}>
                                            <ImageVideo src={`/works/${projectData.idx}/detail_sources1/${slideContent}`} videoRef={ (el) => (videoRef.current['details1'][index] = el)} playingVideoId={playingVideoId} playingVideoIdProps={`details1_${index}`} handlePlay={() => handlePlay('details1', index)}></ImageVideo>
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
                                        {projectData.overview_arr && projectData.overview_arr.map((paragraph, index) => <dd key={index}>{convertHTMLEntity(paragraph)}</dd>)}
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="project-detail__mockup">
                            <div className="mockup-box">
                                {projectData.detail_sources2 && (
                                    <ImageVideo src={`/works/${projectData.idx}/detail_sources2/${projectData.detail_sources2}`} videoRef={ (el) => (videoRef.current['details2'][0] = el)} playingVideoId={playingVideoId} playingVideoIdProps={`details2_0`} handlePlay={() => handlePlay('details2', 0)}></ImageVideo>
                                )}
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
                    }
                    <motion.div animate={otherAnimation} className="project-detail__bottom-block">
                        <p className="small-title">Related Work</p>
                        <div className="box-container">
                            <Swiper
                                // install Swiper modules
                                modules={[A11y]}
                                spaceBetween={device === 'mobile' ? 10 : 20}
                                slidesPerView={'auto'}
                                slidesOffsetBefore={swiperSizeBottom}
                                slidesOffsetAfter={swiperSizeBottom}
                                // freeMode={true}
                                updateOnWindowResize={true}
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log('slide change')}
                                onResize={(swiper) => {}}
                            >
                                {relatedWork.map((slideContent, index) => (
                                    <SwiperSlide className="related-box" key={index}>
                                        <WorkBox item={slideContent} />
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
                <>{device === 'mobile' ? null : <Footer />}</>
            </div>
        </PageTransition>
    );
}

function ImageVideo(props) {
    let item = '';
    function localFired() {
        props.handlePlay();
    }
    if (props.src.split('.')[1] == 'mp4') {
        if (props.autoPlay === true) {
            item = (
                // <video>
                <video ref={props.videoRef} autoPlay muted loop playsInline={true}>
                    <source src={`${props.src}#t=0.4`} type="video/mp4"></source>
                </video>
            );
        } else {
            item = (
                // <video>
                <>
                    <video ref={props.videoRef} playsInline={true}>
                        <source src={`${props.src}#t=0.4`} type="video/mp4"></source>
                    </video>
                    {/* <div className="play_trigger" onClick={props.handlePlay}> */}
                    <div className="play_trigger" onClick={() => localFired()}>
                        <span className="play_icon">
                            {props.playingVideoId===props.playingVideoIdProps ?
                            <img src="/assets/video_btn_pause.svg"></img>
                            :
                            <img src="/assets/video_btn_play.svg"></img>
                            }
                            {/* <svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.8751 10.254C22.2411 11.0173 22.2411 12.9827 20.8751 13.746L3.72551 23.3279C2.39238 24.0727 0.750001 23.109 0.750001 21.5819L0.750002 2.41807C0.750002 0.890963 2.39238 -0.0727432 3.72552 0.672115L20.8751 10.254Z"
                                    fill="#F0F0F0"
                                />
                            </svg> */}
                        </span>
                    </div>
                </>
            );
        }
    } else {
        item = <img src={props.src} />;
    }
    // return <div>{item}</div>;
    // * 프라그먼트 사용
    return <>{item}</>;
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

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useScroll, useSpring, useTransform, MotionValue, useInView, useAnimation, useMotionValue } from 'framer-motion';
import PageTransition from '../components/PageTransition';

function Home(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    
    let device = useSelector((state) => {
        return state.currentDevice;
    });

    let dispatch = useDispatch();

    // let [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        console.log('홈 마운트');
        console.log('props', props);
        dispatch(changeColor('white'));

        return () => {
            console.log('홈 언마운트');
        };
    }, []);

    const [homeData, setHomeData] = useState([]);
    useEffect(() => {
        async function getHomeData() {
            let displayCount = device == 'mobile' ? 3 : 6;
            const result = await axios({
                method: 'get',
                url: '/api/work/getlist',
                params: { cate: 'all', limit: displayCount },
            });
            setHomeData(result.data.list);
        }
        getHomeData();

    
    }, [device]);

    const [currentSection, setCurrentSection] = useState(1);
    const [currentWork, setCurrentWork] = useState(1);
    const [animationCompleted, setAnimationComplete] = useState(true);
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const contentsRef = useRef(null);
    const slideContentsRef = useRef(null);
    const [windowResized, setWindowResized] = useState(null);

    const sectionY = useMotionValue(0);
    const workY = useMotionValue(0);

    const [currentSectionY, setCurrentSectionY] = useState(0);
    const [currentWorkY, setCurrentWorkY] = useState(0);

    useEffect(() => {
        const sectionLength = Math.floor(contentsRef.current.clientHeight/window.innerHeight);
        const workLength = 5;
        const slideBoxHeight = slideContentsRef.current.clientHeight;

        // console.log('eff wheel', currentWorkY);

        const wheelHandler = (e) => {
            // console.log('wheel handler', currentWorkY);
            e.preventDefault();
            const distance = e.deltaY;
            const direction = distance > 0 ? 'DOWN' : 'UP';
            // prev = e.deltaY;
            if(Math.abs(distance) > 20) {
                if(direction === 'UP' && currentSection < 2)
                    return false;
                if(direction === 'DOWN' && currentSection > sectionLength)
                    return false;

                if(!animationCompleted) return false;

                let move;
                let type;
                let action;

                if((direction === 'UP' && currentWork === 1) || (direction === 'DOWN' && currentWork === workLength)) {
                    action = 'section';
                }
                

                if(currentSection === 2 && action !== 'section') {
                    if(direction === 'UP') {
                        move = currentWorkY+slideBoxHeight;
                    } else {
                        move = currentWorkY-slideBoxHeight;
                    }
                    type = 'work';
                } else {
                    if(direction === 'UP') {
                        move = currentSectionY+window.innerHeight;
                    } else {
                        move = currentSectionY-window.innerHeight;
                    }
                    type = 'section';
                }
                
                animateSequence(direction, move, type);
                scrollRef.current.removeEventListener('wheel', wheelHandler);
            }
        };
        scrollRef.current.addEventListener('wheel', wheelHandler);
        return () => {
            // scrollRef.current.removeEventListener('wheel', wheelHandler);
        };
    }, [currentSection, currentWork, currentWorkY, currentSectionY]);


    
    useEffect(() => {
        let timeout;
        // console.log('eff!!!!');
        const latestWinHeight = window.innerHeight;
        // const latestBoxHeight = slideContentsRef.current.clientHeight;
        window.addEventListener('resize', () => {
            setAnimationComplete(false);
            clearTimeout(timeout);
            const winHeight = window.innerHeight;
            console.log('win resize', latestWinHeight, winHeight);
            // const boxHeight = slideContentsRef.current.clientHeight;
            const changePer = (latestWinHeight-winHeight)/latestWinHeight;
            // const changePerBox = (latestBoxHeight-boxHeight)/latestBoxHeight;
            // console.log(latestWinHeight, winHeight);
            // console.log(sectionY.current);
            const resizeSectionY = currentSectionY-(currentSectionY*changePer);
            // const resizeWorkY = currentWorkY-(currentWorkY*changePer);

            const resizeWorkY = currentWorkY - (currentWorkY*changePer);


            console.log('resizeWorkY', resizeWorkY);

            // setCurrentWorkY(currentWorkY);
            // setCurrentWorkY(resizeWorkY);
            
            workAnimate.start({
                y: resizeWorkY,
                transition: {
                    duration: 0,
                    onComplete: function() {
                        // setCurrentWorkY(resizeWorkY);
                        // setCurrentWorkY(currentWorkY - currentWorkY);
                        // setCurrentWorkY(currentWorkY - resizeWorkY);
                        // setCurrentWorkY(currentWorkY*changePer);
                        setCurrentWorkY(resizeWorkY);
                        setAnimationComplete(true);
                    }
                }
            });
            sectionAnimate.start({
                y: resizeSectionY,
                transition: {
                    duration: 0,
                    onComplete: function() {
                        // setCurrentSectionY(currentSectionY);
                        // setCurrentSectionY(sectionMoveY);
                        setCurrentSectionY(resizeSectionY);
                        setAnimationComplete(true);
                    }
                }
            });
            setWindowResized(true);
            timeout = setTimeout(() => {
                setWindowResized(false);
            }, 200);
        });
    }, [currentWorkY, currentSectionY]);

    const sectionAnimate = useAnimation();
    const workAnimate = useAnimation();
    // function mainSectionMove(direction, distance) {
    //     console.log(direction, distance);
    //     // on animating prevent scroll
    //     let next = -1;
    //     if(direction === 'UP') {
    //         next = 1;
    //     } else {
    //         next = -1;
    //     }
    //     let move = (currentSection*window.innerHeight)*next;
    //     console.log(move);

    //     animateSequence(direction, move);
    // }

    const animateSequence = async (direction, move, type) => {
        // todo
        // state 연산 타이밍
        // get current y 

        setAnimationComplete(false);
        if(type === 'work') {
            return await workAnimate.start({
                // y: sectionY.current,
                y: move,
                transition: {
                    duration: 1,
                    onComplete: function() {
                        // alert('on comp', next);
                        // currentSection+next
                        // console.log('oncomp', move);
                        const nextState = direction==='DOWN' ? currentWork+1 : currentWork-1;
                        setCurrentWorkY(move);
                        setCurrentWork(nextState);
                        setAnimationComplete(true);
                    }
                },
                
            });
        } else {
            return await sectionAnimate.start({
                // y: sectionY.current,
                y: move,
                transition: {
                    duration: 1,
                    onComplete: function() {
                        // alert('on comp', next);
                        // currentSection+next
                        // console.log('oncomp', move);
                        const nextState = direction==='DOWN' ? currentSection+1 : currentSection-1;
                        setCurrentSectionY(move);
                        setCurrentSection(nextState);
                        setAnimationComplete(true);
                    }
                },
                
            });
        }
        
    };

    

    function WorkSection({id}) {
        return (
            <div className="work-slide">
                <figure>
                    <motion.div>
                        <img src={`assets/main_work_01.jpg`}></img>
                    </motion.div>
                    <figcaption>Y22 Weight Campaign</figcaption>
                </figure>
            </div>
        );
    }
    function WorkTypo({id}) {
        return (
            <motion.div className="typo-element">
                <motion.div className="type-line-01">
                    ROYAL CANIN
                </motion.div>
                <motion.div className="type-line-02">
                    WEBSITE
                </motion.div>
            </motion.div>
        );
    }
    

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition variantsName="home">
            <div id="container" className={props.pageName} ref={scrollRef}>
            {/* <div id="container" className={props.pageName}> */}
                <div className="contents" ref={contentsRef}>
                    <motion.div className="section-container" animate={sectionAnimate} ref={containerRef}>
                        <div className="main-section section-hero">
                            <div>
                                <video autoPlay muted={true} loop preload={'auto'}>
                                    <source src={`/works/2/hero_source/9b5218308d3a8bdcae1c7559f288cef0.mp4`} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                        <div className="main-section section-work">
                            <div className="work-scroll-container">
                                <div className="work-info-typo">
                                    {[1, 2, 3, 4, 5].map((work) => (
                                        <WorkTypo key={work} id={work} />
                                    ))}
                                </div>
                                <div className="work-slide-wrapper">
                                    <div className="wrapper-inner">
                                        <motion.div className="slide-contents" animate={workAnimate} ref={slideContentsRef}>
                                            {[1, 2, 3, 4, 5].map((work) => (
                                                <WorkSection key={work} id={work} />
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-section section-about">
                            ABOUT
                        </div>
                    </motion.div>
                </div>
                {device === 'mobile' ? null : <Footer />}
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default Home;

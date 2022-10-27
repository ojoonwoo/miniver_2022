import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion, useAnimation, useAnimationControls, useMotionValue } from 'framer-motion';
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

    // const [homeData, setHomeData] = useState([]);
    // useEffect(() => {
    //     async function getHomeData() {
    //         let displayCount = device == 'mobile' ? 3 : 6;
    //         const result = await axios({
    //             method: 'get',
    //             url: '/api/work/getlist',
    //             params: { cate: 'all', limit: displayCount },
    //         });
    //         setHomeData(result.data.list);
    //     }
    //     getHomeData();

    
    // }, [device]);

    const [currentSection, setCurrentSection] = useState(1);
    const [currentWork, setCurrentWork] = useState(1);
    const [animationCompleted, setAnimationComplete] = useState(true);
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const contentsRef = useRef(null);
    const slideContentsRef = useRef(null);
    const footerRef = useRef(null);

    const [currentSectionY, setCurrentSectionY] = useState(0);
    const [currentWorkY, setCurrentWorkY] = useState(0);

    const mainWorkData = [
        {
            id: 1,
            title: "Y22 Weight Campaign",
            client: "royal canin",
            type: 'website',
            backgroundColor: '#AF2833'
        },
        {
            id: 2,
            title: "Y22 Weight Campaign2",
            client: "bioderma",
            type: 'film',
            backgroundColor: '#333333'
        },
        {
            id: 3,
            title: "Y22 Weight Campaign3",
            client: "Dolce Gusto",
            type: 'sns',
            backgroundColor: '#B827FD'
        },
    ];

    useEffect(() => {
        const sectionLength = device==='mobile' ? 3 : 4;
        const workLength = mainWorkData.length;
        const slideBoxHeight = slideContentsRef.current.clientHeight;
        const footerHeight = footerRef.current.clientHeight;


        const wheelHandler = (e) => {
            e.preventDefault();
            const distance = e.deltaY;
            const direction = distance > 0 ? 'DOWN' : 'UP';

            console.log(distance);
            console.log(currentSection, currentWork);

            
            if(Math.abs(distance) > 20) {
                if(direction === 'UP' && currentSection < 2)
                    return false;
                if(direction === 'DOWN' && currentSection >= sectionLength)
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
                        if(currentSection===sectionLength) {
                            move = currentSectionY+footerHeight;
                        } else {
                            move = currentSectionY+window.innerHeight;
                        }
                    } else {
                        if(currentSection===sectionLength-1) {
                            move = currentSectionY-footerHeight;
                        } else {
                            move = currentSectionY-window.innerHeight;
                        }
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
        const latestWinHeight = window.innerHeight;
        window.addEventListener('resize', () => {
            if(timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => {
                setAnimationComplete(false);
                const winHeight = window.innerHeight;
                const changePer = (latestWinHeight-winHeight)/latestWinHeight;
                const resizeSectionY = currentSectionY - (currentSectionY*changePer);
                const resizeWorkY = currentWorkY - (currentWorkY*changePer);

                
                workAnimate.start({
                    y: resizeWorkY,
                    transition: {
                        duration: 0,
                        onComplete: function() {
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
                            setCurrentSectionY(resizeSectionY);
                            setAnimationComplete(true);
                        }
                    }
                });
            }, 200);
        });
    }, [currentWorkY, currentSectionY]);

    const sectionAnimate = useAnimation();
    const workAnimate = useAnimation();
    const bgAnimate = useAnimation();
    const typoShowAnimate = useAnimation();

    useEffect(() => {
        animateSequenceWork();
    }, [currentSection, currentWork]);

    const animateSequenceWork = async () => {
        await bgAnimate.start({
            background: mainWorkData[currentWork-1]['backgroundColor'],
            transition: {
                duration: 0.35
            }
        });
        return await typoShowAnimate.start({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.55,
            }
        })
    };
    const animateSequence = async (direction, move, type) => {

        setAnimationComplete(false);
        if(type === 'work') {
            const nextState = direction==='DOWN' ? currentWork+1 : currentWork-1;
            // await captionAnimate.start({
            //     opacity: 0,
            //     color: '#000000',
            //     transition: {
            //         duration: 2,
            //         onComplete: function() {
            //             console.log('caption anim comp');
            //         }
            //     }
            // })
            return await workAnimate.start({
                // y: sectionY.current,
                y: move,
                transition: {
                    duration: 0.8,
                    onComplete: function() {
                        setCurrentWorkY(move);
                        setCurrentWork(nextState);
                        setAnimationComplete(true);
                    }
                },
                
            });
        } else {
            const nextState = direction==='DOWN' ? currentSection+1 : currentSection-1;
            return await sectionAnimate.start({
                y: move,
                transition: {
                    duration: 0.8,
                    onComplete: function() {
                        setCurrentSectionY(move);
                        setCurrentSection(nextState);
                        setAnimationComplete(true);
                    }
                },
                
            });
        }
        
    };


    function WorkSection({work}) {
        return (
            <div className="work-slide">
                <figure>
                    <div>
                        <img src={`assets/main_work_01.jpg`}></img>
                    </div>
                    <motion.figcaption initial={{y: 20, opacity: 0 }} animate={work.id===currentWork ? {y: 0, opacity: 1, } : {y: 20, opacity: 0}} transition={{delay: 0.7, ease: 'linear'}}>{work.title}</motion.figcaption>
                </figure>
            </div>
        );
    }
    function WorkTypo({work}) {
        return (
            <>
            <AnimatePresence>
            {work.id===currentWork &&
                <motion.div className="typo-element" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key={work.id}>
                    <div className="typo-wrap">
                        <motion.div className="typo-line typo-line-01 flow-rtl" initial={{y: '-100%'}} animate={typoShowAnimate}>
                            <motion.div className="typo-slide" animate={work.id===currentWork ? {x: '-100%'} : false} transition={
                                {
                                    delay: 1.2,
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }
                            }>
                                <span>{work.client}</span>
                                <span>{work.client}</span>
                                <span>{work.client}</span>
                            </motion.div>
                            <motion.div className="typo-slide" animate={work.id===currentWork ? {x: '-100%'} : false} transition={
                                {
                                    delay: 1.2,
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }
                            }>
                                <span>{work.client}</span>
                                <span>{work.client}</span>
                                <span>{work.client}</span>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="typo-wrap">
                        <motion.div className="typo-line typo-line-02 flow-ltr" initial={{y: '100%'}} animate={typoShowAnimate}>
                            <motion.div className="typo-slide" animate={work.id===currentWork ? {x: '100%'} : false} transition={
                                {
                                    delay: 1.2,
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }
                            }>
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                            </motion.div>
                            <motion.div className="typo-slide" animate={work.id===currentWork ? {x: '100%'} : false} transition={
                                {
                                    delay: 1.2,
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }
                            }>    
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                                <span>{work.type}</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
                }
            </AnimatePresence>
            </>
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
                            <motion.div className="work-scroll-container" animate={bgAnimate}>
                                <div className="work-info-typo">
                                    {mainWorkData.map((work) => (
                                        <WorkTypo key={work.id} work={work} />
                                    ))}
                                </div>
                                <div className="work-slide-wrapper">
                                    <div className="wrapper-inner">
                                        <motion.div className="slide-contents" animate={workAnimate} ref={slideContentsRef}>
                                            {mainWorkData.map((work) => (
                                                <WorkSection key={work.id} work={work} />
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="main-section section-about">
                            <div className="about-typo-wrap">
                                <div className="typo-wrap">
                                    <div className="typo-line">
                                        <motion.div className="typo-slide" animate={{x: '-100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE MINIVERTISING</span>
                                                <span>WE ARE MINIVERTISING</span>
                                        </motion.div>
                                        <motion.div className="typo-slide" animate={{x: '-100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE MINIVERTISING</span>
                                                <span>WE ARE MINIVERTISING</span>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="typo-wrap">
                                    <div className="typo-line flow-ltr">
                                        <motion.div className="typo-slide" animate={{x: '100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE A CREARTIVE AGENCY</span>
                                                <span>WE ARE A CREARTIVE AGENCY</span>
                                        </motion.div>
                                        <motion.div className="typo-slide" animate={{x: '100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE A CREARTIVE AGENCY</span>
                                                <span>WE ARE A CREARTIVE AGENCY</span>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="typo-wrap">
                                    <div className="typo-line">
                                        <motion.div className="typo-slide" animate={{x: '-100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE MINIVERTISING</span>
                                                <span>WE ARE MINIVERTISING</span>
                                        </motion.div>
                                        <motion.div className="typo-slide" animate={{x: '-100%'}} transition={
                                                {
                                                    delay: 1.2,
                                                    duration: 30,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }
                                            }>
                                                <span>WE ARE MINIVERTISING</span>
                                                <span>WE ARE MINIVERTISING</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref={footerRef}>
                            {device === 'mobile' ? null : <Footer/>}
                        </div>
                    </motion.div>
                </div>
                {/* {device === 'mobile' ? null : <Footer />} */}
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default Home;

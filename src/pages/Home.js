import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion, useAnimation, useAnimationControls, useMotionValue } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

function Home(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    
    let device = useSelector((state) => {
        return state.currentDevice;
    });

    let dispatch = useDispatch();

    const navigate = useNavigate();
    // let [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        console.log('홈 마운트');
        console.log('props', props);
        dispatch(changeColor('white'));
        document.body.classList.toggle('scroll-blocking');

        return () => {
            console.log('홈 언마운트');
            document.body.classList.toggle('scroll-blocking');
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

    const scrollRef = useRef(null);
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const contentsRef = useRef(null);
    const slideContentsRef = useRef(null);
    const footerRef = useRef(null);

    const [currentSection, setCurrentSection] = useState(1);
    const [currentWork, setCurrentWork] = useState(1);
    const [animationCompleted, setAnimationComplete] = useState(true);
    const [workImageHeight, setWorkImageHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);

    const [currentSectionY, setCurrentSectionY] = useState(0);
    const [currentWorkY, setCurrentWorkY] = useState(0);
    const [showreelStopped, setShowreelStopped] = useState(false);

    const mainWorkData = [
        {
            idx: 1,
            id: 1,
            title: "Y22 Weight Campaign",
            client: "royal canin",
            type: 'website',
            backgroundColor: '#AF2833'
        },
        {
            idx: 2,
            id: 6,
            title: "Humidifying Helmet",
            client: "bioderma",
            type: 'video',
            backgroundColor: '#2B43B2'
        },
        {
            idx: 3,
            id: 3,
            title: "Milka SNS",
            client: "MILKA",
            type: 'Social media',
            backgroundColor: '#7B5BCD'
        },
        {
            idx: 4,
            id: 5,
            title: "Namyang 55th Anniversary Retro Campaign",
            client: "NAMYANG",
            type: 'website',
            backgroundColor: '#9C1423'
        },
        {
            idx: 5,
            id: 4,
            title: "Cold Brew Launching",
            client: "NESCAFE DOLCEGUSTO",
            type: 'video',
            backgroundColor: '#FE8900'
        },
    ];

    useLayoutEffect(() => {
        const boxH = device==='mobile' ? Math.round(window.innerHeight - window.innerHeight*0.578) : Math.round(window.innerHeight - window.innerHeight*0.32);
        setWorkImageHeight(boxH);
        showreelChange(device);
    }, [device, workImageHeight, currentWorkY]);
    useLayoutEffect(() => {
        // currentSection default 1
        const sectionLength = 4;
        const workLength = mainWorkData.length;
        const slideBoxHeight = Math.round(slideContentsRef.current.clientHeight);
        const footerHeight = footerRef.current.clientHeight;
        setFooterHeight(footerHeight);


        let touchstartY, touchendY = 0;
        let distance;
        const scrollHandler = (e) => {
            e.stopPropagation();
            switch(e.type) {
                case "wheel":
                    e.preventDefault();
                    // e.stopImmediatePropagation();
                    distance = e.deltaY;
                    break;
                case "touchstart":
                    touchstartY = e.changedTouches[0].screenY;
                    break;
                case "touchmove":
                    e.preventDefault();
                    // e.stopImmediatePropagation();
                    break;
                case "touchend":
                    touchendY = e.changedTouches[0].screenY;
                    distance = touchstartY-touchendY
                    break;
            }

            if(Math.abs(distance) > 20) {
                pageScrollHandler(distance);            
            }
        }
        scrollRef.current.addEventListener('wheel', scrollHandler);
        scrollRef.current.addEventListener('touchstart', scrollHandler);
        scrollRef.current.addEventListener('touchmove', scrollHandler);
        scrollRef.current.addEventListener('touchend', scrollHandler);
            


        const pageScrollHandler = (distance) => {
            if(!animationCompleted) return false;
            
            // if(Math.abs(distance) > 20) {
            const direction = distance > 0 ? 'DOWN' : 'UP';
            distance = 0;
            if(direction === 'UP' && currentSection < 2)
                return false;
            if(direction === 'DOWN' && currentSection >= sectionLength)
                return false;

            let move, type, action;

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
            scrollRef.current.removeEventListener('wheel', scrollHandler);
            scrollRef.current.removeEventListener('touchstart', scrollHandler);
            scrollRef.current.removeEventListener('touchmove', scrollHandler);
            scrollRef.current.removeEventListener('touchend', scrollHandler);
            // }
        }
        return () => {
        };
    }, [currentSection, currentWork, currentWorkY, currentSectionY, workImageHeight]);

    useEffect(() => {
        // video side effect
        if(currentSection > 1) {
            setShowreelStopped(true);
            videoRef.current.pause();
        } else {
            setShowreelStopped(false);
            videoRef.current.play();
        }
        
    }, [currentSection]);
    function playToggle() {
        setShowreelStopped(!showreelStopped);
        if(showreelStopped) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }
    function muteToggle() {
        setShowreelMute(!showreelMuted);
    }
    const [showreelState, showreelChange] = useState(null);

    let timeout;
    useLayoutEffect(() => {
        const latestWinHeight = window.innerHeight;
        window.addEventListener('resize', () => {
            if(timeout) {
                clearTimeout(timeout)
            }
            setAnimationComplete(false);
            timeout = setTimeout(() => {
                const winHeight = window.innerHeight;
                const changePer = (latestWinHeight-winHeight)/latestWinHeight;
                const resizeSectionY = currentSectionY - (currentSectionY*changePer);
                const resizeWorkY = currentWorkY - Math.floor(currentWorkY*changePer);

                
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
                const boxH = device==='mobile' ? Math.floor(window.innerHeight - window.innerHeight*0.578) : Math.floor(window.innerHeight - window.innerHeight*0.32);
                setWorkImageHeight(boxH);
            }, 200);
        });
    }, [currentWorkY, currentSectionY, workImageHeight, currentSection, currentWork, device]);

    const sectionAnimate = useAnimation();
    const workAnimate = useAnimation();
    const bgAnimate = useAnimation();
    const typoShowAnimate = useAnimation();


    useLayoutEffect(() => {
        animateSequenceWork();
    }, [currentSection, currentWork, currentWorkY]);

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
                onComplete: function() {
                }
            }
        })
    };
    const animateSequence = async (direction, move, type) => {

        setAnimationComplete(false);
        if(type === 'work') {
            const nextState = direction==='DOWN' ? currentWork+1 : currentWork-1;
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
            <div className="work-slide" style={{'width': workImageHeight, 'height': workImageHeight}}>
            {/* <div className="work-slide"> */}
                <figure onClick={() => pageMove(`/project/${work.id}`)}>
                    <div>
                        <img src={`/assets/main_work_0${work.idx}.jpg`} ></img>
                    </div>
                    <motion.figcaption initial={{y: 20, opacity: 0 }} animate={work.idx===currentWork ? {y: 0, opacity: 1, } : {y: 20, opacity: 0}} transition={{delay: 0.7, ease: 'linear'}}>{work.title}</motion.figcaption>
                    <motion.span initial={{y: 20, opacity: 0 }} animate={work.idx===currentWork ? {y: 0, opacity: 1, } : {y: 20, opacity: 0}} transition={{delay: 0.7, ease: 'linear'}} className="work-indicator">{currentWork+'/'+mainWorkData.length}</motion.span>
                </figure>
            </div>
        );
    }
    // function FlowTypo({flowProps}) {
    //     return (
    //         <motion.div className={`typo-line ${flowProps.addClass}`}>
    //         </motion.div>
    //     )
    // }
    function WorkTypo({work}) {
        return (
            <>
            <AnimatePresence>
            {work.idx===currentWork &&
                <motion.div className="typo-element" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key={work.idx}>
                    <div className="typo-wrap">
                        <motion.div className="typo-line typo-line-01 flow-rtl" initial={{opacity: 0, y: '-50%'}} animate={typoShowAnimate}>
                            <motion.div className="typo-slide" animate={work.idx===currentWork ? {x: '-100%'} : false} transition={
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
                            <motion.div className="typo-slide" animate={work.idx===currentWork ? {x: '-100%'} : false} transition={
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
                        <motion.div className="typo-line typo-line-02 flow-ltr" initial={{opacity: 0, y: '50%'}} animate={typoShowAnimate}>
                            <motion.div className="typo-slide" animate={work.idx===currentWork ? {x: '100%'} : false} transition={
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
                            <motion.div className="typo-slide" animate={work.idx===currentWork ? {x: '100%'} : false} transition={
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

    function getRandomValue() {
        const num = Math.random();
        return num;
    }
    const [showreelMuted, setShowreelMute] = useState(true);
    const videoEqualizerVariants = {
        unmute: () => ({
            scaleY: getRandomValue(),
            transition: {
                repeat: Infinity,
                duration: 0.55,
                ease: 'linear',
                type: 'spring',
            }
        }),
        mute: {
            scaleY: 0.2
        }
    };

    const typoSlideVariants = {
        flow: (custom) => ({
            x: '-100%',
            transition: {
                duration: custom*30,
                repeat: Infinity,
                ease: 'linear',
            }
        }),
        flowLTR: (custom) => ({
            x: '100%',
            transition: {
                duration: custom*30,
                repeat: Infinity,
                ease: 'linear'
            }
        }),
        stop: {
            x: 0,
            transition: {
                repeat: 0
            }
        }
    }

    const aboutBalloonData = [
        {
            "className": "cour",
            "radius": true,
            "bgColor": "#EF2318",
            "item": "궁극의 용감함",
            "rotate": -10.76,
            "position": {
                "mobile": {
                    "left": "7.3rem",
                    "top": "3.2rem"
                },
                "desktop": {
                    "left": "43.8rem",
                    "top": "10rem"
                }
            }
        },
        {
            "className": "prod",
            "radius": false,
            "bgColor": "#B827FD",
            "item": "프로덕션",
            "position": {
                "mobile": {
                    "right": "2.6rem",
                    "top": "3.7rem"
                },
                "desktop": {
                    "right": "31.2rem",
                    "top": "10rem"
                }
            }
        },
        {
            "className": "mnv",
            "radius": false,
            "bgColor": "#2C2762",
            "item": "미니버",
            "position": {
                "mobile": {
                    "left": "12.2rem",
                    "top": "13.7rem"
                },
                "desktop": {
                    "left": "64.7rem",
                    "top": "35.7rem"
                }
            }
        },
        {
            "className": "crea",
            "radius": true,
            "bgColor": "#59C0F4",
            "item": "크리에이티브",
            "rotate": 13.66,
            "position": {
                "mobile": {
                    "right": "6.1rem",
                    "top": "23.7rem"
                },
                "desktop": {
                    "right": "43.2rem",
                    "top": "37rem"
                }
            }
        },
        {
            "className": "crea",
            "radius": true,
            "bgColor": "#126DEA",
            "item": "사용설명서",
            "position": {
                "mobile": {
                    "left": "3.6rem",
                    "top": "34.7rem"
                },
                "desktop": {
                    "left": "27.6rem",
                    "top": "62rem"
                }
            }
        },
        {
            "className": "arrow",
            "radius": true,
            "bgColor": "#FF9212",
            "position": {
                "mobile": {
                    "right": "6.2rem",
                    "top": "34.7rem"
                },
                "desktop": {
                    "right": "8.7rem",
                    "top": "62rem"
                }
            }
        }
    ];
    function pageMove(page) {
        navigate(page);
    }
    function AboutBalloon({balloon}) {
        
        return (
            <button type="button" className={`about-balloon ${balloon.radius ? 'is-radius' : ''} ${balloon.className}`} style={{backgroundColor: balloon.bgColor, left: balloon.position[device].left, right: balloon.position[device].right, top: balloon.position[device].top, transform: `rotate(${balloon.rotate}deg)`}} onClick={() => balloon.className==="arrow" ? pageMove("/about") : null}>
                {balloon.className==="arrow" ?
                <img src="/assets/arrow.svg"></img>
                :
                <span>
                    {balloon.item}
                </span>
                }
            </button>
        )
    }
    

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition variantsName="home">
            <div id="container" className={props.pageName} ref={scrollRef}>
            <Header />    
            {/* <div id="container" className={props.pageName}> */}
                <div className="contents" ref={contentsRef}>
                    <motion.div className="section-container" animate={sectionAnimate} ref={containerRef}>
                        <div className="main-section section-hero">
                            <div className="video-container" onClick={() => playToggle()}>
                                {/* <div className="video-btns">
                                    <img src={`/assets/video_btn_${showreelStopped===true ? 'play' : 'pause'}.svg`}></img>
                                </div> */}
                                <button type="button" className="mute-controls" onClick={(e) => {e.stopPropagation(); muteToggle()}}>
                                    <div className="equalizer">
                                        <motion.span variants={videoEqualizerVariants} animate={showreelMuted ? 'mute' : 'unmute'}></motion.span>
                                        <motion.span variants={videoEqualizerVariants} animate={showreelMuted ? 'mute' : 'unmute'}></motion.span>
                                        <motion.span variants={videoEqualizerVariants} animate={showreelMuted ? 'mute' : 'unmute'}></motion.span>
                                        <motion.span variants={videoEqualizerVariants} animate={showreelMuted ? 'mute' : 'unmute'}></motion.span>
                                    </div>
                                    <p>{showreelMuted ? 'UNMUTE' : 'MUTE'}</p>
                                </button>
                                <video autoPlay muted={showreelMuted} loop preload={'auto'} playsInline={true} ref={videoRef} key={showreelState}>
                                    <source src={`/assets/showreel_${showreelState}.mp4`} type="video/mp4"></source>
                                </video>
                                {/* {showreelState==='mobile'
                                ?
                                
                                :
                                <video autoPlay muted={showreelMuted} loop preload={'auto'} playsInline={true} ref={videoRef} key={showreelState}>
                                    <source src={`/assets/showreel_desktop.mp4`} type="video/mp4"></source>
                                </video>
                                } */}
                                
                            </div>
                        </div>
                        <div className="main-section section-work">
                            <motion.div className="work-scroll-container" animate={bgAnimate}>
                                <div className="work-info-typo">
                                    {mainWorkData.map((work) => (
                                        <WorkTypo key={work.idx} work={work} />
                                    ))}
                                </div>
                                <div className="work-slide-wrapper">
                                    <div className="wrapper-inner">
                                        <motion.div className="slide-contents" animate={workAnimate} ref={slideContentsRef}>
                                            {mainWorkData.map((work) => (
                                                <WorkSection key={work.idx} work={work} />
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="main-section section-about">
                            <div className="about-typo-wrap">
                                <div className="typo-container">
                                    {/* typography 단축 필요 */}
                                    {aboutBalloonData.map((balloon, index) => (
                                        <AboutBalloon key={index} balloon={balloon}/>
                                    ))}
                                    <div className="typo-wrap">
                                        <div className="typo-line">
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flow' : 'stop'} custom={1}>
                                                    <span>WE ARE MINIVERTISING</span>
                                                    <span>WE ARE MINIVERTISING</span>
                                            </motion.div>
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flow' : 'stop'} custom={1}>
                                                    <span>WE ARE MINIVERTISING</span>
                                                    <span>WE ARE MINIVERTISING</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="typo-wrap">
                                        <div className="typo-line flow-ltr">
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flowLTR' : 'stop'} custom={1}>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                            </motion.div>
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flowLTR' : 'stop'} custom={1}>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="typo-wrap">
                                        <div className="typo-line">
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flow' : 'stop'} custom={1.2}>
                                                    <span>WE ARE MINIVERTISING</span>
                                                    <span>WE ARE MINIVERTISING</span>
                                            </motion.div>
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flow' : 'stop'} custom={1.2}>
                                                    <span>WE ARE MINIVERTISING</span>
                                                    <span>WE ARE MINIVERTISING</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    {device === 'mobile' ?
                                    <div className="typo-wrap">
                                        <div className="typo-line flow-ltr">
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flowLTR' : 'stop'} custom={1.2}>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                            </motion.div>
                                            <motion.div className="typo-slide" variants={typoSlideVariants} animate={currentSection>=3 ? 'flowLTR' : 'stop'} custom={1.2}>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                                    <span>WE ARE A CREARTIVE AGENCY</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                    : null}
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

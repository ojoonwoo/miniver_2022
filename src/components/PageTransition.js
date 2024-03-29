import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTransitionState } from './../store';
import Header from './Header';

function PageTransition(props) {
    const pageAnimate = useAnimation();
    const loaderAnimate = useAnimation();

    let device = useSelector((state) => {
        return state.currentDevice;
    });

    let transitionState = useSelector((state) => {
        return state.transitionState;
    });

    let dispatch = useDispatch();
    const location = useLocation();

    const animateSequence = async () => {
        // * 사이트 랜딩시 애니메이션
        if (transitionState === 'site_landing') {
            await loaderAnimate.start({ opacity: 1, transition: { duration: 0.6 } });
            await pageAnimate.start({ opacity: 1, transition: { duration: 0.3, onComplete: function() {window.scrollTo(0, 0)} } });
            return await loaderAnimate.start({ opacity: 0, transition: { duration: 1, } });
            // * 페이지 전환시 애니메이션
        } else if (transitionState === 'page_transition') {
            await loaderAnimate.start({ opacity: 1, transition: { duration: 0.6 } });
            await pageAnimate.start({ opacity: 1, transition: { duration: 0.3, onComplete: function() {
                // console.log(location.pathname);
                if(location.pathname !== '/project' && location.pathname !== '/project/') {
                    // project list 에서는 scroll 유지
                    window.scrollTo(0, 0);
                }
            } } });
            return await loaderAnimate.start({ opacity: 0, transition: { duration: 1, } });
        } else {
            // console.log('애니메이트 시퀀스 none');
        }
    };

    useEffect(() => {
        // console.log('*** 트랜지션 스테이트:', transitionState);
        animateSequence();
    }, [transitionState]);

    const onScroll = (e) => {
        // console.log(e.target.scrollTop);
    };

    let menuOpened = useSelector((state) => {
        return state.menuState;
    });

    const pageConfiguration = {
        initial: {
            opacity: 0,
            zIndex: 2,
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            opacity: 0,
            y: '-1vh',
            transition: {
                duration: 0.3,
            },
        },
    };
    const loaderConfiguration = {
        initial: {
            opacity: 0,
        },
        // exit: {
        //     y: '-100%',
        // },
    };
    // useEffect(() => {
    //     if (props.goScrollTop) {
            
    //         containerRef.current.scrollTo({
    //             top: 0,
    //             behavior: 'smooth',
    //             duration: 0.1,
    //         });
    //     }
    // }, [props.goScrollTop]);
    

    useEffect(() => {
        // console.log(props.children);
        // console.log('--------');
        // console.log('transition component', props);
        // console.log('page transition mount');
        animateSequence();
        // console.log('variants name', props.variantsName)
        if(props.variantsName !== 'home') {
            dispatch(setTransitionState('page_transition'));
        }
        return () => {
            // console.log('page transition unmount');
        };
    }, []);
    return (
        // * 프라그먼트 <></>
        <>
            <motion.div variants={loaderConfiguration} initial="initial" animate={loaderAnimate} className="global-loader"></motion.div>
            {/* <motion.div variants={pageConfiguration} initial="initial" animate={pageAnimate} exit="exit" data-scroll-container ref={containerRef} onScroll={onScroll}> */}
            <motion.div variants={pageConfiguration} initial="initial" animate={pageAnimate} exit="exit" className={menuOpened ? 'page-container menu-open' : props.variantsName === 'contact' || props.variantsName === 'home' ? 'page-container scroll-disabled' : 'page-container'}>
                {/* <Header /> */}
                {props.children}
            </motion.div>
        </>
    );
}
export default PageTransition;

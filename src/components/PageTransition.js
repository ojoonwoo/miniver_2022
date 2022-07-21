import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTransitionState } from './../store';

function PageTransition(props) {
    const pageAnimate = useAnimation();
    const loaderAnimate = useAnimation();

    let transitionState = useSelector((state) => {
        return state.transitionState;
    });

    let dispatch = useDispatch();

    const animateSequence = async () => {
        if (transitionState === 'initial') {
            if(props.variantsName !== 'detail') {
                await loaderAnimate.set({ y: 0 });
            }
            await pageAnimate.start({ opacity: 1, transition: { duration: 0.3 } });
            return await loaderAnimate.start({ y: '-100%', transition: { duration: 1 } }); 
        } else if(transitionState === 'animate') {
            if(props.variantsName !== 'detail') {
                await loaderAnimate.start({ y: 0, transition: { duration: 0.6 } });
            }
            await pageAnimate.start({ opacity: 1, transition: { duration: 0.3 } });
            return await loaderAnimate.start({ y: '-100%', transition: { duration: 1 } });
        } else {
            console.log('애니메이트 시퀀스 none');
        }
    };

    useEffect(() => {
        console.log('*** 트랜지션 스테이트:',transitionState);
        animateSequence();
    }, [transitionState]);

    const containerVariants = {
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 2,
                when: 'afterChildren',
            },
        },
    };

    const animationConfiguration = {
        initial: {
            opacity: 0,
            zIndex: 2,
            transition: {
                duration: 0.5,
            },
        },
    };
    const loaderConf = {
        initial: {
            y: '-100%',
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            y: '-100%',
        },
    };

    useEffect(() => {
        console.log(props);
        console.log('page transition mount');
        animateSequence();
        if (transitionState === 'initial') {
            dispatch(setTransitionState('animate'));
        } else if (props.variantsName === 'detail') {
            // dispatch(setTransitionState('none'));
        }
        return () => {
            console.log('page transition unmount');
        };
    }, []);
    return (
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} variants={containerVariants} animate="animate" exit="exit">
            <motion.div variants={loaderConf} initial="initial" animate={loaderAnimate} className="global-loader"></motion.div>
            <motion.div variants={animationConfiguration} initial="initial" animate={pageAnimate}>
                {props.children}
            </motion.div>
        </motion.div>
    );
}
export default PageTransition;

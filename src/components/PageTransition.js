import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
// const animationConfiguration = {
//     // default: { position: 'absolute'},
//     initial: { opacity: 0, zIndex: 2, position: 'absolute', width: '100%'},
//     animate: { opacity: 1 },
//     exit: { zIndex: 1, },
// };
// const PageTransition = ({ children }) => {
//     // useEffect(() => {
//     //     console.log(children);

//     //     return () => {
//     //         console.log('unmount');
//     //     };
//     // }, []);
//     // return (
//     //         <motion.div variants={animationConfiguration} initial="initial" animate="animate" exit="exit" transition={{ duration: 1 }}>
//     //             {children}
//     //         </motion.div>
//     // );
// };
function PageTransition(props) {
    let animationConfiguration;
    // if(props.variantsName === 'detail') {
    //     animationConfiguration = {
    //         // default: { position: 'absolute'},
    //         initial: { opacity: 0, zIndex: 2, position: 'absolute', width: '100%'},
    //         animate: { opacity: 1 },
    //         exit: { zIndex: 1, },
    //     };
    // } else {

    animationConfiguration = {
        // default: { position: 'absolute'},
        initial: { opacity: 0, zIndex: 2, position: 'absolute', width: '100%' },
        animate: { opacity: 1 },
        exit: {
            opacity: 0,
            zIndex: 1,
            transition: {
                duration: 1,
                ease: [0.83, 0, 0.17, 1],
            },
        },
    };
    // }
    useEffect(() => {
        console.log(props);
        console.log('page transition mount');
        return () => {
            console.log('page transition unmount');
        };
    }, []);
    return (
        // <motion.div variants={animationConfiguration} initial="initial" animate="animate" exit="exit" transition={{ duration: 2 }}>
        <motion.div variants={animationConfiguration} initial="initial" animate="animate" exit="exit">
            {props.children}
        </motion.div>
    );
}
export default PageTransition;

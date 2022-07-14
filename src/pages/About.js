// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from './../store.js';
import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

function About(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    console.log(themeColor);
    let dispatch = useDispatch();

    useEffect(() => {
        console.log('어바웃 마운트');
        dispatch(changeColor('black'));
        return () => {
            console.log('어바웃 언마운트');
        };
    }, []);

    return (

        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeIn', duration: 0.7 }} exit={{ opacity: 0 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        // <PageTransition>
            <div id="container" className={props.pageName}>
                <div className="inner">
                    {/* <Header color="black" /> */}
                    <div className="title-block">
                        <h3 className="sub-title">Who we are</h3>
                        <h2 className="title">
                            크리에이티브가 전략입니다<br></br>아이디어가 무기입니다
                        </h2>
                    </div>
                    <div className="video-block"></div>
                    <div className="do-block">
                        <div className="inner">
                            <div className="title-block">
                                <h3 className="title">What we do</h3>
                            </div>
                            <div className="box"></div>
                        </div>
                    </div>
                    <div className="team-block">
                        <div className="inner">
                            <div className="title-block">
                                <h3 className="title">Team</h3>
                            </div>
                            <div className="box">
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="client-block">
                        <div className="inner">
                            <div className="title-block">
                                <h3 className="title">Client</h3>
                            </div>
                            <div className="box"></div>
                        </div>
                    </div>
                </div>
            </div>
        // {/* </motion.div> */}
        // </PageTransition>
    );
}

export default About;

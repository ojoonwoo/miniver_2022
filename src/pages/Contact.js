// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from './../store.js';
import { useEffect } from 'react';
import PageTransition from '../components/PageTransition';

function Contact(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });
    console.log(themeColor);
    let dispatch = useDispatch();

    useEffect(() => {
        console.log('마운트');
        dispatch(changeColor('white'));
        return () => {
            console.log('언마운트');
        };
    }, []);
    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                {/* <Header></Header> */}
                <div className="inner">
                    <div className="title-block">
                        <h3 className="title-num">1.</h3>
                        <h2 className="title">어떤 프로젝트를 문의하고 싶으신가요?</h2>
                        <p className="title-desc">(중복 선택이 가능합니다.)</p>
                    </div>
                    <div className="select-block">
                        <div className="inner">
                            <button>Compaign Site</button>
                            <button>Viral Video</button>
                            <button>Social Media</button>
                            <button>Short Video</button>
                            <button>Goods</button>
                            <button>Photography</button>
                            <input type="text" placeholder="입력하시오" />
                        </div>
                    </div>
                </div>
            </div>
            {/* </motion.div> */}
        </PageTransition>
    );
}

export default Contact;

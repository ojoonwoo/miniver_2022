import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { motion } from 'framer-motion';
// import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from './../store.js';
import PageTransition from '../components/PageTransition';
import ArrowRight from '../components/ArrowRight.js';

function Contact(props) {
    let themeColor = useSelector((state) => {
        return state.themeColor;
    });

    let contactState = useSelector((state) => {
        return state.contactState;
    });
    console.log(contactState);
    let dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState([]);
    console.log(categoryData);

    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        console.log('컨텍트 마운트');
        dispatch(changeColor('white'));
        getCategoryData();
        return () => {
            console.log('컨텍트 언마운트');
        };
    }, []);

    const getCategoryData = async () => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getcategories',
        });

        setCategoryData(result.data.list);
        console.log(result.data.list);
    };

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                {/* <Header></Header> */}
                <div className="inner">
                    <div className="surveys">
                        <div className="survey-item"></div>
                        <div className="title-block">
                            <h3 className="title-num">1.</h3>
                            <h2 className="title">
                                프로젝트를
                                <br />
                                문의하고 싶으신가요?
                            </h2>
                            <p className="title-desc">* 중복 선택</p>
                        </div>
                        <div className="input-block">
                            <div className="inner">
                                {categoryData.map((item) => (
                                    <div className="input-wrap" key={item.idx}>
                                        <label>
                                            <input type="checkbox" value={item.category_name} />
                                            <span>{item.category_name}</span>
                                        </label>
                                    </div>
                                ))}
                                {/* <button>Compaign Site</button>
                            <button>Viral Video</button>
                            <button>Social Media</button>
                            <button>Short Video</button>
                            <button>Goods</button>
                            <button>Photography</button> */}
                                <div className="input-wrap">
                                    <label>
                                        <input type="checkbox" />
                                        <span>기타</span>
                                    </label>
                                </div>
                                <button>
                                    <ArrowRight/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* // </motion.div> */}
        </PageTransition>
    );
}

export default Contact;

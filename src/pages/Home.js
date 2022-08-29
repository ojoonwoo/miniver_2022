import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
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
        dispatch(changeColor('white'));
        
        // let winWidth = window.innerWidth;
        // // * 마운트시에 데스크탑이라면 footer 숨김
        // if (winWidth >= 1200) {
        //     setIsMobile(false);
        // }
        // let a = window.addEventListener('resize', () => {
        //     console.log('윈도우 리사이즈');
        //     console.log(winWidth);
        //     winWidth = window.innerWidth;
        //     if (winWidth >= 1200) {
        //         setIsMobile(false);
        //     } else {
        //         setIsMobile(true);
        //     }
        // });
        return () => {
            // window.removeEventListener('resize', a);
            console.log('홈 언마운트');
        };
        
    }, []);

    const [homeData, setHomeData] = useState([]);
    useEffect(() => {
        async function getHomeData() {
            const result = await axios({
                method: 'get',
                url: '/api/work/getlist',
                params: { cate: 'all' },
            });
            setHomeData(result.data.list);
        }
        getHomeData();

        // axios({
        //     method: 'get',
        //     url: '/api/work/getlist',
        //     // params: {
        //     //     cate: this.state.selectedCate
        //     // }
        // }).then(res => {
        //     // this.setState({ items: res.data.list });
        //     console.log(res.data.list);
        //     mainWorks = res.data.list;
        // });
    }, []);

    return (
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <PageTransition>
            <div id="container" className={props.pageName}>
                <div className="contents">
                    {/* <Header /> */}
                    <div className="section-hero">
                    </div>
                    <div className="section-work">
                        <h3>
                            We are a creative agency
                        </h3>
                        <div>
                            <div className="grid-inner">
                                {homeData.map((item) =>
                                    <WorkBox key={item.idx} item={item} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {device==='mobile' ? null : <Footer />}
            </div>
        {/* // </motion.div> */}
        </PageTransition>
    );
}

export default Home;
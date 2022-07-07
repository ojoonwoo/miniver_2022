import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import WorkBox from '../components/WorkBox';
import { motion } from 'framer-motion';

function Home(props) {
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
        <motion.div className={props.pageName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div id="container" className={props.pageName}>
                {/* <Header /> */}
                <div className="section-hero"></div>
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
        </motion.div>
    );
}

export default Home;
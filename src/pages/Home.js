import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import WorkBox from '../components/WorkBox';

function Home() {
    const [homeData, setHomeData] = useState([]);
    useEffect(() => {
        async function getHomeData() {
            const result = await axios.get(
                '/api/work/getlist'
            );
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
        <div id="container">
            <Header />
            <div className="section-hero"></div>
            <div className="section-work">
                <h3>
                    We are a creative agency
                </h3>
                <div>
                    <div className="grid-inner">
                        {homeData.map((item) =>
                            <WorkBox key={item.idx} item={item} />
                        )};
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
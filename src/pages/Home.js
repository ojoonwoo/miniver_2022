import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

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
            <div>풀스크린 영상&이미지</div>
            <div>
                {homeData.map((item) =>
                    <li key={item.idx}>
                        <div className="test">{item.work_title}</div>
                    </li>
                )}
            </div>
        </div>
    );
}

export default Home;
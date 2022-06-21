import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import WorkBox from '../components/WorkBox';

function Project(props) {
    let categories = [];
    const sortingData = useState([]);
    useEffect(() => {
        console.log('useEffect');
        // async function getProjectData() {
        //     const result = await axios.get(
        //         '/api/work/getlist'
        //     );
        //     sortingWorkList('');
        // }
        getCategoryData();
        getProjectData('all');

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
        return () => {
            console.log('unmount');
        };
    }, []);

    const getProjectData = async(cate) => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getlist',
            params: { cate: cate },
        });
        console.log(result.data.list);
    }
    const getCategoryData = async() => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getcategories',
        });
        console.log(result);
    }

    // const sortingWorkList = (category) => {
    //     console.log('sorting');
    //     if(!category) {
    //         console.log('show all');
    //     }
    //     // initialData 에서 category로 sorting 후 sortingData 변경!
    //     // console.log(initialData);
    //     console.log(sortingData);
    // }
    
    return (
        <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div id="container" className={props.pageName}>
                <Header color="black"/>
                <div className="contents">
                    <div className="grid-inner">
                        <h1 className="page-title">Project</h1>
                        <div className="categories">

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Project;

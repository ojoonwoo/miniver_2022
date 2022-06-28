import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import WorkBox from '../components/WorkBox';
import CategoryItem from '../components/CategoryItem';

function Project(props) {
    const [projectData, setProjectData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    // let categoryData = [];
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
        setProjectData(result.data.list);
        console.log(result.data.list);
    }
    const getCategoryData = async() => {
        const result = await axios({
            method: 'get',
            url: '/api/work/getcategories',
        });
        // categoryData = result.data.list;
        setCategoryData(result.data.list);
        console.log(result.data.list);
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
                {/* <Header color="black"/> */}
                <div className="contents">
                    <div className="grid-inner">
                        <h1 className="page-title">Project</h1>
                        <div className="categories">
                            {categoryData.map((item) =>
                                <CategoryItem key={item.idx} item={item} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Project;

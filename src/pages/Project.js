import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
// import Header from '../components/Header';
import WorkBox from '../components/WorkBox';
import { changeColor } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import PageTransition from '../components/PageTransition';
import { useLocation, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { TransitionGroup, SwitchTransition, CSSTransition } from "react-transition-group";
import { createBrowserHistory } from 'history';
import ProjectDetail from './ProjectDetail';
import ProjectList from './ProjectList';

// todo
// 프로젝트 컨테이너 만들어서 리스트, 뷰 분리

function Project(props) {
    
    const history = createBrowserHistory({ window });
    const location = useLocation();

    
    let headerColor = useSelector((state) => {
        return state.headerColor;
    });
    let [workIndex, setWorkClick] = useState(0);
    let dispatch = useDispatch();
    useEffect(() => {
        console.log(location);
        // if(workFlag === true) {
        //     console.log(workFlag);
        //     navigate('/project/'+props.item.idx);
        // }

        dispatch(changeColor('black'));

        // alert('project list mount');
        return () => {
            // alert('project list unmount');
        };
    }, []);
    const workClick = (idx, e) => {
        e.preventDefault();
        // setWorkClick(idx);
        // history.push(
        //     {pathname: location.pathname+'/'+idx},
        // );
    }
    

    const [mode, setMode] = useState("in-out");

    return (
        // <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeIn', duration: 0.7 }}>
        // <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        // <PageTransition>
        <SwitchTransition mode={mode}>
            <CSSTransition
            key={location.key}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
            >
                {location.pathname==='/project' ? <ProjectList /> : <ProjectDetail className={props.pageName} />}
            </CSSTransition>
        </SwitchTransition>
            // <Outlet />
        // </PageTransition>
    );
}

export default Project;

import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import Press from './pages/Press';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Header from './components/Header';
import { setDevice } from './store.js';

import RouteChangeTracker from './components/RouteChangeTracker';


import './reset.css';
import './style.scss';

function App() {
    // RouteChangeTracker();
    // let dispatch = useDispatch();
    // * Redux store를 가져와주는 useSelector()
    let themeColor = useSelector((state) => {
        // console.log(state);
        return state.themeColor;
    });
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        let winWidth = window.innerWidth;
        // * 마운트시에 데스크탑이라면 footer 숨김
        if (winWidth >= 1200) {
            dispatch(setDevice('desktop'));
        } else {
            dispatch(setDevice('mobile'));
        }

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            // console.log('윈도우 리사이즈');
            winWidth = window.innerWidth;

            if (winWidth >= 1200) {
                dispatch(setDevice('desktop'));
            } else {
                dispatch(setDevice('mobile'));
            }

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }, []);

    return (
        <div className="App" data-theme={themeColor}>
            <RouteChangeTracker location={location}/>
            <AnimatePresence>
                {/* <Header /> */}
                <Routes key={location.pathname} location={location}>
                    <Route exact path="/" element={<Home pageName="Home" />}></Route>
                    <Route path="/about" element={<About pageName="About" />}></Route>
                    <Route path="/project/*">
                        {/* <Route index element={<Project pageName="Project" />}></Route> */}
                        <Route index element={<Project pageName="Project" />}></Route>
                        <Route path=":id" element={<ProjectDetail pageName="ProjectDetail" initial={{ opacity: 1 }} />}></Route>
                    </Route>
                    <Route path="/press" element={<Press pageName="Press" />}></Route>
                    <Route path="/contact" element={<Contact pageName="Contact" />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;

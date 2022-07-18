import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Header from './components/Header';
import { TransitionGroup, SwitchTransition, CSSTransition } from "react-transition-group";
// import logo from './logo.svg';
// import './App.css';
import './reset.css';
import './style.scss';
// import './style.scss';

function App() {
    // let dispatch = useDispatch();
    // * Redux store를 가져와주는 useSelector()
    let themeColor = useSelector((state) => {
        // console.log(state);
        return state.themeColor;
    });
    let projectIdx = useSelector((state) => {
        // console.log(state);
        return state.projectIdx;
    });
    let transitionMode = useSelector((state) => {
        console.log(state);
        return state.transitionMode;
    });
    // const [mode, setMode] = useState("out-in");
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className="App" data-theme={themeColor}>
            <Header />
            <AnimatePresence>
                <Routes key={location.pathname} location={location}>
                    <Route exact path="/" element={<Home pageName="Home" />}></Route>
                    <Route path="/about" element={<About pageName="About" />}></Route>
                    <Route path="/project/*">
                        {/* <Route index element={<Project pageName="Project" />}></Route> */}
                        <Route index element={<Project pageName="Project" />}></Route>
                        <Route path=":id" element={<ProjectDetail pageName="ProjectDetail" initial={{opacity: 1}} />}></Route>
                    </Route>
                    <Route path="/contact" element={<Contact pageName="Contact" />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;

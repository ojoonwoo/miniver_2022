import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
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
    // * Redux store를 가져와주는 useSelector()
    let themeColor = useSelector((state) => {
        // console.log(state);
        return state.themeColor;
    });
    let projectIdx = useSelector((state) => {
        // console.log(state);
        return state.projectIdx;
    });
    const [mode, setMode] = useState("out-in");
    const location = useLocation();
    return (
        <div className="App" data-theme={themeColor}>
            <Header />
            <TransitionGroup>
                {/* <CSSTransition key={location.pathname===`/project/${projectIdx}`} timeout={300} classNames="fade"> */}
                <CSSTransition key={location.pathname} timeout={300} classNames="fade">
                    <Routes location={location}>
                        <Route exact path="/" element={<Home pageName="Home" />}></Route>
                        <Route path="/about" element={<About pageName="About" />}></Route>
                        
                        <Route path="/project/*" element={<Project />}>
                            <Route path=":id" element={<ProjectDetail />}></Route>   
                        </Route>
                        {/* <Route path="/project" exact element={<Project pageName="Project" />}></Route>
                        <Route path="/project/:id" element={<ProjectDetail pageName="ProjectDetail" />}></Route> */}
                        
                        <Route path="/contact" element={<Contact pageName="Contact" />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;

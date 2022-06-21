import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
// import logo from './logo.svg';
// import './App.css';
import './reset.css';
import './style.scss';
// import './style.scss';

function App() {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        <AnimatePresence>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home pageName="Home" />}></Route>
                    <Route path="/about" element={<About pageName="About" />}></Route>
                    <Route path="/project" element={<Project />}>
                        <Route path="/project/:id" element={<ProjectDetail />}></Route>
                    </Route>
                    <Route path="/contact" element={<Contact pageName="Contact" />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </AnimatePresence>
    );
}

export default App;

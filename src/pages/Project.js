import Header from '../components/Header';
import {motion} from 'framer-motion'
function Project() {
    return (
        <motion.div className="Project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div id="container">
                <Header color="black" />
                <div className="contents">
                    <div className="grid-inner">
                        <h1 className="page-title">Project</h1>
                        <div className="categories"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Project;

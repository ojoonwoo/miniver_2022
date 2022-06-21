import {motion} from 'framer-motion';
function ProjectDetail() {
    return (
        <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div id="container">
            ProjectDetail
        </div>
        </motion.div>
    );
}

export default ProjectDetail;
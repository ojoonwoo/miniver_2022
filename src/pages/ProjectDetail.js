import {motion} from 'framer-motion';
import { useParams } from "react-router-dom";

function ProjectDetail() {
    let params = useParams();
    return (
        <motion.div className="ProjectDetail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div id="container">
            ProjectDetail
            {params.id}
        </div>
        </motion.div>
    );
}

export default ProjectDetail;
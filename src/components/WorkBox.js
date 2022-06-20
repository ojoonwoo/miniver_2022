import { Link } from 'react-router-dom';
import styles from './WorkBox.module.scss';

function WorkBox(props) {
    return (
        <div className={styles.workbox}>
            <Link to="/" className="logo">
                <div className="wrapper">
                    <div className="item-img">
                        <img src={`works/${props.item.thumb_rectangle}`}></img>
                    </div>
                    <div className="box-overlay">
                        <div className="logo-img" style={{backgroundImage: `url(works/${props.item.logo_img})`}}></div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default WorkBox;
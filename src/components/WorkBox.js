import { Link } from 'react-router-dom';
import styles from './WorkBox.module.scss';

function WorkBox(props) {
    return (
        <div className={`${styles.workbox}`}>
            <Link to="/" className={styles.logo}>
                <div className={styles.wrapper}>
                    <div className={styles['item-img']}>
                        <img src={`works/${props.item.serial}/${props.item.thumb_rectangle}`}></img>
                    </div>
                    <div className={styles['box-overlay']}>
                        <div className={styles['logo-img']} style={{backgroundImage: `url(works/${props.item.serial}/${props.item.logo_img})`}}></div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default WorkBox;
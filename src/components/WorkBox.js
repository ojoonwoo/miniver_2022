import { Link } from 'react-router-dom';
import styles from './WorkBox.module.scss';

function WorkBox(props) {
    const position = {x: 10, y: 10};
    return (
        <div className={`workbox ${styles.workbox}`}>
            {/* <Link to={`/project/${props.item.idx}`} className={styles.logo}> */}
            <Link to={`/project/${props.item.idx}`} state={{position: position}} className={styles.logo}>
                <div className={styles.wrapper}>
                    <div className={styles['item-img']}>
                        <img src={`/works/${props.item.idx}/thumb_rectangle/${props.item.thumb_rectangle}`}></img>
                    </div>
                    <div className={styles['box-overlay']}>
                        <div className={styles['logo-img']} style={{backgroundImage: `url(/works/${props.item.idx}/logo_img/${props.item.logo_img})`}}></div>
                    </div>
                </div>
                {
                props.desc ?
                <div className={`workbox__desc ${styles['workbox-desc']}`}>
                    <p className={styles['client-name']}>{props.item.client_name}</p>
                    <span className={styles.title}>{props.item.work_title}</span>
                </div> :
                ""
                }
            </Link>
        </div>
    );
}

export default WorkBox;
import styles from './CategoryItem.module.scss';
import { Link } from "react-router-dom";

function CategoryItem(props) {
    return (
        <div className={`${styles['CategoryItem']} ${props.classActive && styles.isActive}`}>
            <button type="button" onClick={(e) => {props.onClick(props.item.idx, e)}}>
                <div className={styles['name']}>{props.item.category_name}</div>
                <div className={styles['count']}>{props.item.count < 10 ? '0'+props.item.count : props.item.count}</div>
            </button>
        </div>
    );
}

export default CategoryItem;


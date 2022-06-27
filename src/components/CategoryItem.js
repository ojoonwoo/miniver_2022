import styles from './CategoryItem.module.scss';

function CategoryItem(props) {
    return (
        <div className={styles.CategoryItem}>
            <div>{props.item.category_name}</div>
            <div>{props.item.count}</div>
        </div>
    );
}

export default CategoryItem;


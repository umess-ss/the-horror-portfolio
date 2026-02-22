
import styles from './Card.module.css';

const Card = () => {
    console.log(styles);

    return (
        <div className={`${styles.container} flex flex-col items-center`}>
            <img
                src="https://dummyjson.com/image/150"
                alt="Profile"
                className={styles['my-avatar']}
            />

            <h2 className={styles.skill}>React</h2>
            <p className={styles.experience}>Beginner</p>
        </div>
    );
};

export default Card;
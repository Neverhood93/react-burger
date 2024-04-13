import styles from './button-header.module.css';

export default function ButtonHeader(props) {
    return (
        <button className={styles.button_header}>
            {props.children}
        </button>
    );
}
import { useSelector } from 'react-redux';
import styles from './TextModal.module.css';

const TextModal = () => {

  const text = useSelector(state => state.modal.text); // {title: "", body: ""}
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentContainer}>
        <h1>{text.title}</h1>
        <p>{text.body}</p>
        <div className={styles.buttonContainer}>
          <button>One</button>
          <button>Two</button>
        </div>
      </div>  
    </div>
  )
}

export default TextModal;
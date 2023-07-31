import { useDispatch, useSelector } from 'react-redux';
import styles from './TextModal.module.css';
import { modalCallbacks } from '../../../gameUtils/modalActionHandler';

const TextModal = () => {

  const modalData = useSelector(state => state.modal);
  const { options, text, confirmCallback, cancelCallback } = modalData;
  const dispatch = useDispatch();

  const handleConfirm = () => {
    modalCallbacks[confirmCallback](dispatch);
  }

  const handleCancel = () => {
    modalCallbacks[cancelCallback](dispatch);
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentContainer}>
        <h1>{text.title}</h1>
        <div style={{padding: "0 20px"}}>
          <pre>{text.body}</pre>
          <div className={styles.buttonContainer}>
            {
              options.confirmButtonText &&
              <button onClick={handleConfirm}>{options.confirmButtonText}</button>
            }
            {
              options.cancelButtonText &&
              <button onClick={handleCancel}>{options.cancelButtonText}</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextModal;
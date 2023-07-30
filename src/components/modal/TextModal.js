import { useDispatch, useSelector } from 'react-redux';
import styles from './TextModal.module.css';
import { modalCallbacks } from '../../../gameUtils/modalActionHandler';

const TextModal = () => {

  const modalData = useSelector(state => state.modal);
  const { options, text, callbackAction, cancelCallback } = modalData;
  const dispatch = useDispatch();

  const handleConfirm = () => {
    console.log("confrim called + callback action = ", callbackAction);
    modalCallbacks[callbackAction](dispatch);
  }

  const handleCancel = () => {
    console.log("cancel called + callback action = ", cancelCallback);
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
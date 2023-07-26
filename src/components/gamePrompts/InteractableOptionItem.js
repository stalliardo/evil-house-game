import styles from './InteractableOptionItem.module.css';

const InteractableOptionItem = ({...props}) => {

  const handleClick = () => {
    props.optionsSelected(props.text);
  }
  return (
    <div className="optionButton" onClick={handleClick}>{props.text}</div>
  )
}

export default InteractableOptionItem
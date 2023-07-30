import styles from './InteractableOptionItem.module.css';

const InteractableOptionItem = ({...props}) => {

  const{option} = props;

  const handleClick = () => {
    props.optionsSelected(option);
  }
  return (
    <div className="optionButton" onClick={handleClick}>{option.text}</div>
  )
}

export default InteractableOptionItem
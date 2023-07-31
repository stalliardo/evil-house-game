
const InteractableOptionItem = ({...props}) => {

  const{option} = props;

  const handleClick = () => {
    props.optionsSelected(option);
  }
  return (
    <button onClick={handleClick}>{option.text}</button>
  )
}

export default InteractableOptionItem
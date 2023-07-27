import styles from './Inventory.module.css';

const InventoryActionButton = ({...props}) => {
    const {action} = props;
    const {itemMatrixData} = props;

    const handleActionClicked = () => {
        if(action === "Examine") {
            props.examineSelected();

            return;
        }

        if(action === "Use") {
            // TODO implement
        }

        
        itemMatrixData[action.toLowerCase()]();
    }

    return (
        <div className={styles.drawerItem} onClick={handleActionClicked}>
            {action}
        </div>
    )
}

export default InventoryActionButton
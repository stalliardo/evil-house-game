import { addItemToInventory } from '../../../gameUtils/localStorageUtils';
import styles from './Inventory.module.css';

const InventoryActionButton = ({ action, itemMatrixData, boundaryInstance, examineSelected, closeInventory }) => {

    const handleActionClicked = () => {
        if (action === "Examine") {
            examineSelected();
            return;
        }

        if (action === "Use") {
            if (boundaryInstance.name === itemMatrixData.interactsWith) {
                if (itemMatrixData.useageType === "key") {
                    addItemToInventory({ name: boundaryInstance.name, value: "unlocked" }); 
                    // need to set the text
                               
                    closeInventory();
                }
            }
        }

        itemMatrixData[action.toLowerCase()]();
    }

    return (
        <div className={styles.drawerItem} onClick={handleActionClicked}>
            {action}
        </div>
    )
}

export default InventoryActionButton;



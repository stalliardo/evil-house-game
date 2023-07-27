import { addItemToInventory } from '../../../gameUtils/localStorageUtils';
import styles from './Inventory.module.css';

const InventoryActionButton = ({ action, itemMatrixData, boundaryInstance, examineSelected, closeInventory }) => {

    const handleActionClicked = () => {
        if (action === "Examine") {
            examineSelected();
            return;
        }

        if (action === "Use") {
            if (boundaryInstance.id === itemMatrixData.interactsWith) {
                if (itemMatrixData.useageType === "key") {
                    addItemToInventory({ name: boundaryInstance.id, value: "unlocked" });                    
                    boundaryInstance.updateText(itemMatrixData.doorUnlockedText);

                    // now need to close the inv and update the green text

                    // 1 - bubble up the closeInv event
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

// What does use do in the instance of the locked locker?
// Clicking use when the papaer clp is presetn open the locker





import { useState } from 'react'
import styles from './Inventory.module.css'
import { getMatrixDataForItem } from '../../../gameUtils/localStorageUtils';
import InventoryActionButton from './InventoryActionButton';

const InventoryItem = ({ ...props }) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [textDrawerText, setTextDrawerText] = useState("");

    const toggleDrawerIsOpen = () => {
        if(drawerIsOpen){
            setTextDrawerText("");
        }
        setDrawerIsOpen((prev) => !prev);
    }

    const examineSelected = () => {
        setShowTextDrawer((prev) => !prev);
        setTextDrawerText(itemMatrixData.examine());
    }

    const itemMatrixData = getMatrixDataForItem(props.item.matrixName);
    return (
        <div>
            <div className={styles.item} onClick={toggleDrawerIsOpen}>{props.item.name}</div>
            {drawerIsOpen &&
                // div that holds coth drawers
                <div>
                    <div className={styles.drawer}>
                        {itemMatrixData.actions.map((action, index) => (
                            <InventoryActionButton key={index} action={action} itemMatrixData={itemMatrixData} examineSelected={examineSelected}/>
                        ))}
                    </div>

                    {
                        textDrawerText &&
                        <div className={styles.textDrawer}>
                            {textDrawerText}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default InventoryItem
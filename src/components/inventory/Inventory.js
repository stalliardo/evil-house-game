import React from 'react';
import { getInventory } from '../../../gameUtils/localStorageUtils';
import styles from './Inventory.module.css';
import InventoryItem from './InventoryItem';

const Inventory = ({boundaryInstance, closeInventory}) => {
  const inventory = getInventory();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>    
        {inventory.map((item, index) => (
          <InventoryItem key={index} item={item} boundaryInstance={boundaryInstance} closeInventory={closeInventory}/>
        ))}
      
    </div>
  );
};

export default Inventory;

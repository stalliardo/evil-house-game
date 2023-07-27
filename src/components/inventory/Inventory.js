import React from 'react';
import { getInventory } from '../../../gameUtils/localStorageUtils';
import styles from './Inventory.module.css';
import InventoryItem from './InventoryItem';

const Inventory = () => {
  const inventory = getInventory();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>    
        {inventory.map((item, index) => (
          <InventoryItem key={index} item={item}/>
        ))}
      
    </div>
  );
};

export default Inventory;

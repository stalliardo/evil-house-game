import React from 'react';
import { getInventory } from '../../gameUtils/localStorageUtils';

const Inventory = () => {
  const inventory = getInventory(); // Assuming you have a function to get the inventory

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.name}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;

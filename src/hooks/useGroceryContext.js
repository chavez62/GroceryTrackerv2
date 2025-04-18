import { useContext } from 'react';
import { GroceryContext } from '../context/GroceryContext';

export const useGroceryContext = () => {
  const context = useContext(GroceryContext);
  
  if (!context) {
    throw new Error('useGroceryContext must be used within a GroceryProvider');
  }
  
  return context;
};
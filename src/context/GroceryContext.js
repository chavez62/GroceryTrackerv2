import { createContext, useState, useEffect, useCallback } from 'react';

export const GroceryContext = createContext();

const GroceryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [categories] = useState([
    'Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen Foods', 'Canned Goods',
    'Dry Goods', 'Beverages', 'Snacks', 'Household', 'Personal Care', 'Other'
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items by category and search term
  const handleFilter = useCallback((category, term = searchTerm) => {
    setCurrentFilter(category);
    setSearchTerm(term);
    
    let filtered = [...items];
    
    // Filter by category if not 'All'
    if (category !== 'All') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Filter by search term if present
    if (term) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('groceryItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
      setFilteredItems(JSON.parse(storedItems));
    }
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
    handleFilter(currentFilter, searchTerm);
  }, [items, handleFilter, currentFilter, searchTerm]);

  // Add a new grocery item
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      totalPrice: parseFloat(item.price) * parseFloat(item.quantity),
      date: new Date().toISOString()
    };
    setItems([...items, newItem]);
  };

  // Edit an existing grocery item
  const editItem = (id, updatedItem) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...updatedItem,
          id,
          totalPrice: parseFloat(updatedItem.price) * parseFloat(updatedItem.quantity)
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Delete a grocery item
  const deleteItem = (id) => {
    const remainingItems = items.filter(item => item.id !== id);
    setItems(remainingItems);
  };

  // Calculate the total price of all items
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };

  // Calculate total by category
  const calculateTotalByCategory = () => {
    const categoryTotals = {};
    
    categories.forEach(category => {
      const total = items
        .filter(item => item.category === category)
        .reduce((sum, item) => sum + item.totalPrice, 0);
      
      if (total > 0) {
        categoryTotals[category] = total.toFixed(2);
      }
    });
    
    return categoryTotals;
  };

  // Clear all items
  const clearAllItems = () => {
    setItems([]);
  };

  return (
    <GroceryContext.Provider
      value={{
        items,
        filteredItems,
        categories,
        currentFilter,
        searchTerm,
        addItem,
        editItem,
        deleteItem,
        handleFilter,
        calculateTotal,
        calculateTotalByCategory,
        clearAllItems,
        setSearchTerm
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryProvider;
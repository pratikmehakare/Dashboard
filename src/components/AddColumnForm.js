import React, { useState } from 'react';
import { addColumn } from '../services/oprations/tableService';

const AddColumnForm = ({ tableId, onColumnAdded }) => {
  const [columnName, setColumnName] = useState('');
  const [dataType, setDataType] = useState('text');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!columnName.trim()) {
      setError('Column name cannot be empty.');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('token')); 
    
      const res = await addColumn(tableId, { name: columnName, type: dataType }, token);

      if (res.tableConfig) {
        onColumnAdded(res.tableConfig); 
        setColumnName('');
        setDataType('text');
        setError(null); 
      } else {
        throw new Error('Failed to add column');
      }
    } catch (error) {
      console.error('Error adding column:', error);
      setError('Error adding column. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Add New Column</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="text">Text</option>
          <option value="date">Date</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Column
        </button>
      </form>
    </div>
  );
};

export default AddColumnForm;

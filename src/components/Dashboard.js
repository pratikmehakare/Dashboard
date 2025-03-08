import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TableComponent from './TableComponent';
import AddColumnForm from './AddColumnForm';
import { useNavigate } from 'react-router-dom';
import { getTableData, createTable } from '../services/oprations/tableService';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tableConfig, setTableConfig] = useState(null);
  const [creatingTable, setCreatingTable] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));


  // Establish a Socket.io connection
  useEffect(() => {
    const socket = io(process.env.SOCKET_IO);
    socket.on('dataUpdate', (newData) => {
      setData(newData);
    });
    return () => socket.disconnect();
  }, []);

  // Fetch the table configuration from backend
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await getTableData(token); 
        setTableConfig(res); 
        console.log('Config:', res);
      } catch (error) {
        console.error('Error fetching table configuration:', error);
      }
    };
    fetchConfig();
  }, [creatingTable]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Create table handler
  const handleCreateTable = async () => {
    const columns = [
      { name: 'Name', type: 'text' },
      { name: 'Date', type: 'date' }
    ];
    try {
      const res = await createTable(columns, token); // Correct API function call
      setTableConfig(res.tableConfig); // Update the tableConfig state
      setCreatingTable(false);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        {tableConfig ? null : (
          <button
            onClick={handleCreateTable}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Table
          </button>
        )}
      </div>

      {tableConfig ? (
        <>
          <TableComponent data={data} columns={tableConfig.columns} />
          <AddColumnForm
            tableId={tableConfig._id}
            onColumnAdded={(newConfig) => setTableConfig(newConfig)}
          />
        </>
      ) : (
        <p>No table configuration found. Create a table to get started.</p>
      )}
    </div>
  );
};

export default Dashboard;

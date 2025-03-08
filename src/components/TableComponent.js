import React from 'react';

const TableComponent = ({ data, columns }) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="border p-2 bg-gray-200">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border p-2">
                    {row[colIndex] || ''}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

import React from 'react';

const Filters = ({ onSearch }) => {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Buscar herramientas..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '10px', width: '50%' }}
      />
    </div>
  );
};

export default Filters;

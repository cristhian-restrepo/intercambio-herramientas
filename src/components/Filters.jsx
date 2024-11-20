import React from "react";

const Filters = ({ onSearch, onFilterCategory }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px", // Espaciado ajustado
        gap: "10px", // Espaciado entre el input y el dropdown
      }}
    >
      <input
        type="text"
        placeholder="Buscar herramientas..."
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          width: "300px",
        }}
      />
      <select
        onChange={(e) => onFilterCategory(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        <option value="">Todas las categorías</option>
        <option value="Jardinería">Jardinería</option>
        <option value="Carpintería">Carpintería</option>
        <option value="Mecánica">Mecánica</option>
        <option value="Electricidad">Electricidad</option>
        <option value="Otro">Otro</option>
      </select>
    </div>
  );
};

export default Filters;

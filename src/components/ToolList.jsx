import React from "react";

const ToolList = ({ tools, onDelete, view }) => {
  return (
    <div
      style={{
        display: view === "list" ? "block" : "grid",
        gridTemplateColumns: view === "grid" ? "repeat(auto-fit, minmax(200px, 1fr))" : "none",
        gap: view === "grid" ? "20px" : "10px",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      {tools.map((tool) => (
        <div
          key={tool.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            width: view === "grid" ? "200px" : "90%", // Más compacto en lista
            maxWidth: "600px", // Limita el ancho máximo en lista
            margin: view === "grid" ? "0 auto" : "10px auto", // Centrado en ambas vistas
            display: "flex",
            flexDirection: view === "grid" ? "column" : "row",
            alignItems: view === "grid" ? "center" : "flex-start",
            justifyContent: view === "grid" ? "space-between" : "flex-start",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          }}
        >
          <img
            src={tool.imageUrl || "https://via.placeholder.com/150"}
            alt={tool.name}
            style={{
              width: view === "grid" ? "100%" : "50px", // Ajuste de ancho según vista
              height: view === "grid" ? "150px" : "50px", // Altura fija según vista
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: view === "grid" ? "10px" : "0",
              marginRight: view === "list" ? "15px" : "0",
            }}
          />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: "5px 0",
                fontSize: "1rem",
                textTransform: "capitalize",
                textAlign: view === "grid" ? "center" : "left",
              }}
            >
              {tool.name}
            </h3>
            <p
              style={{
                margin: "5px 0",
                fontSize: "0.8rem",
                color: "#ccc",
                textAlign: view === "grid" ? "center" : "left",
              }}
            >
              {tool.description}
            </p>
            <p
              style={{
                fontStyle: "italic",
                color: "#aaa",
                fontSize: "0.8rem",
                textAlign: view === "grid" ? "center" : "left",
              }}
            >
              Categoría: {tool.category || "Sin categoría"}
            </p>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(tool.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: view === "grid" ? "10px" : "0",
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToolList;

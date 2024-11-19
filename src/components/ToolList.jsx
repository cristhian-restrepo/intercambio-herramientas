import React, { useState } from "react";

const ToolList = ({ tools, onDelete }) => {
    const [view, setView] = useState("list");
  
    const toggleView = () => setView(view === "list" ? "grid" : "list");
  
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={toggleView}>
          Cambiar a vista de {view === "list" ? "Cuadros" : "Lista"}
        </button>
        <div
          style={{
            display: view === "list" ? "block" : "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {tools.map((tool) => (
            <div
              key={tool.id}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)", 
                color: "white",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                width: "100%", 
                maxWidth: view === "grid" ? "250px" : "600px",
                margin: "0 auto",
                display: "flex",
                flexDirection: view === "list" ? "row" : "column",
                alignItems: "center",
              }}
            >
              <img
                src={tool.imageUrl || "https://via.placeholder.com/150"}
                alt={tool.name}
                style={{
                  width: view === "list" ? "50px" : "100%",
                  height: view === "list" ? "50px" : "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginBottom: view === "grid" ? "10px" : "0",
                  marginRight: view === "list" ? "10px" : "0",
                }}
              />
              <div style={{ textAlign: "left", flex: 1 }}>
                <h3 style={{ margin: "5px 0" }}>{tool.name}</h3>
                <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#ccc" }}>
                  {tool.description}
                </p>
              </div>
              <button onClick={() => onDelete(tool.id)} style={{ marginTop: "10px" }}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default ToolList;

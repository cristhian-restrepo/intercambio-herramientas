import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config"; 
import Header from "./components/Header";
import Filters from "./components/Filters";
import ToolList from "./components/ToolList";
import AddToolForm from "./components/AddToolForm";
import "./styles/App.css";

const App = () => {
  const [tools, setTools] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [showForm, setShowForm] = useState(false); 

  // Función para cargar herramientas desde Firestore
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const toolsCollection = collection(db, "tools");
        const snapshot = await getDocs(toolsCollection);
        const toolsList = snapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));
        setTools(toolsList); 
      } catch (error) {
        console.error("Error al cargar herramientas:", error);
      }
    };

    fetchTools();
  }, []);

  // Función para agregar una nueva herramienta
  const handleAddTool = async (tool) => {
    try {
      const toolsCollection = collection(db, "tools");
      const docRef = await addDoc(toolsCollection, tool); 
      setTools([...tools, { id: docRef.id, ...tool }]); 
    } catch (error) {
      console.error("Error al agregar herramienta:", error);
    }
  };

  // Función para eliminar una herramienta
  const handleDeleteTool = async (id) => {
    if (typeof id !== "string") {
      console.error("ID inválido detectado:", id); 
      return;
    }
    try {
      const docRef = doc(db, "tools", id); 
      await deleteDoc(docRef); 
      setTools(tools.filter((tool) => tool.id !== id)); 
      console.log("Herramienta eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar herramienta:", error);
    }
  };

  // Función para filtrar herramientas con base en el texto de búsqueda
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  // Alterna la visibilidad del formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Header />
      <Filters onSearch={setSearch} />
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={toggleForm}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: showForm ? "red" : "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {showForm ? "Cerrar Formulario" : "Agregar Herramienta"}
        </button>
        {showForm && <AddToolForm onAdd={handleAddTool} />}
      </div>
      <ToolList tools={filteredTools} onDelete={handleDeleteTool} />
    </div>
  );
};

export default App;

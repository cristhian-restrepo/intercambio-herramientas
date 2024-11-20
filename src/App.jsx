import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config";
import { getAuth } from "firebase/auth";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ToolList from "./components/ToolList";
import AddToolForm from "./components/AddToolForm";
import About from "./components/About";
import Login from "./components/Login";
import "./styles/App.css";

const App = () => {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("list"); // Estado para alternar vistas
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const auth = getAuth();

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLogin(false);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

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

  const handleAddTool = async (tool) => {
    try {
      const toolsCollection = collection(db, "tools");
      const docRef = await addDoc(toolsCollection, tool);
      setTools([...tools, { id: docRef.id, ...tool }]);
    } catch (error) {
      console.error("Error al agregar herramienta:", error);
    }
  };

  const handleDeleteTool = async (id) => {
    try {
      const docRef = doc(db, "tools", id);
      await deleteDoc(docRef);
      setTools(tools.filter((tool) => tool.id !== id));
    } catch (error) {
      console.error("Error al eliminar herramienta:", error);
    }
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "" || tool.category === selectedCategory)
  );

  const toggleForm = () => setShowForm(!showForm);

  const toggleView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  return (
    <div>
      <Header />
      <Filters onSearch={setSearch} onFilterCategory={handleFilterCategory} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {user ? (
          <>
            <div>
              <p style={{ margin: 0, color: "#ccc" }}>
                Bienvenido, <strong>{user.email}</strong>
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <p style={{ margin: 0, color: "#ccc" }}>
              ¿Quieres agregar productos? Inicia sesión.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
      {showLogin && <Login onLogin={handleLogin} />}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={toggleView}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Cambiar a {view === "list" ? "vista de Cuadros" : "vista de Lista"}
        </button>
        {user && (
          <>
            <button
              onClick={toggleForm}
              style={{
                marginBottom: "20px",
                padding: "10px 20px",
                backgroundColor: showForm ? "red" : "green",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {showForm ? "Cerrar Formulario" : "Agregar Herramienta"}
            </button>
            {showForm && <AddToolForm onAdd={handleAddTool} />}
          </>
        )}
      </div>
      <ToolList
        tools={filteredTools}
        onDelete={user ? handleDeleteTool : null}
        view={view} // Pasamos el estado de vista
      />
      <About />
    </div>
  );
};

export default App;

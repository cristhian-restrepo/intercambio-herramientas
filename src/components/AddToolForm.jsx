import React, { useState } from "react";

const AddToolForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && description && category && imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch("https://api.imgbb.com/1/upload?key=e3037cada480ddb135ca715afebcc39a", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          onAdd({
            name,
            description,
            category,
            imageUrl: data.data.url, // URL de la imagen cargada
          });
          setName("");
          setDescription("");
          setCategory("");
          setImageFile(null);
          alert("Herramienta agregada con éxito.");
        } else {
          alert("Error al subir la imagen. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Ocurrió un error al subir la imagen.");
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "20px auto",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
        maxWidth: "400px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <input
        type="text"
        placeholder="Nombre de la herramienta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      />
      <textarea
        placeholder="Descripción de la herramienta"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "10px",
          width: "100%",
          height: "100px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          resize: "none",
        }}
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      >
        <option value="">Selecciona una categoría</option>
        <option value="Jardinería">Jardinería</option>
        <option value="Carpintería">Carpintería</option>
        <option value="Mecánica">Mecánica</option>
        <option value="Electricidad">Electricidad</option>
        <option value="Otro">Otro</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{
          marginBottom: "10px",
          padding: "10px",
          width: "100%",
        }}
      />
      <button
        type="submit"
        className="add-tool-button"
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Agregar
      </button>
    </form>
  );
};

export default AddToolForm;

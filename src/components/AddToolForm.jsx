import React, { useState, useRef } from "react";

const AddToolForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(); 

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=e3037cada480ddb135ca715afebcc39a`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setError("Hubo un problema al subir la imagen.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre de la herramienta no puede estar vacío.");
      return;
    }
    if (!description.trim()) {
      setError("La descripción no puede estar vacía.");
      return;
    }
    if (!image) {
      setError("Debe cargar una imagen.");
      return;
    }

    setError("");
    setLoading(true);
    const imageUrl = await uploadImageToImgbb(image);

    if (imageUrl) {
      const newTool = {
        name: name.trim(),
        description: description.trim(),
        imageUrl,
      };
      onAdd(newTool);
      setName("");
      setDescription("");
      setImage(null);
      fileInputRef.current.value = ""; 
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "20px", textAlign: "center" }}
    >
      <input
        type="text"
        placeholder="Nombre de la herramienta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          width: "40%",
          marginBottom: "10px",
          border: error && !name ? "1px solid red" : "1px solid #ccc",
        }}
      />
      <br />
      <textarea
        placeholder="Descripción de la herramienta"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "10px",
          width: "40%",
          height: "80px",
          marginBottom: "10px",
          border: error && !description ? "1px solid red" : "1px solid #ccc",
        }}
      ></textarea>
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef} 
        style={{ marginBottom: "10px" }}
      />
      <br />
      {error && (
        <p style={{ color: "red", marginTop: "5px", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}
      <button
  type="submit"
  className="add-tool-button" 
>
  Agregar
</button>
    </form>
  );
};

export default AddToolForm;

import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        setEmail(""); // Limpia el campo de email
        setPassword(""); // Limpia el campo de contraseña
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onLogin(userCredential.user);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Correo de restablecimiento de contraseña enviado. Revisa tu bandeja de entrada.");
    } catch (error) {
      alert("Error al enviar el correo: " + error.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#f5f5f5",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h2>{isRegistering ? "Regístrate" : "Inicia Sesión"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <button type="submit" className="add-tool-button">
          {isRegistering ? "Registrar" : "Ingresar"}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={{
          marginTop: "10px",
          backgroundColor: "transparent",
          color: "#4caf50",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {isRegistering ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
      {!isRegistering && (
        <button
          onClick={handlePasswordReset}
          style={{
            marginTop: "10px",
            backgroundColor: "transparent",
            color: "#f5f5f5",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          ¿Olvidaste tu contraseña?
        </button>
      )}
    </div>
  );
};

export default Login;

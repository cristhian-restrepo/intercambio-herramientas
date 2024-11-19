import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 style={{ color: "#1db954", fontSize: "2.5rem", margin: "0" }}>
Tú página para el intercambio de herramientas</h1>
<p></p>
<p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "#ccc" }}>
        Una plataforma diseñada para facilitar el intercambio, alquiler o venta de herramientas entre usuarios. Encuentra lo que necesitas o comparte tus herramientas con otros de manera sencilla y rápida.
      </p>
    </header>
  );
};

export default Header;

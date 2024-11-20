import React from "react";

const About = () => {
  return (
    <section
      style={{
        padding: "50px 20px",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#f5f5f5",
        marginTop: "20px",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>¿Quiénes Somos?</h2>
      <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
        Somos una plataforma que busca facilitar el intercambio, alquiler y venta de herramientas
        entre personas. Nuestro objetivo es fomentar el uso eficiente de recursos, promoviendo
        la economía circular y el ahorro.
      </p>
    </section>
  );
};

export default About;

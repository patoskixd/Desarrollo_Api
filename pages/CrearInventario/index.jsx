import React, { useState } from "react";
import { NavBar2 } from "@/components/NavBar2";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CrearInventario() {
  const router = useRouter();
  const [nombreInventario, setNombreInventario] = useState("");
  const [tipoInventario, setTipoInventario] = useState("general");

  const handleNombreInventarioChange = (event) => {
    setNombreInventario(event.target.value);
  };

  const handleTipoInventarioChange = (event) => {
    setTipoInventario(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create the data object to send to the API
    const data = {
      nombre_inventario: nombreInventario,
      tipo_inventario: tipoInventario === "general" ? 0 : 1,
    };
  
    // Send the data to the API using axios
    axios
      .post("http://localhost:3000/api/inventarios", data)
      .then((response) => {
        console.log(response.data);
        // Redirect to the newly created inventory page
        router.push(`/Tablas`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <NavBar2 />
      <div id="container">
        <form onSubmit={handleSubmit}>
          <h1>Ingrese los datos solicitados para crear un nuevo inventario</h1>
          <label htmlFor="nombreInventario"></label>
          <input
            type="text"
            id="nombreInventario"
            name="nombreInventario"
            placeholder="Ingrese el nombre del inventario"
            value={nombreInventario}
            onChange={handleNombreInventarioChange}
          />
          <label className="custom-select">
            <select
              name="TipoInventario"
              id="TipoInventario"
              value={tipoInventario}
              onChange={handleTipoInventarioChange}
            >
              <option value="general">Inventario General</option>
              <option value="personalizado">Inventario Personalizado</option>
            </select>
          </label>
          <br></br>
          <button type="submit">Crear Inventario</button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar2 } from "@/components/NavBar2";
import axios from "axios";

export default function tablas({ tabla }) {
  const router = useRouter();
  const [inventarios, setInventarios] = useState(tabla); // Define the state for inventarios

  const handleDelete = async (idInventario) => {
    try {

      await axios.delete(`http://localhost:3000/api/inventarios/${idInventario}`);

      // Update the table by fetching the updated data
      const invent = await axios("http://localhost:3000/api/inventarios");
      const updatedTabla = invent.data;
      setInventarios(updatedTabla); // Update the state with the fetched data
    } catch (error) {
      console.error("Deleting inventory failed:", error);
    }
  };

  const handleDeleteObject = async (idInventario,tipo_inventario) =>{
    try{
      if(tipo_inventario === 0){
        await axios.delete(`http://localhost:3000/api/deleteAllObjects/${idInventario}`)
      }else if(tipo_inventario === 1){
        await axios.delete(`http://localhost:3000/api/deleteAllObjectsP/${idInventario}`)
      }
    }catch(error){
      console.error("Deleting objects failed:", error)
    }
  }

  return (
    <div>
      <NavBar2 />
      <div id="table-container">
        <h1 id="heading"> Inventario</h1>
        <table id="table">
          <thead>
            <tr>
              <th>ID inventarios</th>
              <th>Nombre Inventarios</th>
              <th>Tipo Inventarios</th>
              <th>Ver/Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {inventarios.map((row, index) => (
              <tr key={index}>
                <td>{row.id_inventario}</td>
                <td>{row.nombre_inventario}</td>
                {row.tipo_inventario === 0 ? (
                  <td>Inventario General</td>
                ) : row.tipo_inventario === 1 ? (
                  <td>Inventario Personalizado</td>
                ) : null}
                <td>
                  <button
                    id="boton1"
                    onClick={() => router.push(`/VerInventarios/${row.id_inventario}`)}
                  >
                    Ver
                  </button>
                  <button
                    id="boton2"
                    onClick={() => router.push(`/EditarInventarios/${row.id_inventario}`)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button id="boton3" onClick={() => [handleDelete(row.id_inventario),handleDeleteObject(row.id_inventario,row.tipo_inventario)]}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context){
  try {
    const invent = await axios("http://localhost:3000/api/inventarios");
    const tabla = invent.data;
    return {
      props: { tabla },
    };
  } catch (error) {
    console.error("Fetching data failed:", error);
    return {
      props: { tabla: [] },
    };
  }
}


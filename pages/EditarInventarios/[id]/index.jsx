"use client";
import { NavBar2 } from "@/components/NavBar2";
import React, {useState}from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function tablas(props){
const {query} = useRouter();
const {id} = query;
const [updatedObjects, setUpdatedObjects] = useState(props.objects);
const [updatedObjectsP, setUpdatedObjectsP] = useState(props.objectsp);
const [editingRowId, setEditingRowId] = useState(null);

const handleFormSubmit = async (event) => {
  event.preventDefault(); 

  const objeto = event.target.elements.nombreObjeto.value;
  const tipo = event.target.elements.tipoObjeto.value;
  const peso = event.target.elements.pesoObjeto.value;
  const valor = event.target.elements.valorObjeto.value;
  const cantidad = event.target.elements.cantidadObjeto.value;

  if (objeto.trim() === "" || tipo.trim() === "" ||peso.trim() === "" || isNaN(Number(valor)) || isNaN(Number(cantidad))) {
    alert("Complete el formulario para añadir mas objetos");
    return;
  }
  const formData = {objeto, tipo, peso, valor, cantidad,};

  try {

    await axios.post(`http://localhost:3000/api/objetos/${id}`, formData);
    event.target.reset();
    const object = await axios(`http://localhost:3000/api/objetos/${id}`);
    setUpdatedObjects(object.data);
    
    event.target.reset();
  } catch (error) {
    console.error(error);
  }
};
const handleFormSubmitP = async (event) => {
  event.preventDefault();

  const nombreObjetoP = document.getElementById("nombreObjetoP").value;
  const valorObjetoP = document.getElementById("valorObjetoP").value;
  const reservacionP = document.getElementById("reservacionObjetoP").value

  if (nombreObjetoP.trim() === "" || valorObjetoP.trim() === "") {
      alert("Complete el formulario para añadir mas objetos")

    return;
  }
  try {
    await axios.post(
      `http://localhost:3000/api/objetos_p/${id}`,
      {
        objeto_p: nombreObjetoP,
        reservacion: reservacionP,
        valor_p: valorObjetoP,
      }
      
    );
    const objectsp = await axios(`http://localhost:3000/api/objetos_p/${id}`)
    setUpdatedObjectsP(objectsp.data);
    event.target.reset();

  } catch (error) {
    console.error(error);
  }
};

const handlerDeleteObjects = async(idObjeto, tipoInventario)=>{
  const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este objeto?");
  if (!confirmed) {
    return;
  }else{
    try{
      if(Number(tipoInventario) === 0){
        await axios.delete(`http://localhost:3000/api/deleteIndObjects/${Number(idObjeto)}`);
        const object = await axios(`http://localhost:3000/api/objetos/${id}`);
        setUpdatedObjects(object.data);

      }else if(Number(tipoInventario) === 1){
        await axios.delete(`http://localhost:3000/api/deleteIndObjectsP/${Number(idObjeto)}`);
        const objectsp = await axios(`http://localhost:3000/api/objetos_p/${id}`);
        setUpdatedObjectsP(objectsp.data);
      }
    }catch(error){
      console.log(error);
    }
  }
};
const handleUpdate = async (idObjeto,tipo) => {

  if(tipo === 0){
    const objeto = document.getElementById(`objeto-${idObjeto}`).value;
    const tipo = document.getElementById(`tipo-${idObjeto}`).value;
    const peso = document.getElementById(`peso-${idObjeto}`).value;
    const valor = Number(document.getElementById(`valor-${idObjeto}`).value);
    const cantidad = Number(document.getElementById(`cantidad-${idObjeto}`).value);

    const formData = {objeto, tipo, peso, valor, cantidad,};

    try {
      await axios.post(`http://localhost:3000/api/ActIndObject/${idObjeto}`, formData);

      const object = await axios(`http://localhost:3000/api/objetos/${id}`);
      setUpdatedObjects(object.data);
      setEditingRowId(null);
    } catch (error) {
      console.error(error);
    }
  }else if(tipo === 1){
    const objeto_p = document.getElementById(`objetoP-${idObjeto}`).value;
  const reservacion = document.getElementById(`reservacion-${idObjeto}`).value;
  const valor_p = document.getElementById(`valorP-${idObjeto}`).value;

  const formDataP = {objeto_p, reservacion, valor_p};

  try {
    await axios.post(`http://localhost:3000/api/ActIndObjectP/${idObjeto}`, formDataP)
    console.log(formDataP)
    
    const object = await axios(`http://localhost:3000/api/objetos_p/${id}`);
    setUpdatedObjectsP(object.data);
    setEditingRowId(null);
  } catch (error) {
    console.error(error);
  }
  }
};
    return(
        <div >
          <NavBar2/>
            {props.tabla.tipo_inventario=== 0 ? (
            <div id="table-container">
              <h1 id="heading"> {props.tabla.nombre_inventario}</h1>
              <table id="table">
              <thead>
                <tr>
                  <th>ID objetos</th>
                  <th>Nombre Objetos</th>
                  <th>Tipo</th>
                  <th>Peso</th>
                  <th>Valor</th>
                  <th>Cantidad</th>
                  <th>ID Inventario</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
              {updatedObjects.map((row, index) => (
                <tr key={index}>
                <td>{row.id_objeto}</td>
                <td>
                  {editingRowId === row.id_objeto ? (
                    <input type="text" defaultValue={row.objeto} id={`objeto-${row.id_objeto}`} />
                  ) : (
                    row.objeto
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto ? (
                    <input type="text" defaultValue={row.tipo} id={`tipo-${row.id_objeto}`} />
                  ) : (
                    row.tipo
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto ? (
                    <input type="text" defaultValue={row.peso} id={`peso-${row.id_objeto}`} />
                  ) : (
                    row.peso
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto ? (
                    <input type="text" defaultValue={row.valor} id={`valor-${row.id_objeto}`} />
                  ) : (
                    row.valor
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto ? (
                    <input type="text" defaultValue={row.cantidad} id={`cantidad-${row.id_objeto}`} />
                  ) : (
                    row.cantidad
                  )}
                </td>
                <td>{id}</td>
                <td>
                  <button id="boton3" onClick={() => handlerDeleteObjects(row.id_objeto, props.tabla.tipo_inventario)}>Eliminar</button>
                  {editingRowId === row.id_objeto ? (
                    <button id="boton1" onClick={() => handleUpdate(row.id_objeto, props.tabla.tipo_inventario)}>Actualizar</button>
                  ) : (
                    <button id="boton2"onClick={() => setEditingRowId(row.id_objeto)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
              </tbody>
            </table>
            <div id="container2">
            <form onSubmit={handleFormSubmit}>
                <div id="forminv">
                <ul id="listainv">
                <li><input type="text" id="nombreObjeto" name="objeto" placeholder="Ingrese el nombre del objeto" /></li>
                <li><input type="text" id="tipoObjeto" name="tipo" placeholder="Ingrese el Tipo del objeto" /></li>
                <li><input type="text" id="pesoObjeto" name="peso" placeholder="Ingrese el Peso del objeto" /></li>
                <li><input type="text" id="valorObjeto" name="valor" placeholder="Ingrese el valor del objeto" /></li>
                <li><input type="text" id="cantidadObjeto" name="cantidad" placeholder="Ingrese la cantidad del objeto" /></li>
                </ul>
                </div>
                <div id="forminv">
                  <ul id="listainv">
                    <li><button id="boton1" type="submit">Guardar</button></li>
                  </ul>
                </div>
            </form>
            </div>
            </div>
             ) : props.tabla.tipo_inventario === 1 ?(
            <div id="table-container">
              <h1 id="heading"> {props.tabla.nombre_inventario}</h1>
              <table id="table">
                <thead>
              <tr>
                <th>ID objetos personalizados</th>
                <th>Nombre Objeto</th>
                <th>Reservación, Numeración</th>
                <th>Valor Personalizado</th>
                <th>ID Inventario</th>
                <th>Opciones</th>
              </tr>
              </thead>
              <tbody>
              {updatedObjectsP.map((row,index)=>(
                <tr key={index}>
                <td>{row.id_objeto_p}</td>
                <td>
                  {editingRowId === row.id_objeto_p ? (
                    <input type="text" defaultValue={row.objeto_p} id={`objetoP-${row.id_objeto_p}`} />
                  ) : (
                    row.objeto_p
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto_p ? (
                    <input type="text" defaultValue={row.reservacion} id={`reservacion-${row.id_objeto_p}`} />
                  ) : (
                    row.reservacion
                  )}
                </td>
                <td>
                  {editingRowId === row.id_objeto_p ? (
                    <input type="text" defaultValue={row.valor_p} id={`valorP-${row.id_objeto_p}`} />
                  ) : (
                    row.valor_p
                  )}
                </td>
                <td>{id}</td>
                <td>
                  <button id="boton3" onClick={() => handlerDeleteObjects(row.id_objeto_p, props.tabla.tipo_inventario)}>Eliminar</button>
                  {editingRowId === row.id_objeto_p ? (
                    <button id="boton1" onClick={() => handleUpdate(row.id_objeto_p, props.tabla.tipo_inventario)}>Actualizar</button>
                  ) : (
                    <button id="boton2"onClick={() => setEditingRowId(row.id_objeto_p)}>Editar</button>
                  )}
                </td>
              </tr>
              ))}
              </tbody>
            </table>
            <div id="container2">
            <form onSubmit={handleFormSubmitP}>
                <div id="forminv">
                <ul id="listainv">
                <li><input type="text" id="nombreObjetoP" name="objetoP" placeholder="Ingrese el Nombre del objeto" /></li>
                <li><input type="text" id="reservacionObjetoP" name="reservacionP" placeholder="Ingrese la reservación" /></li>
                <li><input type="text" id="valorObjetoP" name="valorP" placeholder="Ingrese el valor personalizado" /></li>
                </ul>
                </div>
                <div id="forminv">
                  <ul id="listainv">
                    <li><button id="boton1" type="submit">Guardar</button></li>
                  </ul>
                </div>
            </form>
            </div>
            </div>
             ):(console.log("ERROR"))}
        </div>
    );
}

export async function getServerSideProps({params}){
    const { id } = params;
  
    try {
      const [inventRes, objRes, objpRes] = await Promise.all([
        axios(`http://localhost:3000/api/inventarios/${id}`),
        axios(`http://localhost:3000/api/objetos/${id}`),
        axios(`http://localhost:3000/api/objetos_p/${id}`)
      ]);
  
      const [tabla, objects, objectsp] = await Promise.all([
        inventRes.data,
        objRes.data,
        objpRes.data
      ]);
  
      return {
        props: { tabla, objects, objectsp },
      };
    } catch (error) {
      console.error(error);
      return {
        props: { tabla: [], objects: [], objectsp: [] },
      };
    }
  }

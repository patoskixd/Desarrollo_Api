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

    const response = await axios.post(`http://localhost:3000/api/objetos/${id}`, formData);
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
    const response = await axios.post(
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
                    <td>{row.objeto}</td>
                    <td>{row.tipo}</td>
                    <td>{row.peso}</td>
                    <td>{row.valor}</td>
                    <td>{row.cantidad}</td>
                    <td>{id}</td>
                    <td><button id="boton3" onClick={() =>handlerDeleteObjects(row.id_objeto,props.tabla.tipo_inventario)}>Eliminar</button></td>
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
                    <li><button id="boton1" >Agregar</button></li>
                    <li><button id="boton2">+</button></li>
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
                <th>Reservación</th>
                <th>Valor Personalizado</th>
                <th>ID Inventario</th>
                <th>Opciones</th>
              </tr>
              </thead>
              <tbody>
              {updatedObjectsP.map((row,index)=>(
                <tr key={index}>
                <td>{row.id_objeto_p}</td>
                <td>{row.objeto_p}</td>
                <td>{row.reservacion}</td>
                <td>{row.valor_p}</td>
                <td>{id}</td>
                <td><button id="boton3" onClick={() =>handlerDeleteObjects(row.id_objeto_p,props.tabla.tipo_inventario)}>Eliminar</button></td>
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
                    <li><button id="boton1" >Agregar</button></li>
                    <li><button id="boton2">+</button></li>
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

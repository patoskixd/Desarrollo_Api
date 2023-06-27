"use client";
import { NavBar2 } from "@/components/NavBar2";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";




export default function tablas(props){
const {query} = useRouter();
const {id} = query;
  
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
                </tr>
              </thead>
              <tbody>
                {props.objects.map((row,index)=>(
                  <tr key={index}>
                  <td>{row.id_objeto}</td>
                  <td>{row.objeto}</td>
                  <td>{row.tipo}</td>
                  <td>{row.peso}</td>
                  <td>{row.valor}</td>
                  <td>{row.cantidad}</td>
                  <td>{id}</td>
                </tr>
                ))}
              </tbody>
            </table>
            <div id="container2">
            
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
              </tr>
              </thead>
              <tbody>
              {props.objectsp.map((row,index)=>(
                <tr key={index}>
                <td>{row.id_objeto_p}</td>
                <td>{row.objeto_p}</td>
                <td>{row.reservacion}</td>
                <td>{row.valor_p}</td>
                <td>{id}</td>
              </tr>
              ))}
              </tbody>
            </table>
            <div id="container2">
            
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
      console.error("Fetching data failed:", error);
      return {
        props: { tabla: [], objects: [], objectsp: [] },
      };
    }
  }

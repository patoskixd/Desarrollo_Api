"use client";
import { NavBar2 } from "@/components/NavBar2";
import React from "react";
import { useRouter } from "next/router";




export default function tablas(){
const {query} = useRouter();
const {id} = query;
  
    return(
        <div >
          <NavBar2/>
            {id === '1' ? (
            <div id="table-container">
              <h1 id="heading"> Inventario General</h1>
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
              <tr>
                <td>1</td>
                <td>Row 2, Column 2</td>
                <td>Row 2, Column 3</td>
                <td>Row 2, Column 3</td>
                <td>Row 2, Column 3</td>
                <td>Row 2, Column 3</td>
                <td>{id}</td>
                <td><button id="boton2">Editar</button><button id="boton3">Eliminar</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Row 3, Column 2</td>
                <td>Row 3, Column 3</td>
                <td>Row 3, Column 3</td>
                <td>Row 3, Column 3</td>
                <td>Row 3, Column 3</td>
                <td>{id}</td>
                <td><button id="boton2">Editar</button><button id="boton3">Eliminar</button></td>
              </tr>
              </tbody>
            </table>
            <div id="container2">
            <form >
                <div id="forminv">
                <ul id="listainv">
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el nombre del objeto" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el Tipo del objeto" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el Peso del objeto" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el valor del objeto" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese la cantidad del objeto" /></li>
                </ul>
                </div>
                <div id="forminv">
                  <ul id="listainv">
                    <li><button id="boton1">Agregar</button></li>
                    <li><button id="boton2">+</button></li>
                  </ul>
                </div>
            </form>
            </div>
            </div>
             ) : id === '2' ?(
            <div id="table-container">
              <h1 id="heading"> Inventario Personalizado</h1>
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
              <tr>
                <td>3</td>
                <td>Row 2, Column 2</td>
                <td>Row 2, Column 3</td>
                <td>Row 2, Column 3</td>
                <td>{id}</td>
                <td><button id="boton2">Editar</button><button id="boton3">Eliminar</button></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Row 3, Column 2</td>
                <td>Row 3, Column 3</td>
                <td>Row 3, Column 3</td>
                <td>{id}</td>
                <td><button id="boton2">Editar</button><button id="boton3">Eliminar</button></td>
              </tr>
              </tbody>
            </table>
            <div id="container2">
            <form >
                <div id="forminv">
                <ul id="listainv">
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el Nombre del objeto" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese la reservación" /></li>
                <li><input type="text" id="nombreObjeto" name="nombreInventario" placeholder="Ingrese el valor personalizado" /></li>
                </ul>
                </div>
                <div id="forminv">
                  <ul id="listainv">
                    <li><button id="boton1">Agregar</button></li>
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
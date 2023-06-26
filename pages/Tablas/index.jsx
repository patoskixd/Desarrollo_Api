"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar2 } from "@/components/NavBar2";



export default function tablas() {

  const router = useRouter();
    return(
      <div>
        <NavBar2/>
        <div id="table-container">
          <h1 id="heading"> Iventarios</h1>
            <table id="table">
              <thead>
                <tr>
                  <th>ID inventarios</th>
                  <th>Nombre Inventarios</th>
                  <th>Tipo Inventarios</th>
                  <th>Ver/Editar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Row 2, Column 1</td>
                  <td>Row 2, Column 2</td>
                  <td>Row 2, Column 3</td>
                  <td><button id="boton1" onClick={() => router.push('/Inventarios/1')}>Ver</button><button id="boton2" onClick={() => router.push('/Inventarios/1')}>Editar</button></td>
                </tr>
                <tr>
                  <td>Row 3, Column 1</td>
                  <td>Row 3, Column 2</td>
                  <td>Row 3, Column 3</td>
                  <td><button id="boton1" onClick={() => router.push('/Inventarios/2')}>Ver</button><button id="boton2" onClick={() => router.push('/Inventarios/2')}>Editar</button></td>
                </tr>
              </tbody>

            </table>
        </div>
      </div>
    );
}

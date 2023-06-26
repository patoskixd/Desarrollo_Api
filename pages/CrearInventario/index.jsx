"use client";
import React from "react";
import { NavBar2 } from "@/components/NavBar2";
import { useRouter } from "next/navigation";

export default function CrearInventario() {
    const router = useRouter();
    return(
        <div>
        <NavBar2/>
        <div id="container">
            <form> 
                <h1>Ingrese los datos solictados para crear un nuevo inventario</h1>
                <label htmlFor="name"></label>
                <input type="text" id="nombreInventario" name="nombreInventario" placeholder="Ingrese el nombre del inventario"/>
                <label  class="custom-select">
                    <select name="TipoInventario" id="TipoInventario">
                        <option value="general">Inventario General</option>
                        <option value="personalizado">Inventario Personalizado</option>
                    </select>
                </label>
                <br></br>
                <button type="submit" onClick={()=> router.push('/Inventarios/1')}>Crear Inventario</button>
            </form>
        </div>
        </div>         
    );
}
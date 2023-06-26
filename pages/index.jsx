"use client";
import React from "react";
import { NavBar } from '@/components/NavBar.jsx'
import { useRouter } from "next/navigation";


export default function Inicio(){
    const router = useRouter();
    return(
        <div>
            <NavBar/>
            <div id="contenedor">
                <br/>
                
                <h1 id="titulo">Bienvenido a InventApp</h1>
                <br/>
                <br/>
                <div id="containers">
                    <h3>¿Que es InventApp?</h3>
                    <br/>
                    <p id="text">
                    InventApp es una aplicación que busca una manera sencilla de manejar los productos de tu empresa, tanto la entrada y la salida de estos.
                    Esta aplicación busca una manera rapida y digitalizada de mantener un orden dentro de los productos de una empresa. Por lo que se pueden crear inventarios generales de productos guardados 
                    en general, e inventarios de productos personalizados, estos serán inventarios de productos iguales, pero que tengan sus valores personalizados. Todo esto para tener una forma mas sencilla
                    y ordenada de todos los productos, la salida y la entrada, y el manejo de estos.
                    </p>
                </div>
    
            </div>
            <br/><br/>
            <nav id="contenedor">
                <ul>
                    <li>
                        <button id="boton" onClick={() => router.push('/Registrarse')}>Registrarse</button>
                    </li>
                    <br/><br/>
                    <li><button id="boton" onClick={() => router.push('/Login')}>Iniciar Sesión</button></li>
                </ul>
            </nav>

        </div>
    );
}

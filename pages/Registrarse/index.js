"use client";
import React from "react";
import { NavBar } from '@/components/NavBar';
import { useRouter } from 'next/navigation';


export default function Register() {

    return(
        <div>
        <NavBar/>
        <div id="container">
            <form>
                <h1>Ingrese los datos solicitados para registrarse</h1>
                <br/>
                <label htmlFor="name"></label>
                <input type="text" id="nombres" name="nombres" placeholder="Ingrese sus nombres"/>

                <label htmlFor="name"></label>
                <input type="text" id="apellidos" name="apellidos" placeholder="Ingrese sus apellidos"/>

                <label htmlFor="email"></label>
                <input type="email" id="email" name="email" placeholder="Ingrese su correo"/>

                <label htmlFor="password"></label>
                <input type="password" id="passwordR" name="passwordR" placeholder="Ingrese su contraseña"/>

                <button id='boton2'>Registrarse</button>
            </form>
        </div>
        </div>
    );
}
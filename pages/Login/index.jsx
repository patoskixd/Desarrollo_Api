"use client";
import React from "react";
import {NavBar} from '@/components/NavBar'
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    return(
        <div>
            <NavBar/>
            <div id="container">
            <form>
                <h2>Ingrese los datos solicitados para Ingresar</h2>
                <br/>
                    <label htmlFor="email"></label>
                    <input type="email" id="emailI" name="emailI" placeholder="Ingrese su correo electronico" required/>

                <label htmlFor="password"></label>
                <input type="password" id="passwordI" name="passwordI" placeholder="Ingrese Contraseña" required/>
                <button id='boton2'onClick={() => router.push('/Tablas')}>Ingresar</button>

                <p>No tiene cuenta? <a onClick={() => router.push('/Registrarse')}>Registrarse</a></p>
            </form>
            </div>
        </div>
    );
}
"use client";
import Link from 'next/link'
import styles from './NavBar.module.css'
import { useRouter } from 'next/navigation';

const links = [{
    label:'Inventarios',
    route:'/Tablas'
  }, {
    label: 'Crear Inventario',
    route:'/CrearInventario',
  }, {
    label: 'Usuarios',
    route: '/Users',
  },{
    label: 'Cerrar Sesión',
    route: '/',
  }]

  
export function NavBar2() {
  const router = useRouter();
    return(
        <header  className ={styles.header}>
          <div className={styles.izquierda}><h1 onClick={() => router.push('/Tablas')}>InventApp</h1></div>
            <ul  className = {styles.navbar}>          
              {links.map(({label , route}) =>(
                
                <li key = {route}>
                  <Link href ={route}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </header>
    );
}
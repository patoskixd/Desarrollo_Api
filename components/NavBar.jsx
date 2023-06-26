import Link from 'next/link'
import styles from './NavBar.module.css'
import { useRouter } from 'next/navigation';

const links = [{
  label:'Inicio',
  route:'/'
}, {
  label: 'Ingresar',
  route:'/Login',
}, {
  label: 'Registrarse',
  route: '/Registrarse',
}]


export function NavBar() {
  const router = useRouter();
    return(
        <header  className ={styles.header}>
          <div className={styles.izquierda}><h1 onClick={() => router.push('/')}>InventApp</h1></div>
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


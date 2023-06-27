import { NavBar2 } from "@/components/NavBar2";
import axios from "axios";


export default function users(props) {
  return(
    <div>
      <NavBar2/>
      <div id="table-container">
        <h1 id="heading"> Usuarios</h1>
        <table id="table">
          <thead>
          <tr>
            <th>ID usuario</th>
            <th>Nombre</th>
            <th>Correo Electronico</th>
            <th>Permisos</th>
            <th>Cambio Permisos</th>
          </tr>
          </thead>
          <tbody>
          {props.users.map((row,index)=>(
            <tr key={index}>
            <td>{row.id_usuario}</td>
            <td>{row.nombre}</td>
            <td>{row.correo}</td>
            {row.permiso_edicion === 0 ?(<td>Solo ver</td>)
            :row.permiso_edicion === 1 ?(<td>Editar Tablas</td>)
            :row.permiso_edicion === 2 ?(<td>Edicion Total</td>)
            :null}
            <td>
              <select name="TipoInventario" id="TipoInventario">
                <option value="solover">Solo ver</option>
                <option value="modificarI">Modificar Inventarios</option>
                <option value="modificaru">Modificar Usuarios</option>
              </select>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(){

  try {
    const userRes = await axios(`http://localhost:3000/api/usuarios`);

    const users = await userRes.data

    return {
      props: {users}
    };
  } catch (error) {
    console.error("Fetching data failed:", error);
    return {
      props: { users:[] },
    };
  }
}

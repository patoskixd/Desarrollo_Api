import { NavBar2 } from "@/components/NavBar2";


export default function users() {
  return(
    <div>
      <NavBar2/>
      <div id="table-container">
        <h1 id="heading"> Usuarios</h1>
        <table id="table">
          <thead>
          <tr>
            <th>ID usuario</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo Electronico</th>
            <th>Permisos</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
            <td>Row 2, Column 3</td>
            <td>Row 2, Column 4</td>
            <td>
              <select name="TipoInventario" id="TipoInventario">
                <option value="solover">Solo ver</option>
                <option value="modificarI">Modificar Inventarios</option>
                <option value="modificaru">Modificar Usuarios</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Row 3, Column 1</td>
            <td>Row 3, Column 2</td>
            <td>Row 3, Column 3</td>
            <td>Row 3, Column 4</td>
            <td>
              <select name="TipoInventario" id="TipoInventario">
                <option value="solover">Solo ver</option>
                <option value="modificarI">Modificar Inventarios</option>
                <option value="modificaru">Modificar Usuarios</option>
              </select>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
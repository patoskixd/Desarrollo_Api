import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');



export default async function getUsuarios(req, res){

    const db = await openDatabase()
    if(req.method === "GET"){

    const allUsers = await db.all("SELECT * FROM usuarios")

    res.json(allUsers)
    }else if(req.method === "POST"){
        const createUsers = await db.prepare(
            "INSERT INTO usuarios('nombre', 'correo', 'contrasena', 'permiso_edicion') VALUES(?, ?, ?, ?)"
        );
        try{
            const response = await createUsers.run(
                req.body.nombre,
                req.body.correo,
                req.body.contrasena,
                req.body.permiso_edicion

                );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "PUT"){
        const updateUsers = await db.prepare(
            "UPDATE usuarios SET ('nombre', 'correo', 'contrasena', 'permiso_edicion') = (?, ?, ?, ?) WHERE id_usuario = ?"
        );
        try{
            const response = await updateUsers.run(
                req.body.nombre,
                req.body.correo,
                req.body.contrasena,
                req.body.permiso_edicion,
                req.body.id_usuario
            );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "DELETE"){
        const deleteUsers = await db.prepare(
            "DELETE FROM usuarios WHERE id_usuario = ?"
        );
        try{
            const response = await deleteUsers.run(req.body.id_usuario);
            await response.finalize(response);
        }catch(error){
            res.json(error,"no data is deleted");
        }
    }else{
        res.json("no data found");
    }
}
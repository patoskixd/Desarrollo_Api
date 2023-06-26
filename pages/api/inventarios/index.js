import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');



export default async function getInventarios(req, res){

    const db = await openDatabase()
    if(req.method === "GET"){

    const allInventories = await db.all("SELECT * FROM inventarios")

    res.json(allInventories)
    }else if(req.method === "POST"){
        const createInventories = await db.prepare(
            "INSERT INTO inventarios('tipo_inventario', 'nombre_inventario') VALUES(?, ?)"
        );
        try{
            const response = await createInventories.run(
                req.body.tipo_inventario,
                req.body.nombre_inventario

                );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "PUT"){
        const updateInventories = await db.prepare(
            "UPDATE inventarios SET ('tipo_inventario', 'nombre_inventario') = (?,?) WHERE id_inventario = ?"
        );
        try{
            const response = await updateInventories.run(
                req.body.tipo_inventario,
                req.body.nombre_inventario,
                req.body.id_inventario
            );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "DELETE"){
        const deleteInventories = await db.prepare(
            "DELETE FROM inventarios WHERE id_inventario = ?"
        );
        try{
            const response = await deleteInventories.run(req.body.id_inventario);
            await response.finalize(response);
        }catch(error){
            res.json(error,"no data is deleted");
        }
    }else{
        res.json("no data found");
    }
}
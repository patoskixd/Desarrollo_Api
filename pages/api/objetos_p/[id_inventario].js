import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');

export default async function getObjetos(req, res){
    const db = await openDatabase()
    if(req.method === "GET"){

    const ObjectPByIdInventorie = await db.all("SELECT * FROM objetos_p WHERE id_inventario = ?", [req.query.id_inventario])

    res.json(ObjectPByIdInventorie)
    }else if(req.method === "POST"){
        const createObjectsP = await db.prepare(
            "INSERT INTO objetos_p('objeto_p','reservacion','valor_p','id_inventario') VALUES(?, ?, ?, ?)"
        );
        try{
            const response = await createObjectsP.run(
                req.body.objeto_p,
                req.body.reservacion,
                req.body.valor_p,
                req.query.id_inventario

                );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "PUT"){
        const updateObjectsP = await db.prepare(
            "UPDATE objetos_p SET ('objeto_p','reservacion','valor_p','id_inventario') = (?, ?, ?, ?) WHERE id_objeto_p = ?"
        );
        try{
            const response = await updateObjectsP.run(
                req.body.objeto_p,
                req.body.reservacion,
                req.body.valor_p,
                req.query.id_inventario,
                req.body.id_objeto_p

            );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "DELETE"){
        const deleteObjectsP = await db.prepare(
            "DELETE FROM objetos_p WHERE id_objeto_p = ?"
        );
        try{
            const response = await deleteObjectsP.run(req.body.id_objeto_p);
            await response.finalize(response);
        }catch(error){
            res.json(error,"no data is deleted");
        }
    }else{
        res.json("Method not suported");
    }
}

import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');

export default async function getObjetos(req, res){
    const db = await openDatabase()
    if(req.method === "GET"){

    const ObjectByIdInventorie = await db.all("SELECT * FROM objetos WHERE id_inventario = ?", [req.query.id_inventario])

    res.json(ObjectByIdInventorie)
    }else if(req.method === "POST"){
        const createObjects = await db.prepare(
            "INSERT INTO objetos('objeto','tipo','peso','valor','cantidad','id_inventario') VALUES(?, ?, ?, ?, ?, ?)"
        );
        try{
            const response = await createObjects.run(
                req.body.objeto,
                req.body.tipo,
                req.body.peso,
                req.body.valor,
                req.body.cantidad,
                req.query.id_inventario

                );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "PUT"){
        const updateObjects = await db.prepare(
            "UPDATE objetos SET ('objeto','tipo','peso','valor','cantidad','id_inventario') = (?, ?, ?, ?, ?, ?) WHERE id_objeto = ?"
        );
        try{
            const response = await updateObjects.run(
                req.body.objeto,
                req.body.tipo,
                req.body.peso,
                req.body.valor,
                req.body.cantidad,
                req.query.id_inventario,
                req.body.id_objeto
            );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else if(req.method === "DELETE"){
        const deleteObjects = await db.prepare(
            "DELETE FROM objetos WHERE id_objeto = ?"
        );
        try{
            const response = await deleteObjects.run(req.body.id_objeto);
            await response.finalize(response);
        }catch(error){
            res.json(error,"no data is deleted");
        }
    }else{
        res.json("no data found");
    }
}

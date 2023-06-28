import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');

export default async function getObjetos(req, res){
    const db = await openDatabase()

    if(req.method === "POST"){
        const updateObjects = await db.prepare(
            "UPDATE objetos_p SET objeto_p = ?, reservacion = ?, valor_p = ? WHERE id_objeto_p = ?"
        );
        try{
            const response = await updateObjects.run(
                req.body.objeto_p,
                req.body.reservacion,
                req.body.valor_p,
                req.query.id
            );
            await response.finalize();
        }catch(error){
            res.json(error,"no data is inserted");
        }
    }else{
        res.json("no data found");
    }
}
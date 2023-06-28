import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');

export default async function getObjetos(req, res){
    const db = await openDatabase()

    if(req.method === "POST"){
        const updateObjects = await db.prepare(
            "UPDATE objetos SET objeto = ?, tipo = ?, peso = ?, valor = ?, cantidad = ? WHERE id_objeto = ?"
        );
        try{
            const response = await updateObjects.run(
                req.body.objeto,
                req.body.tipo,
                req.body.peso,
                req.body.valor,
                req.body.cantidad,
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
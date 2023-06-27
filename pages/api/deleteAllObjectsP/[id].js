import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');

export default async function deleteObjetosP(req, res){
    const db = await openDatabase()

    if(req.method === 'DELETE'){
        const deleteObjectsP = await db.prepare(
            "DELETE FROM objetos_p WHERE id_inventario = ?"
        );
        try{
            const response = await deleteObjectsP.run(req.query.id);
            await response.finalize(response);
        }catch(error){
            res.json(error,"no data is deleted");
        }
    }else{
        res.json("no data found");
    }
}


import openDatabase from "@/helpers/sqliteDatabase";
const sqlite3 = require('sqlite3');



export default async function getInventarios(req, res){

    const db = await openDatabase()
    if(req.method === "GET"){

    const allInventories = await db.get("SELECT * FROM inventarios WHERE id_inventario =?",[req.query.id])


    res.json(allInventories)
    }else if (req.method === "DELETE") {
        const deleteInventories = await db.prepare(
          "DELETE FROM inventarios WHERE id_inventario = ?"
        );
        try {
          const response = await deleteInventories.run(req.query.id);
          await response.finalize();
          res.json("Inventory deleted successfully");
        } catch (error) {
          res.json(error);
        }
    }else{
        res.json("no data found");
    }
}

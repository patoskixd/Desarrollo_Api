const sqlite3 = require('sqlite3')

const sqlite = require('sqlite')

async function openDatabase(){
    return sqlite.open({
        filename:"./desarrollodb.db",
        driver: sqlite3.Database,
    })
}

async function setup(){
    const db = await openDatabase();
    await db.migrate({
        migrationsPath: "./database",
        force:"last",

    });
    const inventario = db.all("SELECT * FROM inventarios")
    const objeto = db.all("SELECT * FROM objetos")
    const usuario = db.all("SELECT * FROM usuarios")
    const objeto_p = db.all("SELECT * FROM objetos_p")
    console.log("all inventories", JSON.stringify(inventario,null,2))
    console.log("all objects", JSON.stringify(objeto,null,2))
    console.log("all objects", JSON.stringify(usuario,null,2))
    console.log("all objects", JSON.stringify(objeto_p,null,2))
}

setup();
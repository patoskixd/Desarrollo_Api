const sqlite3 = require('sqlite3')

const sqlite = require('sqlite')

export default async function openDatabase(){
    return sqlite.open({
        filename:"./desarrollodb.db",
        driver: sqlite3.Database,
    })
}
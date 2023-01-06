const sqlite3= require("sqlite3").verbose()
const dbFile="db.sqlite"
// se connnecter ala base 
let db= new sqlite3.Database(dbFile,(err)=>{
    if(err){
        console.error(err.message)
        throw err
    }else{
        console.log("Connexion db réussi ")
       const sql=`CREATE TABLE article(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        author text,
        description text,
        contenue text
       )`
        db.run(sql,(err)=>{
            if(err){
                console.log("Table deja crer")
            }
        })
    }
}
)
module.exports=db;
const express=require('express')
const db=require("./db.js")
const app=express()
const PORT=3000

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get("/",function(req,res,next){
    res.json({message:"api marche bien"})
})
// Liste les contactes

app.get("/api/articles",(req,res)=>{
const sql="SELECT *FROM article"

db.all(sql,(err,rows)=>{
    if(err){
        res.status(400).json({error:err.message})
        return
    }res.json({message:"Liste des articles",data:rows})
    
})
})

// Liste les contactes par id

app.get("/api/articles/:id",(req,res)=>{
    const {id:articleID}=req.params
    const sql="SELECT *FROM article WHERE id=?"
    const params=[articleID]
    db.get(sql,params,(err,row)=>{
        if(err){
            res.status(400).json({error:err.message})
            return
    }res.json({message:`Afficher l article ${articleID} `,data:row})
        
    }) 
    })
//creer un nouveau article
app.post("/api/articles",(req,res)=>{
   const {title,author,description,contenue}=req.body

   if(!title || !author || !description || !contenue){
    res.status(400).json({error:"Merci de remplir tous les champs"})
    return
   }

   const article={title,author,description,contenue}
   const sql ='INSERT INTO article(title,author,description,contenue) VALUES (?,?,?,?)'
   const params=[article.title,article.author,article.description,article.contenue]
   db.run(sql,params,function(err,reslut){  
    if(err){
        res.status(400).json({error:err.message})
        return
    }
    res.status(201).json({massage:"Article creer avec succes",data:article})
   })
    
})


//update conctat
app.put("/api/articles/:id",(req,res)=>{
   const {id:articleID}=req.params
    const {title,author,description,contenue}=req.body
 
    if(!title || !author || !description || !contenue){
     res.status(400).json({error:"Merci de remplir tous les champs"})
     return
    }
 
    const article={title,author,description,contenue}
    const sql ='UPDATE article  SET title=?,author=?,description=?,contenue=? WHERE id=?'
    const params=[article.title,article.author,article.description,article.contenue,articleID]
    db.run(sql,params,function(err,reslut){
     if(err){
         res.status(400).json({error:err.message})
         return
     }
     res.status(201).json({massage:"Article ${articleID} modifié avec succes",data:article})
    })
     
 })
//delete article
app.delete("/api/articles/:id",(req,res)=>{
    const {id:articleID}=req.params
    const sql="DELETE FROM article WHERE id=?"
    db.run(sql,articleID,function(err,resultat){
        if(err){
            res.status(400).json({error:err.message})
            return
        }
        res.json({message:`article  ${articleID} supprimé `,data :this.changes})
    })
})
// demarrer le serveur
app.listen(PORT,function(){
    console.log(`L'application est demmarrer au port:${PORT}`)
})
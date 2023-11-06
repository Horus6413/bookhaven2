const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { stringify } = require("nodemon/lib/utils");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookhaven',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});



const usuario = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String},
    });

const produtolivraria = new mongoose.Schema({
    id_produtolivraria : {type : String, required : true},
    Descrição : { type : String},
    Editora : { type : String},
    Dataimpressão : {type : Date}, 
    Quantidadeestoque : { type : Number}
    });

    const Pessoa = mongoose.model("Pessoa", usuario);

    

    app.post("/cadastropessoa", async(req, res)=>{
        const email = req.body.email;
        const senha = req.body.endereco;
    
    
        const pessoa = new Pessoa({
            email : email,
            senha : senha,
        })
    
    
        try{
            const newPessoa = await pessoa.save();
            res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
        } catch(error){
            res.status(400).json({error});
        }
    
    
    });
    
    
    app.get("/", async(req, res)=>{
        res.sendFile(__dirname +"/index.html");
    })



    app.listen(port, ()=>{
        console.log(`Servidor rodando na porta ${port}`);
    })
    
      
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require("body-parser")
    const app = express();
    const admin = require("./routes/admin")
    const mongoose = require("mongoose")
//Configurações
    //Body Parser
        app.use(express.json());
        app.use(express.urlencoded({extended:true}))
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
    mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/blogapp").then(() => {
            console.log("Conectado ao mongo");
        }).catch((err) => {
            console.log("Erro ao se conectar: " + err);
        })
    // Public
    var path = require('path');
    app.use(express.static(path.join(__dirname, 'public')));
    // Middleware
        app.use((req, res, next ) => {
            //code here
            next();//Dar continuidade as requisições, sem o next ira ficar travado no middleware.
        })
//Rotas
    app.get('/', (req, res) => {
        console.log('Pagina inicial');
    })

    app.get('/posts', (req, res) => {
        console.log('Lista de posts');
    })

    app.use('/admin', admin);
//Outros
const PORT = 8081
app.listen(PORT,() => {
    console.log("Servidor rodando!")
})
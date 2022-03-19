    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require("body-parser")
    const app = express();
    const admin = require("./routes/admin")
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")
//Configurações
    // Sessão
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // Middleware
        app.use((req, res, next ) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();//Dar continuidade as requisições, sem o next ira ficar travado no middleware.
        })
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
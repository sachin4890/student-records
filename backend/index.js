let express= require('express'),
path =require('path'),
mongoose= require('mongoose'),
cors = require('cors'),
bodyParser= require('body-parser'),
mongoDb= require('./database/db')
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Database connected successfully')
},
error=>{
    console.log('Database error:'+error)
}
)

//  PORT AND SERVER

const bookRoute= require("./node-backend/routes/book.routes");
const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors({
    origin:"*",
}));

app.use(express.static(path.join(__dirname,'dist/Bookstore')));
// App route
app.use('/api',bookRoute);
// port create
const port = process.env.port || 8000;
app.listen(port,()=> {
    console.log('Listening port on:' +port);
}

)

// 404 error handler

// app.use((req,res,next)=>{
//     next(createError(404))
// })

// base route
app.get('/',(req,res)=>{
    res.send('invalid endpoint')
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'))
})

// app.use(function(err,req,res,next){
//     console.log(err.message)
//     if(!err.statusCode) err.statusCode=500;
//     res.status(err,statusCode).send(err.message);
// })
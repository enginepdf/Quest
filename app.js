const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression=require('compression');
const helmet=require('helmet');

const app=express();
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5000', '*'],
    methods: ['GET'],
    credentials: true
  })
);

app.use('/process', check(app));

app.listen(3000, function(){
        console.log('port 3000 connected');
});

function check(app){
        router.get('/check', function(req, res){
                res.status(200).json('this is /process/check');
        });
        app.get('/check1', function(req, res){
                res.status(200).json('this is /check1');
        });
        return router;
}


module.exports=app;
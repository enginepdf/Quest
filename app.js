const express=require('express');
const router=express.Router();

const app=express();

app.use('/process', check(app));

app.listen(3000, function(){
        console.log('port 3000 connected');
});

function check(app){
        router.get('/check', function(req, res){
                res.send('this is /process/check');
        });
        app.get('/check1', function(req, res){
                res.send('this is /check1');
        });
        return router;
}
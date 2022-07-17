import express, { Application, Request, Response } from 'express';
const app:Application = express();

app.get('/verify/stream',(req:Request,res:Response) =>{
    res.send('hello jameel');
})

app.post('/register/stream',(req:Request,res:Response)=>{
    res.send('registered')
})

export default app;




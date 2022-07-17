import express, { Application, Request, Response } from 'express';
const app:Application = express();

app.get('/verifyStream',(req:Request,res:Response) =>{
    res.send('hello jameel');
})

export default app;




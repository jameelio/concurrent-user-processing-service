import express, { Application, NextFunction, Request, Response } from 'express';
import concurrency from './services/concurrency';
const requestIp = require('request-ip');
const app:Application = express();

app.use(express.json());
app.use(requestIp.mw())

app.get('/verify/stream',async (req:Request,res:Response) => {
  
    const streamer = req.query.user as string;
    const deviceID = req.query.deviceId as string;
    
    let concurrentUser;
    try {
        concurrentUser = await concurrency.verifyActiveStream(streamer,deviceID);
    } catch (error:any) {
        if(error.status){
            return  res.status(error.status).send(error)
          }  
          return res.status(500).send('internal server error')
    }    
    return res.status(200).send(concurrentUser);
});

app.post('/register/stream',async (req:Request,res:Response) => {
    const streamer = req.body.user;
    let registration;
    try {
       registration = await concurrency.registerStream(streamer);

    } catch (error:any) {
        if(error.status){
            return  res.status(error.status).send(error)
          }
  
          res.status(500).send('internal server error')
    }
    res.status(201).send(registration)
});

app.get('/deregister/stream',async() => {
    try {
        
    } catch (error) {
        
    }
})

export default app;



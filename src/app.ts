import express, { Application, Request, Response } from 'express';
import utils from './utils';

const app:Application = express();

app.use(express.json());

app.get('/verify/stream',(req:Request,res:Response) => {
    const db = [
        {
          "user" : "jameel",
          "device_count": 3 ,
          "active_devices": ['1234']
        }
      ];  
      const streamer = req.query.user as string;
      const deviceID = req.query.deviceId as string;
    
      const { active_devices,device_count } = utils.getRegisteredUser(streamer,db)

      const isValidStreamer = utils.isValidateStreamID(deviceID,active_devices);
      if(!isValidStreamer) return res.status(401).send('invalid streaming device');

      const hasMaxDeviceCountReached = utils.maxStreamVerification(active_devices,device_count);
      if(hasMaxDeviceCountReached)return res.status(429).send('maximum devices connected');

    return res.status(200).send('1');
})

app.post('/register/stream',(req:Request,res:Response) => {
    const db:any = [
        { user: 'adam', device_count: 3, active_devices: [] }
    ];
    
    const user = req.body.user;

    let isRegistered = utils.getRegisteredUser(user, db);

    if(!isRegistered)isRegistered = utils.aboutToStream(user,[])

    const hasMaxDeviceCountReached = utils.maxStreamVerification(isRegistered.active_devices,isRegistered.device_count);

    if(hasMaxDeviceCountReached){
        return res.status(429).send('maximum devices registered'); 
    }
    
    const deviceId = utils.generateUnqiueDeviceId();
    const addDevice = utils.addDevice(deviceId,isRegistered.active_devices)

    isRegistered.active_devices = addDevice;

    res.status(201).send(
        addDevice[0]
    )
})

export default app;




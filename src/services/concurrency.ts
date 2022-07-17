import utils from "../utils/utils";
import db from '../database';
import logger from "../logger";
import * as R from 'ramda'

const verifyActiveStream = (streamerName:string ,deviceID:string) => {
    return new Promise(async (resolve,reject) => {
       try {
        const user:any = await db.findUserStream(streamerName);
        if(!user){
            logger.warn(
                `cannot verify user that does not exist: user => ${user}`);
            return reject({
                status : 404,
                message : 'cannot verify user that does not exist'
            })
        }
        const active_devices = user.active_devices;

        const isValidStreamer = utils.isValidateStreamID(deviceID,active_devices);
        if(!isValidStreamer) {
            logger.warn(
                `invalid streaming device: deviceID => ${deviceID}`);
            return reject({
                status : 401,
                message : 'invalid streaming device'
            })
        }

        logger.info(`Successfully verified streamer`);

        return resolve('active')

       } catch (error) {
        logger.error(JSON.stringify(error))
        return reject(error)
       }
    })
}

const registerStream = (streamerName:string) => {
    return new Promise(async (resolve,reject)=>{
        try {

        let isRegistered:any = await db.findUserStream(streamerName);

        if(!isRegistered){
            isRegistered = utils.aboutToStream(streamerName,[])[0]
            await db.insertUserStream(isRegistered);
        }

        const hasMaxDeviceCountReached = utils.maxStreamVerification(isRegistered.active_devices,isRegistered.device_count);
        if(hasMaxDeviceCountReached){

            logger.warn(
                `maximum devices connected: max => ${hasMaxDeviceCountReached}`);
            return reject({
                status : 429,
                message: 'maximum devices connected'
            })
        }

        const deviceId = utils.generateUnqiueDeviceId();
        const addDevice = utils.addDevice(deviceId,isRegistered.active_devices);
        isRegistered.active_devices = addDevice;

        await db.updateUserStream(isRegistered.user,isRegistered.active_devices);
        logger.info(`Successfully registered streamer`);
        
        return resolve(deviceId)

        } catch (error) {
            logger.error(JSON.stringify(error))
           reject(error) 
        }
    })
}

const releaseActiveStreamer = (streamerName:string, deviceId:string) => {
    return new Promise(async (resolve,reject) => {

       try {
        let isRegistered:any = await db.findUserStream(streamerName);

        if(!isRegistered){
            logger.warn(`user not found : user => ${streamerName}`)
            return reject({
                status : 404,
                message: 'user not found'
            }) 
        }

        const isValidStreamer = utils.isValidateStreamID(deviceId,isRegistered.active_devices);
        if(!isValidStreamer) {
            logger.warn(
                `invalid streaming device: deviceID => ${deviceId}`);
            return reject({
                status : 401,
                message : 'invalid streaming device, cannot deregister'
            })
        }

        isRegistered.active_devices = R.filter(o => o !== deviceId, isRegistered.active_devices);
        
        await db.updateUserStream(isRegistered.user,isRegistered.active_devices);
        logger.info(`Succesful deregister : device => ${deviceId}`);
        
        return resolve('deleted')
       } catch (error) {
        logger.error(JSON.stringify(error))
        reject(error) 
       }
    })
}

export = {
    verifyActiveStream,
    registerStream,
    releaseActiveStreamer
}
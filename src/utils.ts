import * as R from 'ramda'
import { v4 as uuidv4 } from 'uuid';

const default_settings = { device_count: process.env.MAX_DEVICES || 3 , active_devices : [] };

const getRegisteredUser = (user:string, db:any):{
    user: string,
    active_devices: [],
    device_count: number
} => R.filter(R.propEq('user', user))(db)[0]

const aboutToStream = (user: string, db:any):any => R.append({ user: user , ...default_settings }, db) 

const generateUnqiueDeviceId = (): string => uuidv4();
const addDevice = (deviceID:string, activeDevices:[]): any => R.append(deviceID, activeDevices)
const isValidateStreamID = (streamId:string, db:any): boolean => R.indexOf(streamId,db) == -1 ? false : true;
const maxStreamVerification = (activeDevices:string[] ,deviceCount:number): boolean => R.length(activeDevices) == deviceCount ? true : false;

export = {
    getRegisteredUser,
    aboutToStream,
    generateUnqiueDeviceId,
    addDevice,
    isValidateStreamID,
    maxStreamVerification
}



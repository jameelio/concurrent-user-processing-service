import utils from './utils';
import { expect } from 'chai';


describe('Register User Stream',() => {
    it('should register new user',() => {
        const db:any = [];
        const added_user = utils.aboutToStream('steve', db);  
        expect(added_user[0]).to.have.all.keys(['user','active_devices','device_count']);
    });

    it('should return existing user',() => {
      const db = [
        {
          "user" : "dave",
          "device_count": 3 ,
          "active_devices": []
        }
      ];            
      const userObject = utils.getRegisteredUser('dave', db);
      expect(userObject).to.contain({ user: 'dave'});
    });
    
    it('should register new device', () => {
    const db = [
      {
        "user" : "lucas",
        "device_count": 3 ,
        "active_devices": ['124124']
      },
      {
        "user" : "dave",
        "device_count": 3 ,
        "active_devices": []
      }
    ]; 
    const device_Id = utils.generateUnqiueDeviceId();
    const user :any = utils.getRegisteredUser('lucas', db);
    user.active_devices = utils.addDevice(device_Id,user.active_devices);
    expect(user.active_devices).to.contain(device_Id);
    });
})

describe('Verify User Stream',() => {
  it('should return true when stream id is valid',() => {

    const db = [
      {
        "user" : "lucas",
        "device_count": 3 ,
        "active_devices": ['1234']
      },
      {
        "user" : "dave",
        "device_count": 3 ,
        "active_devices": []
      }
    ]; 

    const streamID = '1234';
    const user = 'lucas';

    const {active_devices} = utils.getRegisteredUser(user, db)
    const results = utils.isValidateStreamID(streamID, active_devices)

    expect(results).to.true
  });
  it('should reject new stream when verified device limit exceed',() => {
    const db = [
      {
        "user" : "lucas",
        "device_count": 3 ,
        "active_devices": ['1234','4321','4444']
      },
      {
        "user" : "dave",
        "device_count": 3 ,
        "active_devices": []
      }
    ];

    const { device_count, active_devices } = utils.getRegisteredUser('lucas', db);
    const hasMaxDeviceCountReached = utils.maxStreamVerification(active_devices,device_count);

    const expected = true;
    expect(hasMaxDeviceCountReached).to.eql(expected);
  });

  // it('should allow de-registration of device stream',() => {})

})
import { expect } from 'chai';
import request from 'supertest'
import app from '../app';

const server = request(app);

describe("App",()=>{

    it('register new user to return deviceId',(done) => {
        server
        .post('/register/stream?&user=jameel')
        .expect(201)
        .send({user: 'john'})
        .set('Accept', 'application/json')
        .end((err,res:any)=>{
            if(err){
                return done(err)
            }
            expect(res.text).to.exist;
            done();
        })
    })

    // it("return 401 unauthorised when invalid stream id is passed",(done)=>{
    //     server
    //     .get('/verify/stream?&user=jameel&deviceId=12345')
    //     .expect(401)
    //     .end((err,res:any)=>{
    //         if(err){
    //             return done(err)
    //         }
    //         expect(res.text).to.be.equal('invalid streaming device')
    //         done();
    //     })
    // })

    // it("return 200 when valid stream id is passed",(done)=>{
    //     server
    //     .get('/verify/stream?&user=jameel&deviceId=1234')
    //     .expect(200)
    //     .end((err,res:any)=>{
    //         if(err){
    //             return done(err)
    //         }
    //         expect(res.text).to.be.equal('1');
    //         done();
    //     })
    // })
})


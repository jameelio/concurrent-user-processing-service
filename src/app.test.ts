import { expect } from 'chai';
import request from 'supertest'
import app from './app';

const server = request(app);

describe("App",()=>{
    it("responds with Hello world",(done)=>{
        server
        .get('/verify/stream')
        .expect(200)
        .end((err,res:any)=>{
            if(err){
                return done(err)
            }
            expect(res.text).to.be.equal('hello jameel')
            done();
        })
    })
})


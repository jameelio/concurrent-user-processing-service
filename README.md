# Concurrent User Processing Service

Manage conccurrent connections for user/s, setting a max limitation kept and stored in a database

## Description

This is a micro-service which will fit as part of a building block too managing content for concurrent user connections, as mvp1 too test
scalability a uuid is generated for everything registration being made by a user and this registration can be in the form of
a request too access to a particular content, once the user has completed view the content, the uuid can be deregistered. During the viewing process, view can validate the uuid, anytime too ensure that concurrent user count has not been exceeded.

## Getting Started

### Dependencies

* NodeJS
* MongoDb
* NPM

### Installing

* git clone https://github.com/jameelio/concurrent-user-processing-service.git 
* npm install
* create .env file follow .example.env

### Executing program

* How to run the program

* For test cases
```
npm run test
```
* For dev execution
```
npm run dev
```

* For docker
```
docker build -t meelio/concurrent-user-processor .
```
```
docker run -p 49160:3000 -d meelio/concurrent-user-processor
```


## API 

 **URL VERIFY USER**

    /verify/stream

* **Method:**

  `GET`
  
*  **URL Params**
```
  /verify/stream?&user={user}&deviceId={deviceID}
```

 **URL REGISTER STREAM**

    /register/stream

* **Method:**

  `POST`
  
*  **BODY**

```
 {
	"user": "jameel"
 }
```


 **URL DEREGISTER STREAM**

    /deregister/stream

* **Method:**

  `POST`
  
*  **BODY**

```
{
	"user":"jameel",
	"deviceId":"d7303b0e-4bc8-4ccd-8899-fdae443e2421"
}
```


## Authors
Jameel 

## Version History

* 0.1
    * Initial Release

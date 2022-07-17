import app from "./app";

const port = process.env.NODE_PORT || 3000;

app.listen(port , () => {
    return console.log(`Express Listening: http://localhost:${port}`)
})
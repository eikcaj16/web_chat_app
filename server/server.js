import app from './api/app.js'

const port = 7777;

app.listen(port, () => {
    console.log(`server running at ${port}`);
});
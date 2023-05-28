const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Received request for URL: ' + req.url);
    res.render('index', { title: 'Home Page' });
});

const userRouter = require('./routes/users')

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
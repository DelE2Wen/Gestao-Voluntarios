const express = require('express');
const cors = require('cors');

const app = express();

//Routes Const
const UserRoutes = require('./routes/UserRoutes');

//Config JSON response
app.use(express.json());

//Solve CORS
app.use(cors( { credentials: true, origin: "http://localhost:3000" } ));

//Public Folder
app.use(express.static('public'));

//Routes
app.use('/users', UserRoutes)


app.listen(5000);
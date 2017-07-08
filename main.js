//open http://localhost:8877/index.html
//open http://127.0.0.1:8877/image.png

const express = require('express');
const app = express();
const fs = require("fs");

const bodyParser = require('body-parser');
const multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: './tmp'}).any());

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.post('/file_upload', function (req, res) {
  console.log(req.files);
  let response = {
    message: 'Files uploaded successfully!',
    filenames: []
  };
  for (let file of req.files) {
    const filePath = __dirname + "/uploaded_files/" + file.originalname;
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(filePath, data);
    response.filenames.push(file.originalname);
  }
  console.log(response);
  res.end(JSON.stringify(response));
});

const server = app.listen(8877, function () {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log("Example app listening at http://%s:%s", host, port);
});
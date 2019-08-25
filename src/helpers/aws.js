var AWS = require('aws-sdk');
var mime = require('mimetypes-js');

let Controller = function () {
  this.uploadImage = uploadImage;
  this.uploadFile = uploadFile;
  this.upload = upload;
};

let upload = (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.sendStatus(200);
};

//UPLOADS IMAGE TO S3
//FILE NAME = TIMESTAMP + BELONGS TO (ORG, ACCT, ...) + ID
//FILE NAME EXAMPLE = 87656787ACCT1
let uploadImage = (req, res) => {
  console.log("upload image")
  try{
    console.log(req.files);
    console.log(req.file);
    AWS.config.loadFromPath(__dirname + '/awsConfig.json');
    // Create S3 service object
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: 'qa-bucket'}
    });

    var file = req.files.file;
    var file_name = Date.now() + '_IMG'
    try {
      file_name = mime.addExt(Date.now() + '_IMG', file.mimetype);
    } catch (e) {
      console.log(file.mimetype);
      console.log('MIMETYPE error:', e);
    }

    var params = {
      Key: file_name,
      ContentType: file.mimetype,
      Body: file.data,
      ACL: 'public-read'
    };

    console.log("before updload")
    s3.upload(params, function (err, data) {
      console.log(data);
      if (err) {
        console.log(err);
        res.json({error: 'Ocurrió un error subiendo el archivo.'});
      } else {
        console.log(data.Location);
        res.json({url:data.Location, name: file_name});
      }
    });
  } catch (e) {
    console.log('Error uploading image:');
    console.log(e);
    res.json({error:'Ocurrió un error subiendo la iamgen.'});
  }
};

let uploadFile = (req, res) => {
  try{
    console.log(req.files);
    var file = req.files.file;
    console.log("UPLOAD FILE");
    AWS.config.loadFromPath(__dirname + '/awsConfig.json');

    // Create S3 service object
    console.log(req.body);
    console.log(process.env[req.body.bucket]);
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: req.body.bucket ? process.env[req.body.bucket] : process.env.BUCKET}
    });

    var file_name = file.file_name
    try {
      file_name = mime.addExt(file)
    } catch (e) {
      console.log(file.mimetype);
      console.log('MIMETYPE error:', e);
    }
    var params = {
      Key: file_name,
      ContentType: file.mimetype,
      Body: file.data,
      ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        res.json({error: 'Ocurrió un error subiendo el archivo.'});
      } else {
        res.json({url:data.Location, name: file_name});
      }
    });
  } catch (e) {
    console.log('Error uploading file:');
    console.log(e);
    res.json({error:'Ocurrió un error subiendo el archivo.'});
  }
};

exports.Controller = new Controller();

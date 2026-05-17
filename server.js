const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/uploads', express.static('uploads'));


// STORAGE CONFIG

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, 'uploads');

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + '-' + file.originalname
    );

  }

});


const upload = multer({ storage });


// ROUTE TEST

app.get('/', (req, res) => {

  res.send('Backend Running');

});


// ROUTE UPLOAD

app.post(
  '/upload',
  upload.single('file'),
  (req, res) => {

    const fileUrl =
      `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.json({

      success: true,

      fileUrl

    });

  }
);


// SERVER

app.listen(3000, () => {

  console.log('Server Running Port 3000');

});



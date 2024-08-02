import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import defaultData from './defaultData.js';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const PORT = 8000;
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',Router)

const USERNAME = process.env.DB_USERNAME;
const PASSWORD =   process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

defaultData();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

export { upload };


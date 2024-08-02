import express from 'express';
import { userSignup, userLogIn, expertLogIn, addQuestion, getQuestion, addAnswer, getAnswer , addProblem , getProblem, addProblemAnswer, getSolution} from '../controller/user-controller.js';

const router = express.Router();
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export { upload };

router.post('/signup', userSignup);
router.post('/login', userLogIn);
router.post('/expertLogin', expertLogIn);
router.post('/add-question', addQuestion); // Endpoint for adding a question
router.get('/questions', getQuestion); // Endpoint for getting questions
router.post('/answer', addAnswer); // Endpoint for adding an answer
router.get('/answers', getAnswer); // Endpoint for getting answers
router.post('/problems', upload.single('img'), addProblem);
router.get('/problems', getProblem);
router.post('/answer-problem', addProblemAnswer);
router.get('/solutions', getSolution);

export default router;

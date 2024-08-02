
import { questions } from './constants/data.js';
import Question from './model/question-schema.js';


const defaultData = async () => {
  try {
    await Question.insertMany(questions);

    console.log(`Data inserted successfully`);

  } catch(error) {
      console.log(`error while inserting default data`,error.message);
  }




}
export default defaultData;
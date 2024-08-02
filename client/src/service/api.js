import axios from 'axios';



const URL = 'http://localhost:8000';
export const authenticateSignup = async (data) => {
    try {
       return await axios.post(`${URL}/signup`, data);
    } catch(error) {
        console.log(`error while calling signup api`, error)
    }
}

export const authenticateLogin = async (data) => {
    try {
       return await axios.post(`${URL}/login`, data);
    } catch(error) {
        console.log(`error while calling login api`, error)
        return error.response;
    }
}

export const authenticateExpertLogin = async (data) => {
    try {
       return await axios.post(`${URL}/expertlogin`, data);
    } catch(error) {
        console.log(`error while calling expert login api`, error)
        return error.response;
    }
}

export const authenticateQuestion = async (data) => {
    try {
       return await axios.post(`${URL}/add-question`, data);
    } catch(error) {
        console.log(`error while calling add-question api`, error)
        return error.response;
    }
}

export const authenticateGetQuestion = async () => {
    try {
       return await axios.get(`${URL}/questions`);
    } catch(error) {
        console.log(`error while calling get-question api`, error)
        return error.response;
    }
}

export const authenticateAddAnswer = async (data) => {
    try {
       const response = await axios.post(`${URL}/answer`, data);
       return response.data; // Return the response data
    } catch(error) {
        console.error('Error while calling answer question API:', error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

export const authenticateGetAnswer = async () => {
    try {
        return await axios.get(`${URL}/answers`);
    } catch (error) {
        console.log(`Error while calling get-answer API`, error);
        return error.response;
    }
};

export const authenticateProblem = async (data) => {
    try {
        if (!data.get('problem')) {
            throw new Error('Problem description is required while making api call');
        }
        return await axios.post(`${URL}/problems`, data);
    } catch (error) {
        console.log(`Error while calling add-problem api:`, error);
        return error.response;
    }
}

export const authenticateGetProblem = async () => {
    try {
       return await axios.get(`${URL}/problems`);
    } catch(error) {
        console.log(`error while calling get-problem api`, error)
        return error.response;
    }
}

export const authenticateAddProblemAnswer = async (data) => {
    try {
       const response = await axios.post(`${URL}/answer-problem`, data);
       return response.data; // Return the response data
    } catch(error) {
        console.error('Error while calling answer problem API:', error);
        throw error; // Re-throw the error for handling in the calling function
    }
}


export const authenticateGetSolution = async (email) => {
    try {
        const response = await axios.get(`${URL}/solutions`, {
            params: { email }
        });
        return response.data;  // Assuming the API returns data directly
    } catch(error) {
        console.error('Error while calling get-solution API:', error);
        throw error;  // Re-throw the error to handle it in the component
    }
};
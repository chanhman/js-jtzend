import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getYoungMoney = async function() {
  try {
    const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

    if (!response.statusText === 'OK') {
      throw new Error();
    }

    const data = response.data;
    console.table(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const postYoungMoney = async function() {
  try {
    const todoItem = {
      userId: 1,
      id: 1,
      title: 'Yup yup yup yup yup',
      completed: false
    };

    const response = await axios.post(`${BASE_URL}/todos`, todoItem);

    if (!response.statusText === 'OK') {
      throw new Error();
    }

    const newTodoItem = response.data;
    console.table(`Added a new Todo!`, newTodoItem);
  } catch {
    console.error('Error:', error.message);
  }
};

getYoungMoney();
postYoungMoney();

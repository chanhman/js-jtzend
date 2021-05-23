// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getYoungMoney = async function() {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);

    if (!response.statusText === 'OK') {
      throw new Error();
    }

    const data = response.data;
    console.table(data);
    console.log('lodash test', _.head(data, 1));
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
    console.log(`Added a new Todo!`, newTodoItem);
  } catch {
    console.error('Error:', error.message);
  }
};

getYoungMoney();
// postYoungMoney();

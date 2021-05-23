// https://candidate.hubteam.com/what-is-the-hubspot-coding-assessment
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
// https://flaviocopes.com/axios-send-authorization-header/
// https://www.digitalocean.com/community/tutorials/js-axios-vanilla-js

import axios from 'axios';
import _ from 'lodash';

// const BASE_URL = 'https://jsonplaceholder.typicode.com';
const BASE_URL = 'http://localhost:3000';

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
      id: 201,
      title: 'Yup yup yup yup yup',
      completed: false
    };

    const response = await axios.post(`${BASE_URL}/todos`, todoItem);

    if (!response.statusText === 'OK') {
      throw new Error();
    }

    const newTodoItem = response.data;
    console.log(`Added a new Todo!`, newTodoItem);
  } catch(error) {
    console.error('Error:', error.message);
  }
};

getYoungMoney();
postYoungMoney();

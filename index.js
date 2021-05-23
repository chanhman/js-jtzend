import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

const getYoungMoney = async function() {
  try {
    const response = await axios.get(`${BASE_URL}`);

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
    // Example
    // const newObject = {
    //   userId: 1,
    //   id: 201,
    //   title: 'Yup yup yup yup yup',
    //   completed: false
    // };

    const newObject = {};

    const response = await axios.post(`${BASE_URL}`, newObject);

    if (!response.statusText === 'OK') {
      throw new Error();
    }

    const addedObjected = response.data;
    console.log(`Posted:`, addedObjected);
  } catch(error) {
    console.error('Error:', error.message);
  }
};

getYoungMoney();
postYoungMoney();

import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';

const youngMoney = async function() {
  try {
    const response = await axios.get(BASE_URL);

    if (!response.statusText === 'OK') {
      throw new Error();
    }
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log('Error:', error.message);
  }
};

youngMoney();

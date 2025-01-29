const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { 
    title: 'Fake Store API',
    description: 'Fake Store API'
  },
   definitions: {
    Customer: {
      name: 'Jhon Doe',
      age: 29,
      username: 'johndoe@example.com',
      email: 'johndoe@example.com',
      address: {
        street: '304 York Street',
        city: 'New York',
        zip: '12345'
      },
      phone: '55566677799900',
      occupation: 'Front End Developer'
      },
      CreateCustomer: {
        $name: 'Jhon Doe',
        $age: 29,
        $username: 'johndoe@example.com',
        $email: 'johndoe@example.com',
        $address: {
          $street: '304 York Street',
          $city: 'New York',
          $zip: '12345'
        },
        $phone: '55566677799900',
        $occupation: 'Front End Developer'
      }
    },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
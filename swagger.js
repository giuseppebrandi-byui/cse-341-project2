const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { 
    title: 'Fake Store API',
    description: 'Fake Store API'
  },
  definitions: {
    Customer: {
      name: 'John Doe',
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
      $name: 'John Doe',
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
    },
    UpdateCustomer: {
      $name: 'John Doe',
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
    },
    Product: {
      title: 'Product Name',
      price: '10.55',
      description: 'Product Description',
      category: 'Specify a category',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: '5'
    },
    CreateProduct: {
      $title: 'Product Name',
      $price: '10.55',
      $description: 'Product Description',
      $category: 'Specify a category',
      $image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      $rating: '5'
    },
    UpdateProduct: {
      $title: 'Product Name',
      $price: '10.55',
      $description: 'Product Description',
      $category: 'Specify a category',
      $image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      $rating: '5'
    }
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
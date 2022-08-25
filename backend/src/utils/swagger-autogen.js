const swaggerAutogen = require('swagger-autogen')();

const outputFile = './private/swagger_output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles);
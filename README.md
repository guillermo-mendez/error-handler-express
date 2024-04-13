# error-handler-express-js

This is a simple error handler for Node.js with express.js

## Installation

```bash
npm install --save error-handler-express-js
````

## Usage

```javascript
const express = require('express');
const { errorHandlerMiddleware, catchAsync } = require('error-handler-express-js');

const app = express();

// Define your routes here...

router.get('/ruta-async', catchAsync(async (req, res) => {
  throw new Error('Simulated error in asynchronous controller');
}));

// Error Trapping Middleware Logging
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
````

## another way to use it modular with controllers and services

```javascript
// App.ts

const express = require('express');
const { errorHandlerMiddleware } = require('error-handler-express-js');

const app = express();

// Define your routes here...
app.use('/api/user', userRoutes);

// Error Trapping Middleware Logging
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
````

```javascript
// routes/userRoutes.ts

const router = require('express').Router();
const { catchAsync } = require('error-handler-express-js');
const { userController } = require('../controllers/userController');


router.post('/create', catchAsync(userController.createUser));

module.exports = router;
````

```javascript
// controllers/userController.ts

const { userServices } = require('../services/userServices');

const UserController = {

  async createUser(req, res, next) {
      const result = await userServices.createUser(req.body);
      res.json(result);
    }
}

module.exports = UserController;
````

```javascript
// services/userServices.ts

const { errorHandler,sendSuccessResponse } = require('error-handler-express-js');

const UserServices = {

async createUser(data) {
    try {

      const response = await userRepository.getUserBycode(data.code); // Data base operation
      if(response) {
        throw new errorHandler().conflict('There is already a user with this code').build();
      }

      await userRepository.createUser(data); // Data base operation

      return sendSuccessResponse('Data saved successfully');

    } catch (err: any) {
      throw new errorHandler().error(err, 'message').method('createUser').debug(data).build();
    }
  }
}

module.exports = UserServices;
````

## log

  ```
  // Error Trapping Middleware Logging Example
Error:  {
  statusCode: 409,
  params: {
    code: '12345678',
    name: 'user',
  },
  method: 'createUser',
  message: 'There is already a user with this code'
}
Error   
    at UserServices.<anonymous> (/[service-route]/services/User-services.ts:38:63)
    at Generator.next (<anonymous>)
    at fulfilled (/[service-route]/services/User-services.ts:5:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
 Error: {
  "statusCode": 409,
  "message": "There is already a user with this code"
}
```
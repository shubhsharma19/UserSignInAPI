# Express JWT Authentication API

This is an Express API that provides **JWT-based authentication**. It includes user login and user listing routes.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Update the `jwtPass` variable in `index.js` with your desired secret key.

## Validation
- Input validation is implemented using the `zod` library.
- The `validateUserInput` middleware ensures proper validation of the login input.

## Customization
Feel free to customize the code according to your requirements. You may replace the dummy data with your own user data and make any necessary adjustments to the schema and validation logic.

## Error Handling
A global error handler is in place to catch any internal server errors and respond with a 500 status.

## Running the Server
Execute `npm start` to run the server on port 3000.


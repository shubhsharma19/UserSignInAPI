# Express JWT Authentication API

This is an Express API that provides **JWT-based authentication**. It includes user login and user listing routes.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Update the `jwtPass` variable in `index.js` with your desired secret key.

## Usage

### Endpoints

1. **POST /login**
   - Authenticates the user and provides a JWT token upon successful login.
   - Requires a JSON body with a `username` and `password`.
   - Example:
     ```json
     {
       "username": "exampleuser",
       "password": "securepassword"
     }
     ```

2. **GET /users**
   - Retrieves a list of users (excluding the current user) with a valid JWT token.
   - Requires a valid JWT token in the `Authorization` header.
   
### Validation

- Input validation is implemented using the `zod` library.
- The `validateUserInput` middleware ensures proper validation of the login input.

## Future feature addition
I will introduce mongodb connection into this api to let the user login and signup and save that data into db.

## Customization

Feel free to customize the code according to your requirements. You may replace the dummy data with your own user data and make any necessary adjustments to the schema and validation logic.

## Error Handling

A global error handler is in place to catch any internal server errors and respond with a 500 status.

## Running the Server

Execute `npm start` to run the server on port 3000.


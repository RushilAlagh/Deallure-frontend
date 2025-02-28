const docClient = require("../config/dynamoConfig");
const bcrypt = require("bcrypt");
const TABLE_NAME = "User_Products"; 

const signupUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
  
    try {
      // Check if the user already exists
      const checkUser = await docClient
        .get({ TableName: TABLE_NAME, Key: { userEmail: email, productId: "USER" } })
        .promise();
  
      if (checkUser.Item) {
        const error = new Error("Email already registered");
        error.statusCode = 400;
        throw error;
      }
  
      // Hash the password before storing
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Store user details with hashed password
      const newUser = {
        userEmail: email,
        productId: "USER",
        name,
        password: hashedPassword, // Store hashed password instead of raw password
      };
  
      await docClient.put({ TableName: TABLE_NAME, Item: newUser }).promise();
      return { message: "User registered successfully" };
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };
  
  

module.exports = { signupUser };
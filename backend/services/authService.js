
import bcrypt from "bcryptjs";
import User from "../models/User.js";

/**
 * Create a new user (Admin or Normal)
 * @param {Object} data - { name, email, password, role }
 * @returns {Promise<Object>} - Created user
 */
export const registerUser = async (data) => {
  const { name, email, password, role } = data;


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 0, 
  });

  return user;
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

import { registerUser, loginUser } from "../services/authService.js";
import { loginUserValidation, registerUserValidation } from "../validations/userValidation.js";
export const createAdminController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const isValidated = await registerUserValidation(req.body);

    if (!isValidated.status) {
      return res.status(400).json({
        status: false,
        message: isValidated.message,
      });
    }

    const admin = await registerUser({
      name,
      email,
      password,
      confirmPassword
    });

    res.status(201).json({
      message: "Admin user created successfully",
      status: true,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValidated = await loginUserValidation(req.body);

    if (!isValidated.status) {
      return res.status(400).json({
        status: false,
        message: isValidated.message,
      });
    }

    const admin = await loginUser({ email, password });

    res.status(200).json({
      message: "User Login successful",
      status: true,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

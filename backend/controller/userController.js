
import { getUsers, UserById, updateById, deleteById } from "../services/userService.js"
export const userList = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      message: "User fetched successfully",
      status: true,
      users: users
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserById(id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const userUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await updateById(id, name, email);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}

export const userDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await deleteById(id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
}


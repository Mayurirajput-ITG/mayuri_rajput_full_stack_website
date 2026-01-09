import User from "../models/User.js";
import { Parser } from "json2csv";
import csv from "csv-parser";
import path from "path";
import fs from "fs";
import { Readable } from "stream";
export const getUsers = async () => {
  const users = await User.find({ role: { $ne: 1 } }); // $ne = not equal
  return users;
};

export const UserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const updateById = async (id, name, email) => {
  const user = await User.updateOne(
    { _id: id },
    { $set: { name: name, email: email } }
  );
  return user;
};


export const deleteById = async (id) => {
  const user = await User.deleteOne(
    { _id: id }
  );
  return user;
};

export const exportCustomers = async (req, res) => {
  try {
    let customers = await User.find({ role: { $ne: 1 } }, "name email role createdAt password").lean();
    if (!customers.length) {
      return res.status(404).json({ status: false, message: "No data found" });
    }
    customers = customers.map(c => ({
      ...c,
      role: c.role === 0 ? "Customer" : c.role,
      createdAt: new Date(c.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }));
    const fields = [
      { label: "Name", value: "name" },
      { label: "Email", value: "email" },
      { label: "Role", value: "role" },
      { label: "Joining Date", value: "createdAt" },
      { label: "Password", value: "password" },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(customers);

    // Set headers for download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=customers.csv");
    res.status(200).end(csv);

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};




export const importCustomer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "No file uploaded",
      });
    }
    const results = [];
    // Convert csv buffer to stream
    const stream = Readable.from(req.file.buffer);
    stream
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          // STEP 1: Delete previous users except role = 1 (Admin)
          await User.deleteMany({ role: { $ne: 1 } });
          // STEP 2: Format new data
          const formattedData = results.map((item) => ({
            name: item.Name || item.name,
            email: item.Email || item.email,
            role: 0, // always customer
            createdAt: item["Joining Date"]
              ? new Date(item["Joining Date"])
              : new Date(),
            password: item.Password || item.password  // default
          }));
          // STEP 3: Insert fresh records
          await User.insertMany(formattedData);
          res.json({
            status: true,
            message: "Customer data replaced and imported successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Import failed: " + error.message,
          });
        }
      })
      .on("error", (err) => {
        res.status(500).json({
          status: false,
          message: "Stream error: " + err.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error processing file: " + error.message,
    });
  }
};


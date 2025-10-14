import User from "../models/user.js";

// CREATE
export const createUser = (data) => User.create(data);

// READ
export const getAllUsers = () => User.find({});
export const getUsersByName = (name) => User.find({ name });
export const getUsersByJob = (job) => User.find({ job });
export const getUsersByNameAndJob = (name, job) => User.find({ name, job });
export const getUserById = (id) => User.findById(id);

// UPDATE
export const updateUserById = (id, patch) =>
  User.findByIdAndUpdate(id, { $set: patch }, { new: true });

// DELETE
export const deleteUserById = (id) => User.findByIdAndDelete(id);

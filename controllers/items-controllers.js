const mongoose = require('mongoose');
const Item = require('../models/Items');
const User = require('../models/Users');

const getAllItems = async (req, res) => {
  console.log('getAllItems');
  res.status(200).json({});
};

const getMyItems = async (req, res) => {
  let user;

  try {
    user = await User.findById(req.uid).populate('items');;
    if(!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(user.items);
};

const getItem = async (req, res) => {
  const { id } = req.params;
  console.log('getItem: ' + id);
  res.status(200).json({});
};

const createItem = async (req, res) => {
  const { title, price, description, images } = req.body;

  let user;

  try {
    user = await User.findById(req.uid);
    if(!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const item = new Item({
    owner: mongoose.Types.ObjectId(req.uid),
    title, 
    price,
    description, 
    images
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await item.save({ session });
    user.items.push(item);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(item);
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  console.log('updateItem: ' + id);
  res.status(200).json({});
};

const updateLike = async (req, res) => {
  const { id } = req.params;
  console.log('updateLike: ' + id);
  res.status(200).json({});
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  console.log('deleteItem: ' + id);
  res.status(200).json({});
};

exports.getAllItems = getAllItems;
exports.getMyItems = getMyItems;
exports.getItem = getItem;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.updateLike = updateLike;
exports.deleteItem = deleteItem;

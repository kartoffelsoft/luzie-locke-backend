const mongoose = require('mongoose');
const Item = require('../models/Items');
const User = require('../models/Users');

const paginatedQuery = async (model, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  try {
    results.results = await model.find().limit(limit).skip(startIndex).populate({
      path: 'owner',
      select: { 'location.name': 1 }
    });
  } catch (error) {
    throw(error);
  }

  return results;
};

const getItems = async (req, res) => {
  let items;
  try {
    items = await Item.find().populate({
      path: 'owner',
      select: { 'location.name': 1 }
    }).sort({ createdAt: -1 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(items);
};

const getHotItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    results.results = await Item.find().limit(limit).skip(startIndex).populate({
      path: 'owner',
      select: { 'location.name': 1 }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (endIndex < await Item.countDocuments()) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  res.status(200).json(results);
};

const getGarageItems = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.uid).populate({
      path: 'items',
      populate: {
        path: 'owner',
        select: { 'location.name': 1 }
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(user.items);
};

const getItem = async (req, res) => {
  const { id } = req.params;
  
  let item;
  try {
    item = await Item.findByIdAndUpdate(
			id,
			{
				$inc: { 'counts.view': 1 }
			},
			{ new: true }
		).populate('owner');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(item);
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

exports.getItems = getItems;
exports.getHotItems = getHotItems;
exports.getGarageItems = getGarageItems;
exports.getItem = getItem;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.updateLike = updateLike;
exports.deleteItem = deleteItem;

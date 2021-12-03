const mongoose = require('mongoose');

const { Items, Users, Listings } = require('../models');

const getRecentItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    results.results = await Items.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex).populate({
      path: 'user',
      select: { 'location.name': 1 }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  if (endIndex < await Items.countDocuments()) {
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

  res.status(200).json({ success: true, message: '', data: { items: results.results, next: results.next, previous: results.previous } });
};

const getHotItems = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    results.results = await Item.find().limit(limit).skip(startIndex).populate({
      path: 'uid',
      select: { 'location.name': 1 }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (endIndex < await Items.countDocuments()) {
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
    user = await Users.findById(req.uid).populate({
      path: 'items',
      populate: {
        path: 'uid',
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
    item = await Items.findByIdAndUpdate(
			id,
			{
				$inc: { 'counts.view': 1 }
			},
			{ new: true }
		).populate('user');
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  res.status(200).json({ success: true, message: '', data: { item } });
};

const createItem = async (req, res) => {
  const { title, price, description, images } = req.body;

  let listing;
  try {
    listing = await Listings.findOne({ uid: req.uid }) 
    if(!listing) {
      return res.status(404).json({ success: false, message: 'User not found.', data: null });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  const item = new Items({
    user: req.uid,
    title, 
    price,
    description, 
    images
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await item.save({ session });
    listing.items.push(item);
    await listing.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  res.status(201).json({ success: true, message: '', data: null });
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

module.exports = Object.freeze({
  getRecentItems,
  getHotItems,
  getGarageItems,
  getItem,
  createItem,
  updateItem,
  updateLike
})

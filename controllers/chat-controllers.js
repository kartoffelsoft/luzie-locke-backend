const mongoose = require('mongoose');
const Inbox = require('../models/Inbox');
const Message = require('../models/Message');
const User = require('../models/Users');

const getInbox = async (req, res) => {
  let inbox;
  try {
    inbox = await Inbox.find({ uid: req.uid }).populate({
      path: 'nid',
      select: { 'name': 1, 'pictureURI': 1 }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json(inbox);
};

const createChat = async (req, res) => {
  const { uid, nid } = req.body;

  let inbox;
  try {
    inbox = await Inbox.findOne({
      uid, 
      nid 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  let messages;
  if (inbox) {
    messages = await Message.find({ chatId: inbox.chatId });
  } else {
    messages = [];

    try {
      inbox = await new Inbox({ 
        uid,
        nid
      }).save();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  console.log(inbox);
  console.log(messages);

  try {
    inbox = await Inbox.findOne({
      uid, 
      nid 
    }).populate([{
      path: 'uid',
      select: { 'name': 1, 'pictureURI': 1 }
    }, {
      path: 'nid',
      select: { 'name': 1, 'pictureURI': 1 }
    }]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ inbox, messages });
};

exports.getInbox = getInbox;
exports.createChat = createChat;

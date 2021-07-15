const mongoose = require('mongoose');
const Inbox = require('../models/Inbox');
const Message = require('../models/Message');
const User = require('../models/Users');

const getChatInbox = async (req, res) => {
  const { id } = req.params;

  let inbox;
  try {
    inbox = await Inbox.find({
      user: id 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ inbox });
};

const createChat = async (req, res) => {
  const { uid1, uid2 } = req.body;

  let inbox;
  try {
    inbox = await Inbox.findOne({
      user: uid1, 
      friend: uid2 
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
        user: uid1,
        friend: uid2
      }).save();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  console.log(inbox);
  console.log(messages);

  res.status(200).json({ chatId: inbox.chatId, chatMessages: messages });
};

exports.getChatInbox = getChatInbox;
exports.createChat = createChat;

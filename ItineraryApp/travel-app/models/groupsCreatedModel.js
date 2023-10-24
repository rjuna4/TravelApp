const mongoose = require('mongoose');

const userCreatedGroupsSchema = new mongoose.Schema({
  groupImageFilename: {type: String, required: true, unique: false },
  groupTitle: { type: String, required: true, unique: false },
  groupDescription: { type: String, required: false, unique: false },
  groupCapacity: { type: Number, required: false, unique: false },
}, { collection: 'User_CreatedGroups' });

const UserGroupsCreated = mongoose.model('UserGroup', userCreatedGroupsSchema);

module.exports = UserGroupsCreated;



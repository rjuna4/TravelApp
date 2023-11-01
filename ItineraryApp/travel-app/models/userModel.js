const userSchema = mongoose.Schema({
      fullName: {type: String, required: true, unique: false},
      emailAddress: {type: String, required: true, unique: true},
      username: {type: String, required: true, unique: true},
      password: {type: String},
      confirmPassword: {type: String}
  },
  { collection: 'User_Accounts'} 
  )
  
  const userModel = mongoose.model('UserSchema', userSchema)
  
  module.exports = userModel
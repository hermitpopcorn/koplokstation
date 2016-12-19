import { Meteor } from 'meteor/meteor';
import { HttpBasicAuth } from 'meteor/jabbslad:basic-auth';
import { User } from '../../api/user/user.js';
import bcrypt from 'bcrypt';

var basicAuth = new HttpBasicAuth(function(username, password) {
  let user = User.findOne({ 'username': username });
  if(user) {
    return bcrypt.compareSync(password, user.password);
  }
  return false;
});
basicAuth.protect();

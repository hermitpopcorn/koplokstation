import { Meteor } from 'meteor/meteor';
import { HttpBasicAuth } from 'meteor/jabbslad:basic-auth';
import { Users } from '../../api/server-control/users/users.js';
import bcrypt from 'bcrypt';

var basicAuth = new HttpBasicAuth(function(username, password) {
  let user = Users.findOne({ 'username': username });
  if(user) {
    return bcrypt.compareSync(password, user.password);
  }
  return false;
});
basicAuth.protect();

// Methods related to users

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { User } from './user.js';
import bcrypt from 'bcrypt';

Meteor.methods({
  'user.isEmpty'() {
    let count = User.find().count();

    return count < 1;
  },

  'user.insert'(username, password) {
    check(username, String);
    check(password, String);

    var crypted = bcrypt.hashSync(password, 8);

    return User.insert({
      'username': username,
      'password': crypted
    }, function(err, inserted) {
      if(err) { return false; }
      return inserted._id;
    });
  },
});

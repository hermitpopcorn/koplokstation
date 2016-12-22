// Methods related to users

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Users } from './users.js';
import bcrypt from 'bcrypt';

Meteor.methods({
  'users.isEmpty'() {
    let count = Users.find().count();

    return count < 1;
  },

  'users.insert'(username, password) {
    check(username, String);
    check(password, String);

    var crypted = bcrypt.hashSync(password, 8);

    return Users.insert({
      'username': username,
      'password': crypted
    }, function(err, inserted) {
      if(err) { return false; }
      return inserted._id;
    });
  },
});

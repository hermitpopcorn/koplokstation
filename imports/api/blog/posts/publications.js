import { Meteor } from 'meteor/meteor';
import { Post } from './posts.js';

Meteor.publish('posts.all', function () {
  return Post.find();
});

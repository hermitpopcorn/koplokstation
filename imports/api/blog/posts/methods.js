import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Post } from './posts.js';

Meteor.methods({
  'posts.insert'(title, content, date = false) {
    check(title, String);
    check(content, String);
    if(date) { check(date, Date); }

    var post = new Post();
    post.title = title;
    post.content = content;
    post.publishedAt = date ? date : new Date();
    return post.save();
  },
});

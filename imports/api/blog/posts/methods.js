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

  'posts.delete'(postId) {
    var post;

    if(typeof postId != "object") {
      post = Post.findOne({ _id: new Meteor.Collection.ObjectID(postId) });
    } else {
      post = Post.findOne({ _id: postId });
    }
    return post.remove();
  },

  'posts.save'(postObject) {
    // if new post
    if(typeof postObject._id === "undefined") {
      postObject._id = new Meteor.Collection.ObjectID();
    }

    return postObject.save();
  },
});

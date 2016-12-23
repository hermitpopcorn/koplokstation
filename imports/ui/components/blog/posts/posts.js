import { Meteor } from 'meteor/meteor';
import { Post } from '/imports/api/blog/posts/posts.js';
import './posts.html';

Template.Blog_components_posts.onCreated(function() {
  Meteor.subscribe('posts.all');
});

Template.Blog_components_posts.helpers({
  posts() {
    return Post.find();
  },
});

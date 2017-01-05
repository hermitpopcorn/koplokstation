import { Meteor } from 'meteor/meteor';
import './blog.html';

Template.Blog_body.helpers({
  loggedIn() {
    return Meteor.userId();
  }
});

Template.Blog_body.events({
  'click .logout'(event, template) {
    Meteor.logout(function(err) {
      FlowRouter.go('/blog');
    });
  }
});

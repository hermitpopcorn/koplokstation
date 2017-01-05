import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/not-found/not-found.js';

import '/imports/ui/pages/auth/login/login.js';

import '/imports/ui/pages/server-control/home/home.js';
import '/imports/ui/pages/server-control/terminal/terminal.js';

import '/imports/ui/layouts/blog/blog.js';
import '/imports/ui/pages/blog/home/home.js';

BlazeLayout.setRoot('body');

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Blog.home',
  action() {
    BlazeLayout.render('Blog_body', { main: 'Blog_home' });
  },
});

FlowRouter.route('/server', {
  name: 'ServerControl.home',
  action() {
    BlazeLayout.render('App_body', { main: 'ServerControl_home' });
  },
  triggersEnter: [function(context, redirect) {
    if(!Meteor.userId()) {
      Session.set('loginRedirect', '/server');
      redirect('/login');
    }
  }],
});

FlowRouter.route('/login', {
  name: 'Auth.login',
  action() {
    BlazeLayout.render('App_body', { main: 'Auth_login' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/not-found/not-found.js';

import '../../ui/pages/server-control/home/home.js';
import '../../ui/pages/server-control/terminal/terminal.js';

import '../../ui/layouts/blog/blog.js';
import '../../ui/pages/blog/home/home.js';

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
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

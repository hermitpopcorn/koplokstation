import './terminal.html';

import '../../../components/server-control/terminal-access/terminal-access.js';

import { Meteor } from 'meteor/meteor';

Template.ServerControl_terminal.events({
  'click': function(event) {
    if(!Meteor.userId()) {
      event.preventDefault();
      FlowRouter.go("/login");
    }
  }
});

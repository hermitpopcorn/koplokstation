import './home.html';

import '/imports/ui/components/server-control/beep-button/beep-button.js';
import '/imports/ui/components/server-control/scraper/router/connected-devices.js';
import '/imports/ui/components/server-control/upload/upload.js';

import { Meteor } from 'meteor/meteor';

Template.ServerControl_home.events({
  'click': function(event) {
    if(!Meteor.userId()) {
      event.preventDefault();
      FlowRouter.go("/login");
    }
  },

  'click .logout': function(event, template) {
    $(template.find(".logout")).html("Logging you out...");

    Meteor.logout(function(err) {
      if(err) {
        $(template.find(".logout")).html("Logout");
        return false;
      }

      FlowRouter.go('/');
    });
  }
});

import './login.html';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

Template.Auth_login.onCreated(function() {
  this.alert = new ReactiveVar(false);
});

Template.Auth_login.helpers({
  alert() {
    var template = Template.instance();
    return template.alert.get();
  },

  isRedirect() {
    return Session.get('loginRedirect');
  }
});

Template.Auth_login.events({
  'submit form': function(event, template) {
    event.preventDefault();

    $(template.find(".alert")).fadeOut();

    Meteor.loginWithPassword(event.target.username.value, event.target.password.value, function(err) {
      if(err) {
        $(template.find(".alert")).fadeIn();
        template.alert.set({ type: "danger", message: "Login failed. "});
        return err;
      }

      $(template.find(".alert")).fadeIn();
      template.alert.set({ type: "success", message: "Login success!" });

      // if the user landed on the login page
      // because they tried to access a secured page
      if(Session.get('loginRedirect')) {
        setTimeout(function() {
          let redirect = Session.get('loginRedirect');
          Session.set('loginRedirect', false);
          FlowRouter.go(redirect);
        }, 2000);
      }

      return true;
    });
  }
});

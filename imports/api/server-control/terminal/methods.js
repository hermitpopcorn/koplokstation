import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { shell } from 'meteor/izzilab:shelljs';

Meteor.methods({
  'terminal.exec'(command) {
    var syncExec = Meteor.wrapAsync(shell.exec), ret;
    try {
      ret = syncExec(command, {silent: true, bash: '/bin/bash'});
    } catch(error) {
      return "Error code: "+error;
    }

    return ret;
  },
});

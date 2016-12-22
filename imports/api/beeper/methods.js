import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { shell } from 'meteor/izzilab:shelljs';

Meteor.methods({
  'beeper.beep'() {
    shell.exec("mpg123 " + Assets.absoluteFilePath("audio/chirp.mp3") + " &", {silent: true});
  },

  'beeper.telolet'() {
    shell.exec("mpg123 " + Assets.absoluteFilePath("audio/telolet.mp3") + " &", {silent: true});
  },
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { shell } from 'meteor/izzilab:shelljs';

Meteor.methods({
  'beeper.beep'() {
    shell.exec("mpg123 " + Assets.absoluteFilePath("audio/chirp.mp3") + " &", {silent: true, async: true});
  },

  'beeper.telolet'() {
    shell.exec("mpg123 " + Assets.absoluteFilePath("audio/telolet.mp3") + " &", {silent: true, async: true});
  },

  'beeper.mute'() {
    shell.exec("amixer -q -D pulse sset Master mute &", {silent: true, async: true});
  },

  'beeper.unmute'() {
    shell.exec("amixer -q -D pulse sset Master unmute &", {silent: true, async: true});
  }
});

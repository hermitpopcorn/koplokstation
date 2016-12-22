import './beep-button.html';

Template.beepButton.events({
  'click button.beep'(event, instance) {
    // beep the server when the button is pressed
    Meteor.call('beeper.beep', (error) => {
      if (error) {
        alert(error.error);
      }
    });
  },

  'click button.telolet'(event, instance) {
    // om telolet because it's the freshest meme of 2016 as of writing this
    Meteor.call('beeper.telolet', (error) => {
      if (error) {
        alert(error.error);
      }
    });
  },
});

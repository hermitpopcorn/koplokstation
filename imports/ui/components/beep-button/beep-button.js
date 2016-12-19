import './beep-button.html';

Template.beepButton.events({
  'click button'(event, instance) {
    // beep the server when the button is pressed
    Meteor.call('beeper.beep', (error) => {
      if (error) {
        alert(error.error);
      }
    });
  },
});

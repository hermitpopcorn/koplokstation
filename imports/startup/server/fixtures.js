import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    console.log("No users present in database. Creating default user tiesto:metatron...");
    Accounts.createUser({
      username: 'tiesto',
      password: 'metatron',
    });
  }
});

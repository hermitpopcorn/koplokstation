Meteor.publish("fileUploads", function () {
  return uploadedFilesCollection.find();
});

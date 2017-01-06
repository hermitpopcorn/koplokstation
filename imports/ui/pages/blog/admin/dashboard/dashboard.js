import { Meteor } from 'meteor/meteor';
import { Post } from '/imports/api/blog/posts/posts.js';
import 'meteor/lsun:ckeditor';
import './dashboard.html';

Template.Blog_admin_dashboard.onCreated(function() {
  Meteor.subscribe('posts.all');

  Template.instance.postData = new ReactiveVar(new Post());

  // Load editor from CDN
  var loadCKEDITOR = setInterval(function() {
     if(typeof CKEDITOR !== "undefined") {
       CKEDITOR.replace('editor');
       clearInterval(loadCKEDITOR);
     }
  }, 1000);
});

Template.Blog_admin_dashboard.helpers({
  posts() {
    return Post.find({}, { sort: { publishedAt: -1 } });
  },

  postData() {
    return Template.instance.postData.get();
  }
});

Template.Blog_admin_dashboard.events({
  'click button.new'(event, instance) {
    Template.instance.postData = new ReactiveVar(new Post());
    instance.find('input#title').value = "";
    CKEDITOR.instances.editor.setData("");
    window.location.href = "#post-editor";
  },

  'click button.save'(event, instance) {
    event.preventDefault();

    var post = Template.instance.postData.get();
    post.title = instance.find('input#title').value;
    post.content = CKEDITOR.instances.editor.getData();
    post.publishedAt = new Date();
    Template.instance.postData.set(post);

    Meteor.call('posts.save', Template.instance.postData.get(), (error) => {
      if (error) {
        swal("Post Saving Fail", "I guess your writing sucks or smth", "error");
      } else {
        swal("Post Saved", "Done!", "success");
        window.location.href = "#posts-list";
      }
    });
  },

  'click button.edit-post'(event, instance) {
    Template.instance.postData.set(Post.findOne({ _id: new Meteor.Collection.ObjectID(event.target.id) }));
    CKEDITOR.instances.editor.setData(Template.instance.postData.get().content);
    window.location.href = "#post-editor";
  },

  'click button.delete-post'(event, instance) {
    var postId = event.target.id;

    swal({
      title: "Are you sure?",
      text: "Don't go regretting it later.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      closeOnConfirm: false,
      html: false
    }, function() {
      Meteor.call('posts.delete', postId, (error) => {
        if (error) {
          swal("Delete Fail","Sorry, but this one's not leaving.","error");
        } else {
          swal("Post Deleted","It's gone now, forever.","success");
        }
      });
    });
  },
});

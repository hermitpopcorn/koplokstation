import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Posts = new Mongo.Collection('posts');
export const Post = Class.create({
  name: 'Post',
  collection: Posts,
  fields: {
    title: String,
    content: String,
    publishedAt: Date
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    },
    slug: {
      fieldName: 'title',
      methodName: null,
      slugFieldName: 'slug',
      canUpdate: true,
      unique: true,
      separator: '-'
    }
  }
});

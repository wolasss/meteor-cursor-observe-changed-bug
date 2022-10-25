import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LinksCollection } from '../api/links';
import { Mongo } from 'meteor/mongo';

export const Info = () => {
  const links = useTracker(() => {
      const cursor = LinksCollection.find();

      cursor.observe({
          changedAt: (newDocument, oldDocument, index) => {
              console.log('changed at', oldDocument, newDocument, index);
          }
      });


    return cursor.fetch();
  });

  const updateLink = (_id) => {
      LinksCollection.update({
          _id
      }, {
          $set: {
              params: {
                  a: 5,
                  d: 5,
                  e: new Mongo.ObjectID('5f953cde8ceca90030bdb86f')
              }
          }
      }, (err, res) => {
          console.log(err, res);
      });

  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{links.map(
        link => <li key={link._id}>
          <a onClick={ () => updateLink(link._id) }>{link.title}</a>
        </li>
      )}</ul>
    </div>
  );
};

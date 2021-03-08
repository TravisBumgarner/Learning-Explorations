import { Meteor } from 'meteor/meteor';
import { TravelsCollection } from "/imports/api/TravelsCollection"

const insertTravel = (travelText: string) => TravelsCollection.insert({ text: travelText });

Meteor.startup(() => {
  if (TravelsCollection.find().count() === 0) {
    [
      "NW",
      "SE",
      "SW"
    ].forEach(insertTravel)
  }
});
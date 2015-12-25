/**
 * Photo model events
 */

'use strict';

import {EventEmitter} from 'events';
var Photo = require('../../sqldb').Photo;
var PhotoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PhotoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Photo.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PhotoEvents.emit(event + ':' + doc._id, doc);
    PhotoEvents.emit(event, doc);
    done(null);
  }
}

export default PhotoEvents;

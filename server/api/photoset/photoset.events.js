/**
 * Photoset model events
 */

'use strict';

import {EventEmitter} from 'events';
var Photoset = require('../../sqldb').Photoset;
var PhotosetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PhotosetEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Photoset.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PhotosetEvents.emit(event + ':' + doc._id, doc);
    PhotosetEvents.emit(event, doc);
    done(null);
  }
}

export default PhotosetEvents;

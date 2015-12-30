/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/photos              ->  index
 * POST    /api/photos              ->  create
 * GET     /api/photos/:id          ->  show
 * PUT     /api/photos/:id          ->  update
 * DELETE  /api/photos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var sqldb = require('../../sqldb');
var Photo = sqldb.Photo;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Get photos from specific photoset
export function photosetPhoto(req, res) {
  console.log('photoset: ', req.params.photoset_id);
  Photo.findAll({
    where: {
      photoset_id: req.params.photoset_id
    }
  })
    .then(function(photoset) {
      if (photoset) {
        handleEntityNotFound(res);
        responseWithResult(res)
        res.status(200).json(photoset)
      }
      else {
        res.status(200).json([])
      }
    })
}

// Gets a list of photos
export function index(req, res) {
  Photo.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Photo from the DB
export function show(req, res) {
  Photo.find({
    where: {
      photo_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Photo in the DB
export function create(req, res) {
  Photo.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Photo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Photo.find({
    where: {
      photo_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Photo from the DB
export function destroy(req, res) {
  Photo.find({
    where: {
      photo_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

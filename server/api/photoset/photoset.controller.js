/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/photosets              ->  index
 * POST    /api/photosets              ->  create
 * GET     /api/photosets/:id          ->  show
 * PUT     /api/photosets/:id          ->  update
 * DELETE  /api/photosets/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var sqldb = require('../../sqldb');
var Photoset = sqldb.Photoset;

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

// Gets a list of Photosets
export function index(req, res) {
  Photoset.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Photoset from the DB
export function show(req, res) {
  Photoset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Photoset in the DB
export function create(req, res) {
  Photoset.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Photoset in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Photoset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Photoset from the DB
export function destroy(req, res) {
  Photoset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

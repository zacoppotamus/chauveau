/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/photosets/?user=:user_id -> userPhotoset
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

function handlePhotosetsNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(200);
      var entity = res.json([]);
      return entity;
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

// Get photoset for one user
export function userPhotoset(req, res) {
  console.log('user photoset: ', req.params.user_id);
  Photoset.findAll({
    where: {
      user_id: req.params.user_id
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

// Gets a list of all Photosets
export function index(req, res) {
  // if (req.query.user_id) {
  //   Photoset.find({
  //     where: {
  //       user_id: req.query.user_id
  //     }
  //   })
  //     .then(function(photoset) {
  //       if (photoset) {
  //         console.log(photoset)
  //         handleEntityNotFound(res);
  //         responseWithResult(res)
  //       }
  //       else {
  //         res.status(200).json([])
  //       }
  //     })
  // }
  // else {
    Photoset.findAll()
      .then(responseWithResult(res))
      .catch(handleError(res));
  // }
}

// Gets a single Photoset from the DB
export function show(req, res) {
  console.log('show photoset:', req.params.id);
  Photoset.find({
    where: {
      photoset_id: req.params.id
    }
  })
    .then(handlePhotosetsNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Photoset in the DB
export function create(req, res) {
  // console.log(req.body);
  Photoset.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Photoset in the DB
export function update(req, res) {
  if (req.body.photoset_id) {
    delete req.body.photoset_id;
  }
  Photoset.find({
    where: {
      photoset_id: req.params.id
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
      photoset_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

'use strict';

const BusinessDTO = require('../db/models/businesses');
const debug = require('debug')('idle-capitalist-server:repository');

function BusinessRepository() {

  async function create(business) {
    const res = await BusinessDTO.create(business);
    debug('BusinessRepository.create', res);
    return res;
  }

  async function findByBusinessKey(businessKey) {
    const res = await BusinessDTO.findOne({businessKey: businessKey});
    debug('BusinessRepository.findByBusinessKey', res);
    return res;
  }

  async function find() {
    const res = await BusinessDTO.find();
    debug('BusinessRepository.find', res);
    return res;
  }


  async function save(business) {
    return await business.save();
  }

  return {
    create,
    findByBusinessKey,
    find,
    save
  }
}

module.exports = BusinessRepository;
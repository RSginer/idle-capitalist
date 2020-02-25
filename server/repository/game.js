'use strict'

const GameDTO = require('../db/models/game')
const debug = require('debug')('idle-capitalist-server:repository')

function GameRepository () {
  async function create (game) {
    const res = await GameDTO.create(game)
    debug('GameRepository.create', res)
    return res
  }

  async function findOne () {
    const res = await GameDTO.findOne().populate('businesses')
    debug('GameRepository.findOne', res)
    return res
  }

  async function save (game) {
    const res = await game.save()
    debug('GameRepository.save', res)
    return res
  }

  return {
    create,
    findOne,
    save
  }
}

module.exports = GameRepository

'use strict';

function clientCommand(command, payload) {
  return `{"type": "${command}", "payload": ${JSON.stringify(payload)}}`;
}

// Maths
function getBusinessRevenue(initialProductivity, businessLevel, ms) {
  const revenue = (initialProductivity * businessLevel) * (ms / 1000);
  return revenue;
}

function getNextExpandCost(initialCost, businessLevel, rateGrowth) {

  // Fix initial cost for limonade, the first one is free, next 4
  const costBase = initialCost || 3.738;
  const owned = businessLevel;
  const cost = Math.round(costBase * Math.pow(rateGrowth, owned) * 100) / 100;
  return cost;
}

module.exports = {
  clientCommand,
  getBusinessRevenue,
  getNextExpandCost
}


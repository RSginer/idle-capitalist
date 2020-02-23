// Maths
function getBusinessRevenue(initialProductivity, businessLevel, ms) {
  const revenue = (initialProductivity * businessLevel) * (ms / 1000);
  return Math.round(revenue * 100) / 100;
}

function getNextExpandCost(initialCost, businessLevel, rateGrowth) {
  // Fix initial cost for limonade, the first one is free, next 4
  const costBase = initialCost || 4;
  const owned = businessLevel;
  const cost = Math.round(costBase * Math.pow(rateGrowth, owned) * 100) / 100;
  return cost;
}

export default {
  getBusinessRevenue,
  getNextExpandCost
}
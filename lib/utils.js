var dist = function(p1, p2) {
  try {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  } catch (ex) {
    return 100000000;
  }
};

module.exports = {
  dist: dist
};

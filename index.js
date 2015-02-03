'use strict';

/**
 * Convert an array of parent-child relational objects to a tree.
 *
 * @Constructor
 * @param {Array} data Collection objects with parent-child relations.
 * @param {String} key Name of the property that has the name or id of the object.
 * @param {String} ref Name of the property that references the parent, see key.
 * @api public
 */
module.exports = function Sapling(data, key, ref) {
  if (!this) return new Sapling(data, key, ref);
  key = key || 'name';
  ref = ref || 'parent';

  data = clone(data || []);

  //
  // Number of iterations in the worst case scenario: (n * 2 - 1).
  // Prepare several variables used in the loop.
  //
  var i = 2 * data.length - 1
    , map = {}, datum, parent, name, d;

  while (i-- && data.length > 0) {
    datum = data.pop();
    datum.children = datum.children || [];

    parent = datum[ref];
    name = datum[key];

    if (!parent) {
      map[name] = this;
      for (d in datum) this[d] = datum[d];
    } else {
      map[name] = datum;

      if (parent in map) map[parent].children.push(map[name]);
      else data.unshift(datum);
    }
  }
};

/**
 * Clone objects in the provided array.
 *
 * @param {Array} array Collection of Nodes.
 * @returns {Array} Deep cloned collection.
 * @api private
 */
function clone(array) {
  var i = array.length
    , target = new Array(i)
    , obj, key;

  while (i--) {
    obj = {};

    for (key in array[i]) {
      if (array[i].hasOwnProperty(key)) {
        obj[key] = Array.isArray(array[i][key])
          ? clone(array[i][key])
          : array[i][key];
      }
    }

    target[i] = obj;
  }

  return target;
}
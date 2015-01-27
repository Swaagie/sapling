'use strict';

/**
 * Convert an array of parent-child relational objects to a tree.
 * Minimal implementation that provides a depth-first iterator.
 *
 * @param {Array} data Collection objects with parent-child relations.
 * @param {String} key Name of the property that has the name or id of the object.
 * @param {String} ref Name of the property that references the parent, see key.
 */
function Sapling(data, key, ref) {
  if (!this) return new Sapling(data, key, ref);

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
}

//
// Define the iterator as non-enumarable and -configurable.
//
Object.defineProperty(Sapling.prototype, 'iterate', {
  configurable: false,
  enumerable: false,

  /**
   * Depth first iterator. Call `next` to walk through the entire tree.
   * Will return child Node objects if available otherwise walks up the
   * tree to return Parent Node Object.s
   *
   * @param {Object} parent Parent node of the current child.
   * @return {Object} Child node.
   */
  value: function iterate(parent) {
    var node = this
      , i = 0
      , key;

    Object.defineProperty(node, 'next', {
      configurable: false,
      enumerable: false,
      value: function next() {
        var child = node.children[i++];

        if (!child && !parent) return void 0;
        if (!child) return parent;
        return iterate.call(child, node);
      }
    });

    return node;
  }
});

//
// Expose the module.
//
module.exports = Sapling;
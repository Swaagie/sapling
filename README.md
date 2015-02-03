# Sapling

[![Version npm][version]](http://browsenpm.org/package/sapling)[![Build Status][build]](https://travis-ci.org/Moveo/sapling)[![Dependencies][david]](https://david-dm.org/Moveo/sapling)[![Coverage Status][cover]](https://coveralls.io/r/Moveo/sapling?branch=master)

[version]: http://img.shields.io/npm/v/sapling.svg?style=flat-square
[build]: http://img.shields.io/travis/Moveo/sapling/master.svg?style=flat-square
[david]: https://img.shields.io/david/Moveo/sapling.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/Moveo/sapling/master.svg?style=flat-square

Convert an array of parent-child relational objects to a tree.

### Installation

```bash
npm install --save sapling
```

### Usage

Create a new Sapling and pass the collection as first argument. The
properties `name` and `parent` are used by default to identify each node.

```js
var Sapling = require('sapling')
  , sapling = new Sapling([{
        name: 'node1'
      }, {
        name: 'node2',
        parent: 'node1'
      }]);
```

This will result in the following tree:

```js
{
  name: 'node1',
  children: [{
    name: 'node2',
    parent: 'node1',
    children: []
  }]
}
```

If nodes and the parent are identified by different properties then
supply the names as arguments to `Sapling`. The `id` as second argument
and the `parent` reference as third argument.

```js
var Sapling = require('sapling')
  , sapling = new Sapling([{
        id: 'node1'
      }, {
        id: 'node2',
        reference: 'node1'
      }], 'id', 'reference');
```

### Tests

```bash
npm run test
npm run coverage
```

### Traversal

To walk or traverse the generate tree, either implement a custom iterator
with [ES6][es6] or use the module named [t][t]. The latter is compatible
and uses the same tree structure.

[es6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
[t]: http://www.browsenpm.org/package/t

### License

Sapling is released under MIT.
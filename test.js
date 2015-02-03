'use strict';

var assume = require('assume')
  , Sapling = require('./')
  , sapling;

var data = [{
  data: '1',
  name: 'first'
}, {
  data: '2',
  name: 'second',
  parent: 'first'
}];

describe('Sapling', function () {
  describe('is module', function () {
    it('which has a constructor', function () {
      assume(Sapling).to.be.a('function');
      assume(new Sapling).to.be.instanceof(Sapling);
    });

    it('has constructor fallback if called as function', function () {
      assume(Sapling()).to.be.instanceof(Sapling);
    });

    it('generates a tree from an relational array', function () {
      sapling = new Sapling(data, 'name', 'parent');

      assume(sapling).to.be.an('object');
      assume(sapling).to.have.property('data', '1');
      assume(sapling).to.have.property('name', 'first');
      assume(sapling).to.have.property('children');
      assume(sapling.children).to.be.an('array');
      assume(sapling.children.length).to.equal(1);
      assume(sapling.children[0]).to.have.property('data', '2');
      assume(sapling.children[0]).to.have.property('name', 'second');
      assume(sapling.children[0]).to.have.property('parent', 'first');
    });

    it('clones the provided data', function () {
      data.push({
        name: '3',
        parent: 'first',
        additional: [{ test: 'test' }]
      });

      sapling = new Sapling(data);
      assume(sapling.children[0].additional[0]).to.have.property('test', 'test');

      data[2].additional = 'change';
      assume(sapling.children[0].additional[0]).to.have.property('test', 'test');
    });

    it('only clones and adds enumerable properties', function () {
      var obj = { a: 1, b: 2, c: 3 };

      function Test() {
        this.name = '4';
        this.parent = 'first';
      }

      Test.prototype = obj;
      data.push(new Test);

      sapling = new Sapling(data);
      assume(sapling.children[0]).to.have.property('name', '4');
      assume(sapling.children[0]).to.not.have.property('a', 1);
      assume(sapling.children[0]).to.not.have.property('b', 2);
      assume(sapling.children[0]).to.not.have.property('c', 3);
    });
  });
});
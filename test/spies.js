if (!chai) {
  var chai = require('chai')
    , spies = require('..');
  chai.use(spies);
}

var should = chai.should();

describe('Chai Spies', function () {

  it('should know when obj is a spy', function () {
    var spy = chai.spy();
    spy.should.be.spy;
  });

  it('should know when a spy has been called', function () {
    var spy = chai.spy();
    spy.should.be.spy;
    spy.__spy.called.should.be.false;
    spy();
    spy.should.have.been.called;
    (function () {
      spy.should.have.been.not_called;
    }).should.throw(chai.AssertionError);
  });

  it('should know hwen a spy has not been called', function () {
    var spy = chai.spy();
    spy.should.be.spy;
    spy.should.be.not_called;
    (function () {
      spy.should.have.been.called;
    }).should.throw(chai.AssertionError);
  });

  it('should know when a spy has been called once', function () {
    var spy1 = chai.spy()
      , spy2 = chai.spy();
    spy1();
    spy2();
    spy2();
    spy1.should.have.been.called.once;
    (function () {
      spy2.should.have.been.called.once;
    }).should.throw(chai.AssertionError);
    (function () {
      spy1.should.have.not.been.called.once;
    }).should.throw(chai.AssertionError);
  });

  it('should know when a spy has been called twice', function () {
    var spy1 = chai.spy()
      , spy2 = chai.spy();
    spy1();
    spy1();
    spy2();
    spy2();
    spy2();
    spy1.should.have.been.called.twice;
    (function () {
      spy2.should.have.been.called.twice;
    }).should.throw(chai.AssertionError);
    (function () {
      spy1.should.have.not.been.called.twice;
    }).should.throw(chai.AssertionError);
  });

  it('should know when a spy has been called exactly n times', function () {
    var spy1 = chai.spy();
    spy1();
    spy1.should.have.been.called.exactly(1);
    (function () {
      spy1.should.have.been.called.exactly(2);
    }).should.throw(chai.AssertionError);
    (function () {
      spy1.should.not.have.been.called.exactly(1);
    }).should.throw(chai.AssertionError);
  });

  it('should know when a spy has been called min n times', function () {
    var spy = chai.spy();
    spy();
    spy();
    spy.should.have.been.called.min(2);
    spy.should.have.been.called.min(1);
    (function () {
      spy.should.have.been.called.min(3);
    }).should.throw(chai.AssertionError);
    (function () {
      spy.should.not.have.been.called.min(2);
    }).should.throw(chai.AssertionError);
  });

  it('should know when a spy has been called max n times', function () {
    var spy = chai.spy();
    spy();
    spy();
    spy();
    spy.should.have.been.called.max(3);
    spy.should.have.been.called.max(4);
    (function () {
      spy.should.have.been.called.max(2);
    }).should.throw(chai.AssertionError);
    (function () {
      spy.should.not.have.been.called.max(4);
    }).should.throw(chai.AssertionError);
  });
});
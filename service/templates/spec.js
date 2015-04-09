/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('<%= utils.upperName(name) %>', function () {
  var factory;

  beforeEach(module('<%= utils.lowerName(module) %>'));

  beforeEach(inject(function (<%= utils.upperName(name) %>) {
    factory = <%= utils.upperName(name) %>;
  }));

  it('should have someValue be <%= utils.upperName(name) %>', function () {
    expect(factory.someValue).toEqual('<%= utils.upperName(name) %>');
  });

  it('should have someMethod return <%= utils.upperName(name) %>', function () {
    expect(factory.someMethod()).toEqual('<%= utils.upperName(name) %>');
  });
});

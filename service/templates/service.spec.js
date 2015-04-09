/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('<%= utils.upperName(name) %>', function () {
  var service;

  beforeEach(module('<%= utils.lowerName(module) %>'));

  beforeEach(inject(function (<%= utils.upperName(name) %>) {
    service = <%= utils.upperName(name) %>;
  }));

  it('should equal <%= utils.upperName(name) %>', function () {
    expect(service.get()).toEqual('<%= utils.upperName(name) %>');
  });
});

/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('<%= utils.upperName(name) %>', function () {
  var scope;

  beforeEach(module('<%= utils.upperName(name) %>'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('<%= utils.upperName(name) %>', {$scope: scope});
  }));

  it('should have ctrlName as <%= utils.upperName(name) %>', function () {
    expect(scope.<%= utils.lowerCamelName(name) %>.ctrlName).toEqual('<%= utils.upperName(name) %>');
  });
});

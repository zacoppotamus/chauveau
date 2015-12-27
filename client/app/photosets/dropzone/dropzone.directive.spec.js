'use strict';

describe('Directive: dropzone', function () {

  // load the directive's module
  beforeEach(module('sqlChauveauApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dropzone></dropzone>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dropzone directive');
  }));
});

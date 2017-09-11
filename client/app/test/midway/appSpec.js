describe('Midway: Testing modules', function () {
    describe('App module', function () {
        var module;

        beforeEach(function () {
            module = angular.module('App');
        });

        it('should be exist', function () {
            expect(module).not.toEqual(null);
            expect(module).not.toEqual(undefined);
        });
    });
});

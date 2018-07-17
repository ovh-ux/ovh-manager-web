describe("Midway: Testing modules", () => {
  describe("App module", () => {
    let module;

    beforeEach(() => {
      module = angular.module("App");
    });

    it("should be exist", () => {
      expect(module).not.toEqual(null);
      expect(module).not.toEqual(undefined);
    });
  });
});

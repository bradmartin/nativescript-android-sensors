var AndroidSensors = require("nativescript-android-sensors").AndroidSensors;
var androidSensors = new AndroidSensors();

describe("greet function", function() {
    it("exists", function() {
        expect(androidSensors.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(androidSensors.greet()).toEqual("Hello, NS");
    });
});
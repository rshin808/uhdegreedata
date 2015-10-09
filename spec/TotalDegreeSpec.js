describe("TotalDegree", function() {
  it("should contain the total number of AWARDS", function() {
    expect(totalDegrees(uhdata)).toEqual(48186);
  });

  var noAwardsField = uhdata.concat({foo: "bar"});

  it("should throw an error if AWARDS field is missing.", function() {
    expect(function() {totalDegrees(noAwardsField);}).toThrowError("No AWARDS Field.");
  });

  var nonIntegerNumber = uhdata.concat({"AWARDS": "bar"});

  it("should throw an error if it contains a non-integer number", function () {
    expect(function() {totalDegrees(nonIntegerNumber);}).toThrowError("Non-Integer Number.");
  });
});

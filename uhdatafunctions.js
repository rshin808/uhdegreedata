/**
 * UH Degree Data functions.
 * @author Reed Shinsato
 */

/**
 * This function can be passed uhdata and returns the total number of degrees awarded in the data set.
 * @param data The passed uhdata.
 * @returns {number}
 */
function totalDegrees(data) {
  if(!_.every(data, function(record) {
    return record.hasOwnProperty("AWARDS");
  })) {
    throw new Error("No AWARDS Field.");
  }

  return _.reduce(data, function(memo, num) {
    if(isNaN(num.AWARDS)) {
      throw new Error("Non-Integer Number.");
    }

    return memo + num.AWARDS;
  }, 0);
}

/**
 * The function can be passed uhdata and returns the percentage of degrees that were awarded to students of Hawaiian
 * Legacy in the data set.
 * @param data The passed uhdata.
 * @returns {number}
 */
function percentageHawaiian(data) {
  return numHawaiianDegrees(data) / totalDegrees(data) * 100;
}

/**
 * This function can be passed uhdata and a year and returns the total number of degrees awarded in the passed year.
 * @param data The passed uhdata.
 * @param year The year to check for.
 * @return {number}
 */
function totalDegreesByYear(data, year) {
  return totalDegrees(_.filter(data, function(degree) {
    return degree["FISCAL_YEAR"] === year;
  }));
}

/**
 * This function can be passed uhdata and returns an array containing all the campuses referenced in the passed dataset.
 * @param data The passed uhdata.
 * @return {Array}
 */
function listCampuses(data) {
  return _.uniq(_.pluck(data, "CAMPUS"));
}

/**
 * This function can be passed uhdata and returns an object where the property keys are campuses and the values are the
 * number of degrees awarded in a year.
 * @param data The passed uhdata.
 * @return {Object}
 */
function listCampusDegrees(data) {
  var campuses = listCampuses(data);
  var campusObjects = _.object(campuses, []);
  campusObjects = _.mapObject(campusObjects, function(key, value) {
    return 0;
  });

  _.reduce(data, function(memo, record) {
    var key = record.CAMPUS;
    campusObjects[key] += record.AWARDS;
  });
  return campusObjects;
}

/**
 * This function can be passed uhdata and returns an integer indicating the maximum number of degrees awarded in a year.
 * @param data The passed uhdata.
 * @return {number}
 */
function maxDegrees(data) {
  var year = _.groupBy(data, "FISCAL_YEAR");
  var degreesObject = _.mapObject(year, function(value, key) {
    return _.reduce(value, function(memo, record) {
      return memo + record.AWARDS;
    }, 0);
  });
  return _.max(degreesObject);
}

/**
 * This function can be passed uhdata and returns a list of the degree programs for which a doctoral degree is granted.
 * @param data The passed uhdata.
 * @return {Array}
 */
function doctoralDegreePrograms(data) {
  return _.pluck(_.filter(data, function(record) {
    return record.OUTCOME === "Doctoral Degrees";
  }), "CIP_DESC");
}

/** Helper Functions */
/**
 * This function can be passed uhdata and returns a list of the degree programs with Hawaiian Legacy.
 * @param data The passed uhdata.
 * @returns {Array.<T>|*}
 */
function hawaiianData(data) {
  return _.filter(data, function(degree) {
    return degree.HAWAIIAN_LEGACY === "HAWAIIAN";
  });
}

/**
 * This function can be passed uhdata and returns the number of Hawaiian Degrees.
 * @param data The passed uhdata.
 * @returns {*}
 */
function numHawaiianDegrees(data) {
  return _.reduce(hawaiianData(data), function(memo, num) {
    return memo + num.AWARDS;
  }, 0);
}

/**
 * This function can be passed uhdata and returns the data grouped by campuses.
 * @param data The passed uhdata.
 * @returns {*} The data grouped by campuses.
 */
function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}

/**
 * THis function can be passed uhdata and returns the data grouped by year.
 * @param data The passed uhdata.
 * @returns {*} The data grouped by year.
 */
function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}
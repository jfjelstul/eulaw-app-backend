
const databaseConnection = require.main.require("./EUSA-module/connection/EUSA-database-connection.js");

const downloadResource = require.main.require("./utilities/download.js");

const model = {};

model.cases = function(parameters, queryResult) {

  var { minYear, maxYear, memberState, directorateGeneral, caseNumber, caseType,
    exempt, preliminaryInvestigation, formalInvestigation, noObjection, notAid,
    positive, negative, conditional, withdrawal, referral, recovery,
    limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  table = "cases";

  if (typeof minYear !== "undefined") {
    conditions.push("notification_year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("notification_year <= ?");
    values.push(maxYear);
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }
  if (typeof directorateGeneral !== "undefined") {
    conditions.push("directorate_general_ID = ?");
    values.push(directorateGeneral);
  }
  if (typeof caseNumber !== "undefined") {
    conditions.push("case_number = ?");
    values.push(caseNumber);
  }
  if (typeof caseType !== "undefined") {
    conditions.push("case_type_ID = ?");
    values.push(caseType);
  }

  if (typeof exempt !== "undefined") {
    conditions.push("exempt = ?");
    values.push(exempt);
  }
  if (typeof preliminaryInvestigation !== "undefined") {
    conditions.push("preliminary_investigation = ?");
    values.push(preliminaryInvestigation);
  }
  if (typeof formalInvestigation !== "undefined") {
    conditions.push("formal_investigation = ?");
    values.push(formalInvestigation);
  }
  if (typeof noObjection !== "undefined") {
    conditions.push("no_objection = ?");
    values.push(noObjection);
  }
  if (typeof notAid !== "undefined") {
    conditions.push("not_aid = ?");
    values.push(notAid);
  }
  if (typeof positive !== "undefined") {
    conditions.push("positive = ?");
    values.push(positive);
  }
  if (typeof negative !== "undefined") {
    conditions.push("negative = ?");
    values.push(negative);
  }
  if (typeof conditional !== "undefined") {
    conditions.push("conditional = ?");
    values.push(conditional);
  }
  if (typeof withdrawal !== "undefined") {
    conditions.push("withdrawal = ?");
    values.push(withdrawal);
  }
  if (typeof referral !== "undefined") {
    conditions.push("referral = ?");
    values.push(referral);
  }
  if (typeof recovery !== "undefined") {
    conditions.push("recovery = ?");
    values.push(recovery);
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.casesTS = function(parameters, queryResult) {

  var { byCaseType, minYear, maxYear, caseType, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = "cases_TS"
  if (byCaseType === "1") {
    table = "cases_TS_D"
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.casesCSTS = function(parameters, queryResult) {

  var { byCaseType, crossSection, memberState, directorateGeneral,
    minYear, maxYear, caseType, limit, offset, download} = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = null
  if (byCaseType === "1") {
    if(crossSection === "MS") {
      table = "cases_CSTS_MS_D"
    } else if (crossSection === "DG") {
      table = "cases_CSTS_DG_D"
    }
  } else {
    if(crossSection === "MS") {
      table = "cases_CSTS_MS"
    } else if (crossSection === "DG") {
      table = "cases_CSTS_DG"
    }
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }
  if (crossSection === "MS") {
    if (typeof memberState !== "undefined") {
      conditions.push("member_state_ID = ?");
      values.push(memberState);
    }
  }
  if (crossSection === "DG") {
    if (typeof directorateGeneral !== "undefined") {
      conditions.push("directorate_general_ID = ?");
      values.push(directorateGeneral);
    }
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.casesDDY = function(parameters, queryResult) {

  var { byCaseType, minYear, maxYear, memberState, directorateGeneral,
    caseType, network, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = null
  if (byCaseType === "1") {
    if(network === "1") {
      table = "cases_network_D"
    } else {
      table = "cases_DDY_D"
    }
  } else {
    if(network === "1") {
      table = "cases_network"
    } else {
      table = "cases_DDY"
    }
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }
  if (typeof directorateGeneral !== "undefined") {
    conditions.push("directorate_general_ID = ?");
    values.push(directorateGeneral);
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.decisions = function(parameters, queryResult) {

  var { minYear, maxYear, memberState, directorateGeneral,
    caseNumber, caseType, decisionType, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  table = "decisions";

  if (typeof minYear !== "undefined") {
    conditions.push("decision_year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("decision_year <= ?");
    values.push(maxYear);
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }
  if (typeof directorateGeneral !== "undefined") {
    conditions.push("directorate_general_ID = ?");
    values.push(directorateGeneral);
  }
  if (typeof caseNumber !== "undefined") {
    conditions.push("case_number = ?");
    values.push(caseNumber);
  }
  if (typeof caseType !== "undefined") {
    conditions.push("case_type_ID = ?");
    values.push(caseType);
  }
  if (typeof decisionType !== "undefined") {
    conditions.push("decision_type_ID = ?");
    values.push(decisionType);
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.decisionsTS = function(parameters, queryResult) {

  var { byCaseType, minYear, maxYear, caseType, decisionType, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = "decisions_TS"
  if (byCaseType === "1") {
    table = "decisions_TS_D"
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (typeof decisionType !== "undefined") {
    conditions.push("decision_type_ID = ?");
    values.push(decisionType);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};


model.decisionsCSTS = function(parameters, queryResult) {

  var { byCaseType, crossSection, memberState, directorateGeneral,
    minYear, maxYear, decisionType, caseType, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
  }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = null
  if (byCaseType === "1") {
    if(crossSection === "MS") {
      table = "decisions_CSTS_MS_D"
    } else if (crossSection === "DG") {
      table = "decisions_CSTS_DG_D"
    }
  } else {
    if(crossSection === "MS") {
      table = "decisions_CSTS_MS"
    } else if (crossSection === "DG") {
      table = "decisions_CSTS_DG"
    }
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (typeof decisionType !== "undefined") {
    conditions.push("decision_type_ID = ?");
    values.push(decisionType);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }
  if (crossSection === "MS") {
    if (typeof memberState !== "undefined") {
      conditions.push("member_state_ID = ?");
      values.push(memberState);
    }
  }
  if (crossSection === "DG") {
    if (typeof directorateGeneral !== "undefined") {
      conditions.push("directorate_general_ID = ?");
      values.push(directorateGeneral);
    }
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.decisionsDDY = function(parameters, queryResult) {

  var { byCaseType, minYear, maxYear, memberState,
    directorateGeneral, caseType, decisionType, network, limit, offset, download } = parameters.query;

  if (typeof limit === "undefined") {
    limit = 100;
   }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 100) {
    limit = 100;
  }

  var conditions = [];
  var values = [];

  var table = null
  if (byCaseType === "1") {
    if(network === "1") {
      table = "decisions_network_D"
    } else {
      table = "decisions_DDY_D"
    }
  } else {
    if(network === "1") {
      table = "decisions_network"
    } else {
      table = "decisions_DDY"
    }
  }

  if (typeof minYear !== "undefined") {
    conditions.push("year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("year <= ?");
    values.push(maxYear);
  }
  if (typeof decisionType !== "undefined") {
    conditions.push("decision_type_ID = ?");
    values.push(decisionType);
  }
  if (byCaseType === "1") {
    if (typeof caseType !== "undefined") {
      conditions.push("case_type_ID = ?");
      values.push(caseType);
    }
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }
  if (typeof directorateGeneral !== "undefined") {
    conditions.push("directorate_general_ID = ?");
    values.push(directorateGeneral);
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.awards = function(parameters, queryResult) {

  var { minYear, maxYear, caseNumber, memberState, beneficiaryType,
    sector, aidInstrument, limit, offset, download } = parameters.query;

  if (typeof limit === "undefined") {
    limit = 1000;
   }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var conditions = [];
  var values = [];

  var table = "awards"

  if (typeof minYear !== "undefined") {
    conditions.push("notification_year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("notification_year <= ?");
    values.push(maxYear);
  }
  if (typeof caseNumber !== "undefined") {
    conditions.push("case_number = ?");
    values.push(caseNumber);
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }
  if (typeof beneficiaryType !== "undefined") {
    conditions.push("beneficiary_type_ID = ?");
    values.push(beneficiaryType);
  }
  if (typeof sector !== "undefined") {
    conditions.push("NACE_sector_ID = ?");
    values.push(sector);
  }
  if (typeof aidInstrument !== "undefined") {
    conditions.push("aid_instrument_ID = ?");
    values.push(aidInstrument);
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

model.awardsCSTS = function(parameters, queryResult) {

  var { minYear, maxYear, memberState, byBeneficiary, byInstrument, bySector,
  beneficiaryType, sector, aidInstrument, limit, offset, download } = parameters.query;

  var conditions = [];
  var values = [];

  if (typeof limit === "undefined") {
    limit = 1000;
   }

  if (typeof offset === "undefined") {
    offset = 0;
  }

  if(limit > 1000) {
    limit = 1000;
  }

  var table = "awards_CSTS"
  if (byBeneficiary === "1") {
    table = "awards_CSTS_B";
  }
  else if (byInstrument === "1") {
    table = "awards_CSTS_I";
  }
  else if (bySector === "1") {
    table = "awards_CSTS_S";
  }

  if (typeof minYear !== "undefined") {
    conditions.push("notification_year >= ?");
    values.push(minYear);
  }
  if (typeof maxYear !== "undefined") {
    conditions.push("notification_year <= ?");
    values.push(maxYear);
  }
  if (typeof memberState !== "undefined") {
    conditions.push("member_state_ID = ?");
    values.push(memberState);
  }

  if (byBeneficiary === "1") {
    if (typeof beneficiaryType !== "undefined") {
      conditions.push("beneficiary_type_ID = ?");
      values.push(beneficiaryType);
    }
  }
  if (bySector === "1") {
    if (typeof sector !== "undefined") {
      conditions.push("NACE_sector_ID = ?");
      values.push(sector);
    }
  }
  if (byInstrument === "1") {
    if (typeof aidInstrument !== "undefined") {
      conditions.push("aid_instrument_ID = ?");
      values.push(byInstrument);
    }
  }

  if (conditions.length > 0) {
    var conditions = " WHERE " + conditions.join(" AND ");
  } else {
    var conditions = "";
    var values = null;
  }

  var sql = "SELECT * FROM " + table + conditions + " LIMIT " + limit + " OFFSET " + offset;

  databaseConnection.query (sql, values, function(err, json) {
    if (err) {
      queryResult("error", err);
    } else {
      if(download === "1") {
        const csv = downloadResource(json);
        queryResult("csv", csv);
      } else {
        queryResult("json", json);
      }
    }
  });
};

module.exports = model;

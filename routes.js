const twilio = require("./serverJS/twilio");
const VoiceResponse = require("twilio").twiml.VoiceResponse;

// Internal Libs
const asyncErrorWrapper = require("./serverJS/asyncErrorWrapper");

// Expose the routes to our app with module.exports
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  const freezeCredit = async (req, res) => {
    try {
      const postData = {
        twilio_phone_number: req.body.twilio_phone_number,
        twilio_account_sid: req.body.twilio_account_sid,
        twilio_auth_token: req.body.twilio_auth_token,
        tu_url: req.body.tu_url,
        ef_url: req.body.ef_url,
        exp_url: req.body.exp_url,
        zip_code: req.body.zip_code,
        street_number: req.body.street_number,
        state: req.body.state,
        ssn: req.body.ssn,
        dob: req.body.dob,
        cc_number: req.body.cc_number,
        cc_exp: req.body.cc_exp,
        cc_type: req.body.cc_type,
        security_pin: req.body.security_pin
      };

      console.log(postData);

      // TU
      const tuData = {
        twilio_phone_number: postData.twilio_phone_number,
        twilio_auth_token: postData.twilio_auth_token,
        twilio_account_sid: postData.twilio_account_sid,
        tu_url: postData.tu_url,
        ZipCode: postData.zip_code,
        SSN: postData.ssn,
        DOB: postData.dob,
        StreetNumber: postData.street_number,
        SecurityPin: postData.security_pin,
        CcNum: postData.cc_number,
        CcExp: postData.cc_exp
      };
      const call1 = await twilio.call_TU(req, tuData);
      console.log("Returned TU Call ID: ", call1.sid);

      // EF
      const efData = {
        twilio_phone_number: postData.twilio_phone_number,
        twilio_auth_token: postData.twilio_auth_token,
        twilio_account_sid: postData.twilio_account_sid,
        ef_url: postData.ef_url,
        State: postData.state,
        SSN: postData.ssn,
        StreetNumber: postData.street_number + "w%23" // # urlencoded becomes %23, w is 0.5s wait
      };
      const call2 = await twilio.call_EF(req, efData);
      console.log("Returned EF Call ID: ", call2.sid);

      // EXP
      const expData = {
        twilio_phone_number: postData.twilio_phone_number,
        twilio_auth_token: postData.twilio_auth_token,
        twilio_account_sid: postData.twilio_account_sid,
        exp_url: postData.exp_url,
        SSN: postData.ssn + "w%23",
        DOB: postData.dob,
        ZipCode: postData.zip_code + "w%23",
        StreetNumber: postData.street_number + "w%23",
        CardType: postData.cc_type,
        CcNum: postData.cc_number + "w%23",
        CcExp: postData.cc_exp + "w%23"
      };
      const call3 = await twilio.call_EXP(req, expData);
      console.log("Returned EXP Call ID: ", call3.sid);

      return res.status(200).json({
        error: false
      });
    } catch (err) {
      return asyncErrorWrapper.handleError(err, req, res);
    }
  };
  app.post("/freezeCredit", asyncErrorWrapper.errorChecking(freezeCredit));
};

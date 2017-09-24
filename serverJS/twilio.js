const Twilio = require("twilio");

const call_TU = async function(req, data) {
  try {
    const client = new Twilio(data.twilio_account_sid, data.twilio_auth_token);
    const transU_BASE_URL = data.tu_url;
    const reqURL =
      `${transU_BASE_URL}?ZipCode=${data.ZipCode}&SSN=${data.SSN}` +
      `&DOB=${data.DOB}&StreetNumber=${data.StreetNumber}&SecurityPin=${data.SecurityPin}` +
      `&CcNum=${data.CcNum}&CcExp=${data.CcExp}`;
    try {
      const call = await client.api.calls.create({
        url: reqURL,
        to: "+18889098872", // Number being called
        from: "+1" + data.twilio_phone_number, // Twilio Number
        record: "true"
      });
      return Promise.resolve(call);
    } catch (err) {
      return Promise.reject(err);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const call_EF = async function(req, data) {
  try {
    const client = new Twilio(data.twilio_account_sid, data.twilio_auth_token);
    const equiF_BASE_URL = data.ef_url;
    const reqURL = `${equiF_BASE_URL}?State=${data.State}&SSN=${data.SSN}&StreetNumber=${data.StreetNumber}`;
    try {
      const call = await client.api.calls.create({
        url: reqURL,
        to: "+18006851111", // Number being called
        from: "+1" + data.twilio_phone_number, // Twilio Number
        record: "true"
      });
      return Promise.resolve(call);
    } catch (err) {
      return Promise.reject(err);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const call_EXP = async function(req, data) {
  try {
    const client = new Twilio(data.twilio_account_sid, data.twilio_auth_token);
    const exp_BASE_URL = data.exp_url;
    const reqURL =
      `${exp_BASE_URL}?SSN=${data.SSN}&DOB=${data.DOB}&ZipCode=${data.ZipCode}` +
      `&StreetNumber=${data.StreetNumber}&CardType=${data.CardType}&CcNum=${data.CcNum}&CcExp=${data.CcExp}`;
    try {
      const call = await client.api.calls.create({
        url: reqURL,
        to: "+18883973742", // Number being called
        from: "+1" + data.twilio_phone_number, // Twilio Number
        record: "true"
      });
      return Promise.resolve(call);
    } catch (err) {
      return Promise.reject(err);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  call_TU: call_TU,
  call_EF: call_EF,
  call_EXP: call_EXP
};

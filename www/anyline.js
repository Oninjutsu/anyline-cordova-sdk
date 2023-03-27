/**
 * anyline.js
 *
 * Copyright 2019 Anyline Inc.
 * MIT licensed
 */

/**
 * This class exposes anyline scanning functionality to JavaScript.
 *
 * @constructor
 */
function Anyline() {

/**
 * Scan a credit card with card.io.
 *
 *
 * @parameter options: an object; may be {}. Sample options object:
 *   {licenseKey: '', config: {...}}
 *
 * @parameter onSuccess: a callback function that accepts a response object; response keys
 * include ...
 *
 * @parameter onFailure: a zero argument callback function that will be called if the user
 * cancels card scanning.
 */



  function onSuccess (result) {
    // this is called for every energy scan result
    // the result is a json-object containing the reading, some metadata,
    // and paths to a cropped and a full image.

    // for this use case, expect either a result from a meter plugin or an ocr plugin
    // each of which needs to be accessed differently.
    var resultText = "";
    if (result.meterResult) {
      resultText = result.meterResult.value;
    } else if (result.ocrResult) {
      resultText = result.ocrResult.text;
    }    
    insertScanResult(result, resultText);
  },

  function onError(error) {
    if (error == "Canceled") {
      // do stuff when user has canceled
      // this can be used as an indicator that the user finished the scanning if canclelOnResult is false
      console.log("Energy scanning canceled");
      return;
    }

    alert(error);
  },

  function scan(scanMode) {
  
    console.log("start scan with mode " + scanMode);

    // start the Energy scanning for the given scan mode
    // pass the success and error callbacks, as well as the license key and the config to the plugin
    // see http://documentation.anyline.io/#anyline-config for config details
    // and http://documentation.anyline.io/#energy for energy-module details
    var config = this.meterConfig;
    var licensekey = this.licensekey;
    cordova.exec(this.onResult, this.onError, "AnylineSDK", "scan", [licensekey, config]);
  },

  licenseKey: "ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0xMiIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMuY29yZG92YSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlcy5jb3Jkb3ZhIgogIF0KfQpxUWxkWFVhSVBHaWhUWlVPL3ljSS9rR0UxcXJ5ZEs1cFh4UUJybk81TFZDaExlK1V3N0tGRkNMNnFSNnptUUVMdG1zVkUxZXJORHdYMW5XY3JtdlhKTFd4N2pjc2l3YXc3SUdubCtQRnd1NnpzS3ZjTTNWMk1peFRDZVBodUQrMzFRRTh1ZE84ZTdYS0NGa0lYd3BwOWdTYk03dDBqYitoTWc2S0dPd0dCVElnajIzVzdFZGdRaGlmZ2tOMGYxMHB4SWVZVzFBK21wcjQ1bTA2Ujc2dWZxSXhsc0lnVDhKbjFKV2haczFWOUFwR25zWUU4c3lVcnZuTXQvaTVvWTJ4YUpZdGE4cnJUZ0Rnc1ZHcUhvNjNrWTVQTllyNlRTWnRNcDBJTDFxTlFIakgrR1loQitIZm9hRzBLVXRkcTVsYW5mU2RESEpzV2F4NUtTQ01OdVNOZUE9PQ==",

  meterConfig:{
  "camera":{
    "captureResolution" : "720p"
  },
  "flash" : {
    "mode" : "manual",
    "alignment" : "bottom"
  },
  "viewPlugin" : {
    "plugin" : {
      "id" : "METER_ID",
       "meterPlugin": {
          "scanMode": "AUTO_ANALOG_DIGITAL_METER"
        }
    },
    "cutoutConfig" : {
      "style" : "rect",
      "alignment" : "top_half",
      "strokeWidth" : 2,
      "strokeColor" : "FFFFFF",
      "cornerRadius" : 4,
      "outerColor" : "000000",
      "outerAlpha" : 0.5,
      "feedbackStrokeColor" : "0099FF"
    },
    "scanFeedback" : {
      "style" : "CONTOUR_RECT",
      "strokeColor" : "0099FF",
      "fillColor" : "220099FF",
      "blinkOnResult": true,
      "beepOnResult": true,
      "vibrateOnResult": true
    },
    "cancelOnResult" : true
  };

};


module.exports = new Anyline();

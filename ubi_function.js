// Import the 'axios' library so we can make HTTP request from the function
var axios = require("axios");
 
// Define Ubidots constant
const UBI_TOKEN = "BBFF-xxxxxxx"; // Assign your Ubidots account
const UBI_URL = "https://industrial.api.ubidots.com/api/v1.6";
 
// Main function - runs every time the function is executed.
// "args" is a dictionary containing both the URL params and the HTTP body (for POST requests).
async function main(args) {
  var data = {};

  var devID = args['end_device_ids']['device_id']; 
  var payload = args['uplink_message']['decoded_payload'];
  
  console.log(devID);
  console.log(payload);

  // Send data to Ubiodpts variables' values to Ubidots
  var req = await ubidotsDataUpdate(UBI_TOKEN, devID, payload);
  
  return {"status": req};
}
 
/*
* Handle a POST request to Ubidots API
* API Documentation: https://ubidots.com/docs/sw/
*
* @arg token [Mandatory], Ubidots account's Token
* @arg deviceLabel [Mandatory], single and unique label of device
* @arg payload [Mandatory], variables and values to be sent in a JSON format
*
* @return response/error, request response
*/
async function ubidotsDataUpdate(token, deviceLabel, payload) {
 
 var endpoint = UBI_URL.concat("/devices/" + deviceLabel);
  return axios.post(endpoint, payload, {
   headers: {
     "content-type": "application/json",
     "X-Auth-Token": token
   }
 })
 .then(function (response) {
   return response.statusText;
 })
 .catch(function (error) {
   return error.response.status;
 });
}
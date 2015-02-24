
    Node.js client for First Data Global Gateway [e4 api](https://firstdata.zendesk.com/entries/407571-First-Data-Global-Gateway-e4-Web-Service-API-Reference-Guide).

# Outline


# Overview

Trying to provide a well documented & tested interaction with the First Data api. I have found many things that are undocumented and inconsistent hence the need for a place to gather some sanity.

Main goal is to provide proper handling for the various responses ([first data gateway](https://firstdata.zendesk.com/entries/451980-ecommerce-response-codes-etg-codes) & [banks](https://firstdata.zendesk.com/entries/471297-First-Data-Global-Gateway-e4-Bank-Response-Codes)).

Focus is on version 12+ by implementing the required [SHA-1 HMAC hash](https://firstdata.zendesk.com/entries/22069302-api-security-hmac-hash) security protocol. It should work with prior versions v9+ but currently not tested.

Some error codes are currently "untestable" within the integration test environment. This library covers significantly more response types then what is listed in the documentation or any other library. Many undocumented responses have been found thus far. (See Test section for more info).

# Features

* 100% test coverage
* Over 300 integration tests.
* Insane Error Handling
  * 25 undocumented gateway response codes
  * 33 undocumented bank response codes
  * 23 bank responses with different names then in docs.
  * 8 Additional custom codes to handle quirks.
* Reporting & Search API
* International Support: ~250 countries, ~150 currencies
* Accept: AmEx, Visa, Mastercard, Discover, Diners Club, JCB
* Magnetic Swipe (card in hand) support via api
* [TransArmor Tokenization](https://firstdata.zendesk.com/entries/21303361-TransArmor-Tokenization-) - token system that replaces CC numbers, greatly reducing your PCI requirements.
* Pre Authorization
* Partial Settlements - Charge what is available (not all or nothing)
* Recurring Billing
* Check processing with v13+
* Paypal Integration
* Gift Cards along with Virtual Gift Cards (must setup with your account)
* Soft Descriptors - ability to change processor info (must setup)
* 3-D Secure - optional extended security level ([registration](https://registration.altpayfirstdata.com))
* Payment Type classification (ecommerce flag) - helps with rates
* Fine grain control over Fraud handling
* Level II & III processing options - ability to reduce rates and meet requirements of governments contracts.
* 3rd Party Processing options (Partner ID) v14+
* 24/7/365 instant live person support


# Installation

```bash
  npm install firstdata
```


# Setup

Test Accounts are automatically provisioned, will remain active for 90 days with no activity. If you want a live account you must contact [First Data](http://www.firstdata.com/) directly.

* Setup a Test Account: http://www.firstdata.com/gg/apply_test_account.htm
* Receive email with credential
* Login to [Admin](https://demo.globalgatewaye4.firstdata.com/?lang=en)**
* Go to the ["Terminal Section"](https://demo.globalgatewaye4.firstdata.com/terminal)
* Click on the ECOMM Terminal it should expand (horrible ui).
* In the `Details` tab record:
  * GatewayID
  * Password (click generate) - This is NOT the same password as your admin login
  * Create a Transarmor Token (4 characters)
  * Check `Allow Soft Descriptors`
  * Select `Support Level 2 Data and Level 3 Data`
* In the `Api` tab record:
  * KeyId
  * HMAC (click generate)
  * make sure to hit the update button on the very bottom of the screen or else changes aren't saved.

** Note: You need to use Firefox for the login to work for some reason :(


# Usage

```js

  var firstdata = require('firstdata')
    , client = firstdata.createClient({
        name: 'application name'
      , version: 12
      , key: '<your key id>'
      , gateway_id: '<your gateway id>'
      , password: '<password>'
      , hmac: '<hmac string>'
      , timeout: 3000
      , admin: {username: '<username>', password: '<password>'} // search & report api
      , sandbox: true });

  client.purchase({
    cardholder_name: "John Doe"
  , cc_number: "4111111111111111"
  , cc_expiry: "0515"
  , amount: "38.95"
  }, function(err, resp){
    // See api below
  });

```

# API

## firstdata.Client

Class for creating a First Data api client.

## firstdata.Response

Class for creating a First Data response object. A `Client` instance  automatically return this. See [Response Instance]()

## firstdata.createClient(options, defaults)

Wrapper to create a `firstdata.Client` instance.

**options**:

* `name`: name of your app - this shows up in the Admin Logs (optional, default="API-ExactID")
* `version`: version of the api to use - valid values 8-14 (optional, default=12)
* `key`: your keyID from admin for terminal you want to use (required)
* `gateway_id`: your GatewayID from admin (required)
* `password`: your terminal password - not your admin console login (required)
* `hmac`: your HMAC generated string from admin console (required)
* `timeout`: Prevent inactive sockets from hanging. Defaults to 3000ms (3 secs).
* `admin`: optional object. Required to use search and report api.
  * `username`: username to login to your dashboard
  * `password`: password for account
  * `version`: 2 or 3. (optional). defaults to 3.
* `sandbox`: BOOL - if true uses testing environment (optional, default=false)

**defaults**:

Properties you would like to have set automatically with every transaction. Only a few actually make sense, for example:

```js
  {
    cvd_presence_ind: 1 // handling of CVV2
  , language: 'FR'
  , currency_code: 'EUR'
  , ecommerce_flag: 5 // Secure Electronic Commerce Transaction
  , soft_descriptor: {
        dba_name: "Doing Business As Company Name"
      , street: "123 Main St."
      , city: "Somewhere"
      , region: 'CA'
      , postal_code: '90120'
      , country_code: 'US'
    }
  }
```

__Note__: `gateway_id` & `password` are required for every transaction and are automatically added to defaults. If name is defined in options it is also passed to defaults as `user_name` helpful for filtering searches and aggergating reports.

Returns an instance of `Client`

### firstdata.isCountry(code)

Checks if a country code is

### firstdata.getCountry(code)

### firstdata.isCurrency(code)

### firstdata.getCurrency(code)

### firstdata.isUnit(code)

### firstdata.getUnit(code)

### firstdata.isTax(code)

### firstdata.getTax(code)


## Client Instance

FirstData has several different types of transactions.

* `Regular` - Credit Card
* `PayPal` - PayPal
* `ValueLink` - FirstData physical and virtual gift cards.
* `TransArmor` - Token Replacement for easier PCI compliance
* `TeleCheck` - Check processing



### client.send(transaction_type, payload, callback)

Generic wrapper for the API.

**transaction_type:** {String}

* `00` : Purchase
* `01` : Pre-Authorization
* `02` : Pre-Authorization Completion (Recommend 32 instead)
* `04` : Refund
* `13` : Void
* `32` : Tagged Pre-Authorization Completion
* `33` : Tagged Void
* `34` : Tagged Refund
* `07` : PayPal Order
* `83` : CashOut - Gift Card
* `85` : ValueLink Activation - Gift Card
* `86` : Balance Inquiry - Gift Card
* `88` : Reload - Gift Card
* `89` : ValueLink Deactivation - Gift Card

### client.purchase(payload, callback)

`transaction_type` is automatically added to request as '00'.

Regular Transaction required fields:

* `amount`
* `cardholder_name`
* `cc_number`
* `cc_expiry`

ValueLink Transaction required fields:

* `amount`
* `cardholder_name`
* `cc_number`
* `credit_card_type` = 'Gift'

TransArmor Transaction required fields:

* `amount`
* `cardholder_name`
* `transarmor_token`
* `cc_expiry`
* `credit_card_type` = "American Express", "Visa", "Mastercard", "Discover", "Diners Club", "JCB", "Gift Card", "PayPal"



### client.preauth(payload, callback)

### client.preauthcomplete(payload, callback)

### client.forcedPost(payload, callback)

### client.refund(payload, callback)

### client.preauthOnly(payload, callback)

### client.paypalOrder(payload, callback)

### client.void(payload, callback)

### client.taggedPreauthComplete(payload, callback)

### client.taggedVoid(payload, callback)

### client.taggedRefund(payload, callback)

### client.cashout(payload, callback)

### client.activation(payload, callback)

### client.balanceInquiry(payload, callback)

### client.reload(payload, callback)

### client.deactivation(payload, callback)


## Response Instance

__This object is frozen and read-only (immutable).__ : Trying to mutate will throw a `TypeError`

With the exception of `search` & `report` all methods return an instance of `FirstDataResponse`.

It is important to note that regardless of errors `gateway` & `bank` responses are set. The following are the defaults if not found in response.

* `gateway`: is set to `40` (Unable to Connect)
* `bank`: is set to `000` (No Answer)

### Properties

* `req_headers`: {Object} HTTP headers users for the request.
* `payload`: {String} Serialized JSON data sent to FirstData.
* `headers`: {Object} HTTP headers received from FirstData response.
* `raw`: {String} Original response body, regardless of parse errors.
* `data`: {Object} Parsed body. See [FirstData API docs](https://firstdata.zendesk.com/entries/407571-First-Data-Global-Gateway-e4-Web-Service-API-Reference-Guide) for more info.
* `statusCode`: {String} HTTP response status code.
* `error`: {Error} - Could be undefined if no error occurred. ** See note below.
* `gateway` {Object}
  * `code`: {String} FirstData Gateway response code
  * `message`: {String} Message explaining code.
* `bank` {Object}
  * `code`: {String} Bank response code.
  * `type`: {String} Type of response. * See type table
  * `name`: {String} Name of response
  * `action`: {String} Action to take with response code. * See action table
  * `description`: {String} Description of response.
  * `actual`: {String} (optional). This is the actual response name if it differs from FirstData documentation.

__Bank Response Types__

* `S`: Successful
* `R`: Reject
* `D`: Decline
* `R\D`: Reject or Decline
* `U`: Unknown/Undocumented. Action is automatically set to 'Call'.

__Bank Response Actions__

* `Resend`: Send this transaction back at any time.
* `Wait`: Wait 2-3 days before sending back, or try to resolve with your customer
* `Cust`: Try to resolve with customer, or get an alternate method of payment
* `Fix`: There is an invalid field being sent Fix and resend.
* `N/A`: Not applicable
* `Voice`: Perform a voice authorization per First Data instructions.
* `Call`: Call First Data.

### Errors

`FirstDataResponse` will explicitly create special error objects if the transactions don't meet specific criteria.

* If a network error occurs from `https.request` then the error object is return. (connection reset, socket timeout, unable to connect).
* If no network error and gateway response != `00` then a `ResponseError` is created.
* If no network error or `ResponseError` and `isSuccessful` == {false} then a `BankError` is created.

#### ResponseError

Inherits from `Error`

```js
var ResponseError = require('firstdata').errors.ResponseError;
var err = new ResponseError(obj);

err instanceof ResponseError; // true
err instanceof Error; // true
```

__Properties__

* `name`: 'FirstDataResponseError'
* `code`: gateway response code
* `message`: message for code

#### BankError

Inherits from `Error`

```js
var BankError = require('firstdata').errors.BankError;
var err = new BankError(obj);

err instanceof BankError; // true
err instanceof Error; // true
```

__Properties__

* `name`: 'FirstDataBankResponseError'
* `code`: bank response code
* `type`: type of response code (see chart below)
* `action`: action to perform on response (see below)
* `message`: message for code
* `description`: description about the error code

### Methods

#### response.isError

#### response.isSuccessful

Returns true if gateway code = `00` and bank response type = 'S'.

#### response.isApproved

Requires the bank response to be `S` (successful). In addition the payload must contain field `transaction_approved` set to 1.

It is important to note that several bank responses will be successful yet will not pass the `isApproved` test like (164) - 'Conditional Approval - Hold shipping for 24 hours'.


## Search

First Data returns csv. This

```js
  var search = firstdata.search({
    start_date: '2014-07-12'
  , end_date: '2014-07-15' }, function(err, data){

  });

```


```js

  var search = firstdata.search({
    start_date: '2014-07-12'
  , end_date: '2014-07-15' });

  search.on('data', function(data){

  });

  search.on('close', function(){

  });

  search.on('error', function(err){

  });

```


## Report

## POS (Card in Hand)

This section describes how to use a magnetic card reader with the api.

** TODO **

## TeleCheck

** TODO **

## ValueLink (Gift Cards)

** TODO **

## PayPal

** TODO **

## Testing

The majority of the tests are integration tests with FirstData E4 Gateway. In order to test you must do the following:

* Setup a Test account (see Setup)
* Install mocha globally `npm install mocha -g`
* Create `test/config.json` example:

```js
{
  "name": "test-api"
, "hmac": "<HMAC>"
, "key": "<KEY>"
, "gateway_id": "<GATEWAY_ID>"
, "password": "<API_PASSWORD>"
, "sandbox": true
, "admin": { "username": "<USERNAME>", "password": "<PASSWORD>"}
}
```

__Run Tests__  with `npm test` or `mocha`



### Untestable

# Resources

## API Documentation

* [Web API Reference Guide](https://firstdata.zendesk.com/entries/407571-First-Data-Global-Gateway-e4-Web-Service-API-Reference-Guide)
* [Search and Reporting API](https://firstdata.zendesk.com/entries/407573-First-Data-Global-Gateway-e4-Web-Service-Transaction-Search-and-Reporting-API)

## Codes

* [Gateway Response Codes](https://firstdata.zendesk.com/entries/451980-eCommerce-Response-Codes-ETG-e4-Transaction-Gateway-Codes-)
* [Bank Response Code](https://firstdata.zendesk.com/entries/471297-First-Data-Global-Gateway-e4-Bank-Response-Codes)
* [CVV codes](https://firstdata.zendesk.com/entries/407652-cvv2-cvd-cvv-cid-response-codes)
* [AVS Codes](https://firstdata.zendesk.com/entries/407660-what-are-the-avs-response-codes)
* [HTTP Status codes](https://firstdata.zendesk.com/entries/407572-transaction-processing-api-error-numbers-and-descriptions)
* [Country Codes](https://firstdata.zendesk.com/entries/23105182-ISO-Country-Codes)
* [Currency Codes](https://firstdata.zendesk.com/entries/61756929-GGe4-Supported-Currencies)
* [CVV Codes](https://firstdata.zendesk.com/entries/407652-cvv2-cvd-cvv-cid-response-codes)
* [E-Commerce Flag Codes](https://firstdata.zendesk.com/entries/21531261-ecommerce-flag-values)
* [Tax Types](https://firstdata.zendesk.com/entries/23395483-Tax-Type)
* [Unit of Measure](https://firstdata.zendesk.com/entries/23393247-Units-of-Measure)


## Testing

* [Generating Unsuccessful Transactions](https://firstdata.zendesk.com/entries/407657-How-to-generate-unsuccessful-transactions-during-testing-)
* [CVV testing](https://firstdata.zendesk.com/entries/407655-How-to-test-CVD-CVV-CVV2-functionality)
* [AVS Testing](https://firstdata.zendesk.com/entries/23872458-How-to-test-AVS-Response-Codes-in-Demo)
* [Test Credit Cards](https://firstdata.zendesk.com/entries/407651-using-test-credit-card-numbers)

## Setup

* [FirstData Test Account Setup](http://www.firstdata.com/gg/apply_test_account.htm)
* [Setup Secure 3D](https://registration.altpayfirstdata.com/)

## Other

* [Security Hashing](https://firstdata.zendesk.com/entries/22069302-API-Security-HMAC-Hash)


# License

(The MIT License)

Copyright (c) 2015 Nathan White <nw@nwhite.net>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## First Data Global Gateway E4 - Payment Gateway

This is to support First Data Global Gateway [e4 api](https://firstdata.zendesk.com/entries/407571-First-Data-Global-Gateway-e4-Web-Service-API-Reference-Guide).

### Overview

Right now this project aims to be a well documented and tested thin layer around the First Data api. I have found many things that are undocumented and inconsistent hence the need for a place to gather some sanity.

Main purpose to provide proper handling of all the different error responses ([first data](https://firstdata.zendesk.com/entries/451980-ecommerce-response-codes-etg-codes) & [banks](https://firstdata.zendesk.com/entries/471297-First-Data-Global-Gateway-e4-Bank-Response-Codes)).

This library is specifically designed around the v12+ [SHA-1 HMAC hash](https://firstdata.zendesk.com/entries/22069302-api-security-hmac-hash) security protocol. It should work with prior versions v8+ but currently not tested rigorously. 

I have found some error codes that are currently "untestable" with the current environment. However, this library covers significantly more response types then what is listed in the documentation or any other library. I'm working on expanding the coverage.


### Features

* TransArmor Transactions - token system that replaces CC numbers, greatly reducing your PCI requirements.
* Pre Authorization
* Partial Settlements - Charge what is available (not all or nothing)
* Recurring Billing
* Check processing with v13+
* International Support
* Paypal Integration
* Gift Cards along with Virtual Gift Cards (must setup with your account)
* Soft Descriptors - ability to change processor info (must setup)
* 3-D Secure - optional extended security level
* Payment Type classification (ecommerce flag) - helps with rates
* Accept: AmEx, Visa, Mastercard, Discover, Diners Club, JCB
* Fine grain control over Fraud handling
* Level II & III processing options - ability to reduce rates.
* 3rd Party Processing options (Partner ID) v14+


### Installation

```bash
  npm install firstdata
```


### Setup

Test Accounts are automatically provisioned, will remain active for 90 days with no activity. If you want a live account you must contact [First Data](http://www.firstdata.com/) directly.

* Setup a Test Account: http://www.firstdata.com/gg/apply_test_account.htm
* Receive email with credential
* Login to [Admin](https://demo.globalgatewaye4.firstdata.com/?lang=en)**
* Go to the ["Terminal Section"](https://demo.globalgatewaye4.firstdata.com/terminal)
* Click on the ECOMM Terminal it should expand (horrible ui).
* In the `Details` tab record:
  * GatewayID
  * Password (click generate) - This is NOT the same password as your admin login
* In the `Api` tab record:
  * KeyId
  * HMAC (click generate)
  * make sure to hit the update button on the very bottom of the screen or else changes aren't saved.

** Note: You need to use Firefox for the login to work for some reason :(


### Usage

```js

  var firstdata = require('firstdata)
    , client = firstdata.createClient({
        name: 'application name'
      , version: 12
      , key: '<your key id>'
      , gateway_id: '<your gateway id>'
      , password: '<password>'
      , hmac: '<hmac string>'
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

### API

#### firstdata.Client

Class for creating a First Data api client.

#### firstdata.Response

Class for creating a First Data response object. Client instances automatically return this.

#### firstdata.createClient(options, defaults)

**options**:

* `name`: name of your app - this shows up in the Admin Logs (optional, default="API-ExactID")
* `version`: version of the api to use - valid values 8-14 (optional, default=12)
* `key`: your keyID from admin for terminal you want to use (required)
* `gateway_id`: your GatewayID from admin (required)
* `password`: your terminal password - not your admin console login (required)
* `hmac`: your HMAC generated string from admin console (required)
* `sandbox`: BOOL - if true uses testing environment (optional, default=false)

**defaults**:

Properties you would like to have set automatically with every transaction. Only a few actually make sense, for example:

```js
  {
    cvd_presence_ind: 1 // handling of CVV2 
  , language: 'FR'
  , currency_code: 'EUR'
  , ecommerce_flag: 5 // Secure Electronic Commerce Transaction
  }
```

Returns an instance of `Client`

#### Client Instance

##### client.send(transaction_type, payload, callback)

##### client.purchase(payload, callback)

##### client.preauth(payload, callback)

##### client.preauthcomplete(payload, callback)

##### client.forcedPost(payload, callback)

##### client.refund(payload, callback)

##### client.preauthOnly(payload, callback)

##### client.paypalOrder(payload, callback)

##### client.void(payload, callback)

##### client.taggedPreauthComplete(payload, callback)

##### client.taggedVoid(payload, callback)

##### client.taggedRefund(payload, callback)

##### client.cashout(payload, callback)

##### client.activation(payload, callback)

##### client.balanceInquiry(payload, callback)

##### client.reload(payload, callback)

##### client.deactivation(payload, callback)



#### firstdata.isCountry(code)

#### firstdata.getCountry(code)

#### firstdata.isCurrency(code)

#### firstdata.getCurrency(code)

#### firstdata.isUnit(code)

#### firstdata.getUnit(code)

#### firstdata.isTax(code)

#### firstdata.getTax(code)


### Running Tests


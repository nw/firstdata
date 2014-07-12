// First Data Global Gateway e4 Bank Response Codes
// https://firstdata.zendesk.com/entries/471297-First-Data-Global-Gateway-e4-Bank-Response-Codes

// UNDOCUMENTED
// -------------
// 557 557 Transaction not approved
// 550 550 Closed Account, New Account Issued
// 551 551 Duplicate transaction
// 562 562 Re-authorization amount exceeded
// 560 560 Re-authorization
// 561 561 Re-authorization no match
// 564 564 Counter Offer
// 567 567 Pending Review
// 563 563 Re-authorization timeframes exceeded
// 765 765 Customer Advises Not Authorized
// 768 768 Bad Account Number Data
// 767 767 Invalid Account Number Format
// 764 764 Authorization Revoked by Consumer
// 756 756 Account Holder Deceased
// 772 772 Incorrect Length
// 763 763 Invalid Account Number
// 781 781 Invalid MICR Data
// 771 771 Decline Lost or Stolen Checks
// 786 786 Call Center  Call  EC  Call Center
// 757 757 Beneficiary Deceased
// 778 778 Refund greater than original amount
// 759 759 Customer Opt out
// 905 905 Stand in Rules

module.exports = {
  '000': { // can't test
    type: 'D',
    name: 'No Answer',
    action: 'Resend',
    description: 'First Data received no answer from auth network'
  },
  '100': {
    type: 'S',
    name: 'Approved',
    action: 'N/A',
    description: 'Successfully approved'
  },
  '101': {
    type: 'S',
    name: 'Validated',
    action: 'N/A',
    description: 'Account Passed edit checks'
  },
  '102': {
    type: 'S',
    name: 'Verified',
    action: 'N/A',
    description: 'Account Passed external negative file'
  },
  '103': {
    type: 'S',
    name: 'Pre-Noted',
    action: 'N/A',
    description: 'Passed Pre-Note'
  },
  '104': {
    type: 'S',
    name: 'No Reason to Decline',
    action: 'N/A',
    description: 'Successfully approved'
  },
  '105': {
    type: 'S',
    name: 'Received and Stored',
    action: 'N/A',
    description: 'Successfully approved'
  },
  '106': {
    type: 'S',
    name: 'Provided Auth',
    action: 'N/A',
    description: 'Successfully approved Note: Indicates customized code was used in processing'
  },
  '107': {
    type: 'S',
    name: 'Request Received',
    action: 'N/A',
    description: 'Successfully approved Note: Indicates customized code was used in processing'
  },
  '108': {
    type: 'S',
    name: 'Approved for Activation',
    action: 'N/A',
    description: 'Successfully Activated'
  },
  '109': {
    type: 'S',
    name: 'Previously Processed Transaction',
    action: 'N/A',
    description: 'Transaction was not re-authorized with the Debit Network because it was previously processed'
  },
  '110': {
    type: 'S',
    name: 'BIN Alert',
    action: 'N/A',
    description: 'Successfully approved Note: Indicates customized code was used in processing'
  },
  '111': {
    type: 'S',
    name: 'Approved for Partial',
    action: 'N/A',
    description: 'Successfully approved Note: Indicates customized code was used in processing'
  },
  '164': {
    type: 'S',
    name: 'Conditional Approval',
    action: 'Wait',
    description: 'Conditional Approval - Hold shipping for 24 hours'
  },
  '201': {
    type: 'R',
    name: 'Invalid CC Number',
    action: 'Cust',
    description: 'Bad check digit, length, or other credit card problem'
  },
  '202': {
    type: 'R',
    name: 'Bad Amount Nonnumeric Amount', // Bad Amount
    action: 'If',
    description: 'Amount sent was zero, unreadable, over ceiling limit, or exceeds maximum allowable amount.'
  },
  '203': {
    type: 'R',
    name: 'Zero Amount',
    action: 'Fix',
    description: 'Amount sent was zero'
  },
  '204': {
    type: 'R',
    name: 'Other Error',
    action: 'Fix',
    description: 'Unidentifiable error'
  },
  '205': {
    type: 'R',
    name: 'Bad Total Auth Amount',
    action: 'Fix',
    description: 'The sum of the authorization amount from extended data information does not equal detail record authorization Amount. Amount sent was zero, unreadable, over ceiling limit, or exceeds Maximum allowable amount.'
  },
  '218': {
    type: 'R',
    name: 'Invalid SKU Number',
    action: 'Fix',
    description: 'Non‐numeric value was sent'
  },
  '219': {
    type: 'R',
    name: 'Invalid Credit Plan',
    action: 'Fix',
    description: 'Non‐numeric value was sent'
  },
  '220': {
    type: 'R',
    name: 'Invalid Store Number',
    action: 'Fix',
    description: 'Non‐numeric value was sent'
  },
  '225': {
    type: 'R',
    name: 'Invalid Field Data',
    action: 'Fix',
    description: 'Data within transaction is incorrect'
  },
  '227': {
    type: 'R',
    name: 'Missing Companion Data',
    action: 'Fix',
    description: 'Specific and relevant data within transaction is absent'
  },
  '229': {
    type: 'R',
    name: 'Percents do not total 100',
    action: 'Fix',
    description: 'FPO monthly payments do not total 100 Note: FPO only'
  },
  '230': {
    type: 'R',
    name: 'Payments do not total 100',
    action: 'Fix',
    description: 'FPO monthly payments do not total 100 Note: FPO only'
  },
  '231': {
    type: 'R',
    name: 'Invalid Division Number',
    action: 'Fix',
    description: 'Division number incorrect'
  },
  '233': {
    type: 'R',
    name: 'Does not match MOP',
    action: 'Fix',
    description: 'Credit card number does not match method of payment type or invalid BIN'
  },
  '234': {
    type: 'R',
    name: 'Duplicate Order Number',
    action: 'Fix',
    description: 'Unique to authorization recycle transactions. Order number already exists in system Note: Auth Recycle only'
  },
  '235': {
    type: 'R',
    name: 'FPO Locked',
    action: 'Resend',
    description: 'FPO change not allowed Note: FPO only'
  },
  '236': {
    type: 'R',
    name: 'Auth Recycle Host System Down',
    action: 'Resend',
    description: 'Authorization recycle host system temporarily unavailable Note: Auth Recycle only'
  },
  '237': {
    type: 'R',
    name: 'FPO Not Approved',
    action: 'Call',
    description: 'Division does not participate in FPO. Contact your First Data Representative for information on getting set up for FPO Note: FPO only'
  },
  '238': {
    type: 'R',
    name: 'Invalid Currency',
    action: 'Fix',
    description: 'Currency does not match First Data merchant setup for division'
  },
  '239': {
    type: 'R',
    name: 'Invalid MOP for Division',
    action: 'Fix',
    description: 'Method of payment is invalid for the division'
  },
  '240': {
    type: 'R',
    name: 'Auth Amount for Division',
    action: 'Fix',
    description: 'Used by FPO'
  },
  '241': {
    type: 'R',
    name: 'Illegal Action',
    action: 'Fix',
    description: 'Invalid action attempted'
  },
  '243': {
    type: 'R',
    name: 'Invalid Purchase Level 3',
    action: 'Fix',
    description: 'Data is inaccurate or missing, or the BIN is ineligible for P‐card'
  },
  '244': {
    type: 'R',
    name: 'Invalid Encryption Format',
    action: 'Fix',
    description: 'Invalid encryption flag. Data is Inaccurate.'
  },
  '245': {
    type: 'R',
    name: 'Missing or Invalid Secure Payment Data',
    action: 'Fix',
    description: 'Visa or MasterCard authentication data not in appropriate Base 64 encoding format or data provided on A non‐e‐Commerce transaction.'
  },
  '246': {
    type: 'R',
    name: 'Merchant not MasterCard Secure code Enabled',
    action: 'Call',
    description: 'Division does not participate in MasterCard Secure Code. Contact your First Data Representative for information on getting setup for MasterCard SecureCode.'
  },
  '247': {
    type: 'R',
    name: 'Check conversion Data Error',
    action: 'Fix',
    description: 'Proper data elements were not sent'
  },
  '248': {
    type: 'R',
    name: 'Blanks not passed in reserved field',
    action: 'Fix',
    description: 'Blanks not passed in Reserved Field'
  },
  '249': {
    type: 'R',
    name: 'Invalid (MCC)',
    action: 'Fix',
    description: 'Invalid Merchant Category (MCC) sent'
  },
  '251': {
    type: 'R',
    name: 'Invalid Start Date',
    action: 'Fix',
    description: 'Incorrect start date or card may require an issue number, but a start date was submitted.'
  },
  '252': {
    type: 'R',
    name: 'Invalid Issue Number',
    action: 'Fix',
    description: 'Issue number invalid for this BIN.'
  },
  '253': {
    type: 'R',
    name: 'Invalid Tran. Type',
    action: 'Fix',
    description: 'If an “R” (Retail Indicator) is sent for a transaction with a MOTO Merchant Category Code (MCC)'
  },
  '257': {
    type: 'R',
    name: 'Missing Cust Service Phone',
    action: 'Fix',
    description: 'Card was authorized, but AVS did not match. The 100 was overwritten with a 260 per the merchant’s request Note: Conditional deposits only'
  },
  '258': {
    type: 'R',
    name: 'Not Authorized to Send Record',
    action: 'Call',
    description: 'Division does not participate in Soft Merchant Descriptor. Contact your First Data Representative for information on getting set up for Soft Merchant Descriptor.'
  },
  '260': {
    type: 'D',
    name: 'Soft AVS',
    action: 'Cust.',
    description: 'Authorization network could not reach the bank which issued the card'
  },
  '261': {
    type: 'R',
    name: 'Account Not Eligible For Divisions Setup',
    action: 'N/A',
    description: 'Account number not eligible for division’s Account Updater program setup'
  },
  '262': {
    type: 'R',
    name: 'Authorization Code Response Date Invalid',
    action: 'Fix',
    description: 'Authorization code and/or response date are invalid. Note: MOP = MC, MD, VI only'
  },
  '263': {
    type: 'R',
    name: 'Partial Authorization Not Allowed or Partial Authorization Request Note Valid', // Partial Authorization Not Allowed
    action: 'Fix',
    description: 'Action code or division does not allow partial authorizations or partial authorization request is not valid.'
  },
  '264': {
    type: 'R',
    name: 'Duplicate Deposit Transaction',
    action: 'N/A',
    description: 'Transaction is a duplicate of a previously deposited transaction. Transaction will not be processed.'
  },
  '265': {
    type: 'R',
    name: 'Missing QHP Amount',
    action: 'Fix',
    description: 'Missing QHP Amount'
  },
  '266': {
    type: 'R',
    name: 'Invalid QHP Amount',
    action: 'Fix',
    description: 'QHP amount greater than transaction amount'
  },
  '274': {
    type: 'R',
    name: 'Transaction Not Supported',
    action: 'N/A',
    description: 'The requested transaction type is blocked from being used with this card. Note:&nbsp; This may be the result of either an association rule, or a merchant boarding option.'
  },
  '301': {
    type: 'D',
    name: 'Issuer unavailable',
    action: 'Resend',
    description: 'Authorization network could not reach the bank which issued the card'
  },
  '302': {
    type: 'D',
    name: 'Credit Floor',
    action: 'Wait',
    description: 'Insufficient funds'
  },
  '303': {
    type: 'D',
    name: 'Processor Decline',
    action: 'Cust.',
    description: 'Generic decline – No other information is being provided by the Issuer'
  },
  '304': {
    type: 'D',
    name: 'Not On File',
    action: 'Cust.',
    description: 'No card record, or invalid/nonexistent to account specified'
  },
  '305': {
    type: 'D',
    name: 'Already Reversed',
    action: 'N/A',
    description: 'Transaction previously reversed. Note: MOP = any Debit MOP, SV, MC, MD, VI only '
  },
  '306': {
    type: 'D',
    name: 'Amount Mismatch',
    action: 'Fix',
    description: 'Requested reversal amount does not match original approved authorization amount. Note: MOP = MC, MD, VI only'
  },
  '307': {
    type: 'D',
    name: 'Authorization Not Found',
    action: 'Fix',
    description: 'Transaction cannot be matched to an authorization that was stored in the database. Note: MOP = MC, MD, VI only'
  },
  '351': {
    type: 'R',
    name: 'TransArmor Service Unavailable',
    action: 'Resend',
    description: 'TransArmor Service temporarily unavailable.'
  },
  '352': {
    type: 'D',
    name: 'Expired Lock',
    action: 'Cust.',
    description: 'ValueLink - Lock on funds has expired.'
  },
  '353': // DOES NOT MATCH
  {
    type: 'R',
    name: 'TransArmor Invalid Token or PAN',
    action: 'Fix',
    description: 'TransArmor Service encountered a problem converting the given Token or PAN with the given Token Type.'
  },
  '354': // DOES NOT MATCH
  {
    type: 'R',
    name: 'TransArmor Invalid Result',
    action: 'Cust',
    description: 'TransArmor Service encountered a problem with the resulting Token/PAN.'
  },
  '401': {
    type: 'D',
    name: 'Call',
    action: 'Voice',
    description: 'Issuer wants voice contact with cardholder'
  },
  '402': {
    type: 'D',
    name: 'Default Call',
    action: 'Voice',
    description: 'Decline'
  },
  '501': {
    type: 'D',
    name: 'Pickup',
    action: 'Cust',
    description: 'Card Issuer wants card returned'
  },
  '502': {
    type: 'D',
    name: 'Lost/Stolen',
    action: 'Cust',
    description: 'Card reported as lost/stolen Note: Does not apply to American Express'
  },
  '503': {
    type: 'D',
    name: 'Fraud/ Security Violation',
    action: 'Cust',
    description: 'CID did not match Note: Discover only'
  },
  '505': {
    type: 'D',
    name: 'Negative File',
    action: 'Cust',
    description: 'On negative file'
  },
  '508': {
    type: 'D',
    name: 'Excessive PIN try',
    action: 'Cust',
    description: 'Allowable number of PIN tries exceeded'
  },
  '509': {
    type: 'D',
    name: 'Over the limit',
    action: 'Cust',
    description: 'Exceeds withdrawal or activity amount limit'
  },
  '510': {
    type: 'D',
    name: 'Over Limit Frequency',
    action: 'Cust',
    description: 'Exceeds withdrawal or activity count limit'
  },
  '519': {
    type: 'D',
    name: 'On negative file',
    action: 'Cust',
    description: 'Account number appears on negative file'
  },
  '521': {
    type: 'D',
    name: 'Insufficient funds',
    action: 'Cust',
    description: 'Insufficient funds/over credit limit'
  },
  '522': {
    type: 'D',
    name: 'Card is expired',
    action: 'Cust',
    description: 'Card has expired'
  },
  '524': {
    type: 'D',
    name: 'Altered Data',
    action: 'Fix',
    description: 'Altered Data\\Magnetic stripe incorrect'
  },
  '530': {
    type: 'D',
    name: 'Do Not Honor',
    action: 'Cust',
    description: 'Generic Decline – No other information is being provided by the issuer. Note: This is a hard decline for BML (will never pass with recycle attempts)'
  },
  '531': {
    type: 'D',
    name: 'CVV2/VAK Failure',
    action: 'Cust',
    description: 'Issuer has declined auth request because CVV2 or VAK failed'
  },
  '534': {
    type: 'D',
    name: 'Do Not Honor - High Fraud',
    action: 'Cust',
    description: 'The transaction has failed PayPal or Google Checkout risk models'
  },
  '570': {
    type: 'D',
    name: 'Stop payment order one time recurring/ installment',
    action: 'Fix',
    description: 'Cardholder has requested this one recurring/installment payment be stopped.'
  },
  '571': {
    type: 'D',
    name: 'Revocation of Authorization for All Recurring / Installments',
    action: 'Cust',
    description: 'Cardholder has requested all recurring/installment payments be stopped'
  },
  '572': {
    type: 'D',
    name: 'Revocation of All Authorizations – Closed Account',
    action: 'Cust',
    description: 'Cardholder has requested that all authorizations be stopped for this account due to closed account. Note: Visa only'
  },
  '580': {
    type: 'D',
    name: 'Account previously activated',
    action: 'Cust',
    description: 'Account previously activated'
  },
  '581': {
    type: 'D',
    name: 'Unable to void',
    action: 'Fix',
    description: 'Unable to void'
  },
  '582': {
    type: 'D',
    name: 'Block activation failed',
    action: 'Fix',
    description: 'Reserved for Future Use'
  },
  '583': {
    type: 'D',
    name: 'Block Activation Failed',
    action: 'Fix',
    description: 'Reserved for Future Use'
  },
  '584': {
    type: 'D',
    name: 'Issuance Does Not Meet Minimum Amount',
    action: 'Fix',
    description: 'Issuance does not meet minimum amount'
  },
  '585': {
    type: 'D',
    name: 'No Original Authorization Found',
    action: 'N/A',
    description: 'No original authorization found'
  },
  '586': {
    type: 'D',
    name: 'Outstanding Authorization, Funds on Hold',
    action: 'N/A',
    description: 'Outstanding Authorization, funds on hold'
  },
  '587': {
    type: 'D',
    name: 'Activation Amount Incorrect',
    action: 'Fix',
    description: 'Activation amount incorrect'
  },
  '588': {
    type: 'D',
    name: 'Block Activation Failed',
    action: 'Fix',
    description: 'Reserved for Future Use'
  },
  '589': {
    type: 'D',
    name: 'CVD Value Failure',
    action: 'Cust',
    description: 'Magnetic stripe CVD value failure'
  },
  '590': {
    type: 'D',
    name: 'Maximum Redemption Limit Met',
    action: 'Cust',
    description: 'Maximum redemption limit met'
  },
  '591': {
    type: 'D',
    name: 'Invalid CC Number',
    action: 'Cust',
    description: 'Bad check digit, length or other credit card problem. Issuer generated'
  },
  '592': {
    type: 'D',
    name: 'Bad Amount',
    action: 'Fix',
    description: 'Amount sent was zero or unreadable. Issuer generated'
  },
  '594': {
    type: 'D',
    name: 'Other Error',
    action: 'Fix',
    description: 'Unidentifiable error. Issuer generated'
  },
  '595': {
    type: 'D',
    name: 'New Card Issued',
    action: 'Cust',
    description: 'New Card Issued'
  },
  '596': {
    type: 'D',
    name: 'Suspected Fraud',
    action: 'Cust',
    description: 'Issuer has flagged account as suspected fraud'
  },
  '599': {
    type: 'D',
    name: 'Refund Not Allowed',
    action: 'N/A',
    description: 'Refund Not Allowed'
  },
  '602': {
    type: 'D',
    name: 'Invalid Institution Code',
    action: 'Fix',
    description: 'Card is bad, but passes MOD 10 check digit routine, wrong BIN'
  },
  '603': {
    type: 'D',
    name: 'Invalid Institution',
    action: 'Cust',
    description: 'Institution not valid (i.e. possible merger)'
  },
  '605': {
    type: 'D',
    name: 'Invalid Expiration Date',
    action: 'Cust',
    description: 'Card has expired or bad date sent. Confirm proper date'
  },
  '606': {
    type: 'D',
    name: 'Invalid Transaction Type',
    action: 'Cust',
    description: 'Issuer does not allow this type of transaction'
  },
  '607': {
    type: 'D',
    name: 'Invalid Amount',
    action: 'Fix',
    description: 'Amount not accepted by network. (This response is provided by the card issuer.)'
  },
  '610': {
    type: 'D',
    name: 'BIN Block',
    action: 'Cust',
    description: 'Merchant has requested First Data not process credit cards with this BIN'
  },
  '704': {
    type: 'S',
    name: 'FPO Accepted',
    action: 'N/A',
    description: 'Stored in FPO database'
  },
  '740': {
    type: 'R',
    name: 'Match Failed',
    action: 'Fix',
    description: 'Unable to validate the debit. Authorization Record - based on amount, action code, and MOP (Batch response reason code for Debit Only)'
  },
  '741': {
    type: 'R/D',
    name: 'Validation Failed',
    action: 'Fix',
    description: 'Unable to validate the Debit Authorization Record - based on amount, action code, and MOP (Batch response reason code for Debit Only)'
  },
  '750': {
    type: 'R/D',
    name: 'Invalid Transit Routing Number',
    action: 'Fix',
    description: 'EC - ABA transit routing number is invalid, failed check digit'
  },
  '751': {
    type: 'R/D',
    name: 'Transit Routing Number Unknown',
    action: 'Fix',
    description: 'Transit routing number not on list of current acceptable numbers.'
  },
  '752': {
    type: 'R',
    name: 'Missing Name',
    action: 'Fix',
    description: 'Pertains to deposit transactions only'
  },
  '753': {
    type: 'R',
    name: 'Invalid Account Type',
    action: 'Fix',
    description: 'Pertains to deposit transactions only'
  },
  '754': {
    type: 'R/D',
    name: 'Account Closed',
    action: 'Cust',
    description: 'Bank account has been closed For PayPal and GoogleCheckout – the customer’s account was closed / restricted'
  },
  '755': {
    type: 'R',
    name: 'Subscriber Number Does Not Exist', // No Account/Unable to Locate
    action: 'Cust',
    description: 'No Account/Unable to Locate'
  },
  '758': {
    type: 'R',
    name: 'Subscriber Number Not Active', // Account Frozen
    action: 'Cust',
    description: 'Account Frozen'
  },
  '760': {
    type: 'R/D',
    name: 'ACH Non-Participant',
    action: 'Cust',
    description: 'EC - Banking Institution does not accept ACH transactions'
  },
  '776': {
    type: 'D',
    name: 'Duplicate Check', // Duplicate Transaction
    action: 'Cust',
    descriptions: 'Duplicate Transaction'
  },
  '777': {
    type: 'D',
    name: 'Original transaction was not approved',
    action: 'Cust',
    description: 'Original not approved'
  },
  '787': {
    type: 'D',
    name: 'Rejected Code 3 (Risk)', // Decline High Risk
    action: 'Cust',
    description: 'Decline High Risk'
  },
  '788': {
    type: 'D',
    name: 'Refund or parial amount is > original sale amount',
    action: 'Fix',
    description: 'Refund Greater than original sale'
  },
  '802': {
    type: 'D',
    name: 'Positive ID',
    action: 'Voice',
    description: 'Issuer requires further information'
  },
  '806': {
    type: 'D',
    name: 'Restraint',
    action: 'Cust',
    description: 'Card has been restricted'
  },
  '811': {
    type: 'D',
    name: 'Invalid Security Code',
    action: 'Fix',
    description: 'American Express CID is incorrect'
  },
  '813': {
    type: 'D',
    name: 'Invalid PIN',
    action: 'Cust',
    description: 'PIN for online debit transactions is incorrect'
  },
  '825': {
    type: 'D',
    name: 'No Account',
    action: 'Cust',
    description: 'Account does not exist'
  },
  '833': {
    type: 'D',
    name: 'Invalid Merchant',
    action: 'Fix',
    description: 'Service Established (SE) number is incorrect, closed or Issuer does not allow this type of transaction'
  },
  '834': {
    type: 'R',
    name: 'Unauthorized User',
    action: 'Fix',
    description: 'Method of payment is invalid for the division'
  },
  '902': {
    type: 'D',
    name: 'Process Unavailable',
    action: 'Resend/ Call/ Cust.',
    description: 'System error/malfunction with Issuer For Debit – The link is down or setup issue; contact your First Data Representative.'
  },
  '903': {
    type: 'D',
    name: 'Invalid Expiration',
    action: 'Cust',
    description: 'Invalid or expired expiration date'
  },
  '904': {
    type: 'D',
    name: 'Invalid Effective', // Invalid
    action: 'Cust./ Resend',
    description: 'Card not active'
  },
  '997': {
    type: 'D',
    name: 'Acquirer Error', // Transaction not approved
    action: 'Call',
    description: 'Acquiring bank configuration problem. Contact your First Data representative.'
  }
}

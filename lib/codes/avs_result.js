
module.exports = {
  // North American Response Codes
  X : "exact match, 9 digit zip"
, Y : "exact match, 5 digit zip"
, A : "address match only"
, W : "9 digit zip match only"
, Z : "5 digit zip match only"
, N : "no address or zip match"
, U : "address unavailable"
, G : "non-North American issuer, does not participate"
, R : "issuer system unavailable"
, E : "not a Mail or Phone order"
, S : "service not supported"
, Q : "Bill to address did not pass edit checks"
, D : "International street address and postal code match"
, B : "International street address match, postal code not verified due to incompatable formats"
, C : "International street address and postal code not verified due to incompatable formats"
, P : "International postal code match, street address not verified due to incompatable format"
, 1 : "Cardholder name matches"
, 2 : "Cardholder name, billing address, and postal code match"
, 3 : "Cardholder name and billing postal code match"
, 4 : "Cardholder name and billing address match"
, 5 : "Cardholder name incorrect, billing address and postal code match"
, 6 : "Cardholder name incorrect, billing postal code matches"
, 7 : "Cardholder name incorrect, billing address matches"
, 8 : "Cardholder name, billing address, and postal code are all incorrect"
  // International Response Codes
//, G :
}
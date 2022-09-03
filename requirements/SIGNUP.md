# POST /api/v1/signup requirements

## Success

- [x] Receives a POST request in /api/v1/signup
- [x] Validates required params **name**, **email**, **password**, **passwordConfirmation**
- [x] Validates if **password** and **passwordConfirmation** have the same value
- [x] Validates if **email** is a valid email
- [] Validates if there is an user with the email provided
- [x] Generates a hash for the **password**
- [] Creates an account with the received params, changing **password** for the hash value
- [] Generates an access token from created account user id
- [] Updates account with the access token generated previously
- [] Returns 200 with the account created + access token

## Exceptions

- [x] Returns status 404 if route doesn't exist
- [x] Returns status 400 if **name**, **email**, **password** or **passwordConfirmation** weren't provided by client
- [x] Returns status 400 if **password** and **passwordConfirmation** aren't the same
- [x] Returns status 400 if **email** is an invalid email
- [] Returns status 403 if email was already registered in another account
- [x] Returns status 500 if something throws when generating a hash for password
- [x] Returns status 500 if something throws when saving account on DB
- [x] Returns status 500 if something throws when generating an access token
- [x] Returns status 500 if something throws when updating the new account with the generated access token

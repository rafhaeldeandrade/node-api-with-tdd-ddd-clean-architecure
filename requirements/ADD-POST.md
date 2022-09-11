# POST /api/v1/posts requirements

## Success

- [x] Receives a POST request in /api/v1/posts
- [x] Validates required params **title**, **subtitle**, **post**, **postDate**, **categories**, **authorId**
- [] Validates if accessToken is being provided in the property **authentication** in request's headers
- [] Validates if account has `admin` or `writer` role
- [x] Validates if title is a string and has minimum 5 and maximum 30 characters
- [x] Validates if subtitle is a string and has minimum 5 and maximum 30 characters
- [x] Validates if post is a string and has minimum 100 and maximum 3000 characters
- [x] Validates if **postDate** is a valid date
- [x] Validates if **categories** is an array of strings
- [x] Validates if **authorId** is a string
- [] Validates if **authentication** provided belongs to an account with \_id equal to **authorId**
- [x] Validates if title is unique
- [x] Generates a slug for the title
- [x] Saves the post in DB
- [x] Returns 201 with the post created, without **post** property

## Exceptions

- [x] Returns status 404 if route doesn't exist
- [x] Returns status 400 if **title**, **subtitle**, **postDate**, **categories** or **authorId** weren't provided by client
- [x] Returns status 400 if **title** isn't a string or dont have 5 to 30 characters
- [x] Returns status 400 if **subtitle** isn't a string or dont have 5 to 30 characters
- [x] Returns status 400 if **post** isn't a string or dont have 100 to 3000 characters
- [x] Returns status 400 if **postDate** isn't a valid date
- [x] Returns status 400 if **categories** isn't an array of strings
- [x] Returns status 400 if **authorId** isn't string
- [] Returns status 401 if accessToken provided don't belong to authorId
- [x] Returns status 409 if title was already used in another post
- [x] Returns status 500 if something throws when validating **postDate**
- [] Returns status 500 if something throws when fetching an account with **authorId**
- [x] Returns status 500 if something throws when generating the url slug for the title
- [x] Returns status 500 if something throws when searching for a post with the title provided
- [x] Returns status 500 if something throws when creating a post in DB

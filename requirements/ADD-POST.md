# POST /api/v1/posts requirements

## Success

- [] Receives a POST request in /api/v1/posts
- [] Validates required params **title**, **subtitle**, **postDate**, **categories**, **authorId**
- [] Validates if accessToken is being provided in the property **authorization** in request's headers
- [] Validates if title is a string and has minimum 5 and maximum 30 characters
- [] Validates if subtitle is a string and has minimum 5 and maximum 30 characters
- [] Validates if **postDate** is a valid date
- [] Validates if **categories** is an array of strings
- [] Validates if **authorId** is a number and if it exists
- [] Validates if **accessToken** provided belongs to an account with \_id equal to **authorId**
- [] Generates a slug for the title
- [] Validates if slug is unique
- [] Returns 201 with the post created

## Exceptions

- [] Returns status 404 if route doesn't exist
- [] Returns status 400 if **title**, **subtitle**, **postDate**, **categories** or **authorId** weren't provided by client
- [] Returns status 400 if **title** isn't a string or dont have 5 to 30 characters
- [] Returns status 400 if **subtitle** isn't a string or dont have 5 to 30 characters
- [] Returns status 400 if **postDate** isn't a valid date
- [] Returns status 400 if **categories** isn't an array of strings
- [] Returns status 400 if **authorId** doesn't exist
- [] Returns status 401 if accessToken provided don't belong to authorId
- [] Returns status 409 if title slug was already used in another post
- [] Returns status 500 if something throws when validating **postDate**
- [] Returns status 500 if something throws when fetching an account with **authorId**
- [] Returns status 500 if something throws when generating the url slug for the title
- [] Returns status 500 if something throws when searching for a post with the generated url slug
- [] Returns status 500 if something throws when creating a post in DB

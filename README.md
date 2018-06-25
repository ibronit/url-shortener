# URL shortener app

This is a demo URL shortener app written in nodejs.

### Bootstrap the app

```sh
npm install
node index.js
```

## API endpoints:

**Store URL**
----
  Stores the original URL and returns a shorthand to it. Requires authentication. For test purposes the `.env.defaults` contains a default secret key, the authorization will be successful with the test request attached bellow.

* **URL**

  /api/create

* **Method:**

  `POST`
  
*  **URL Params**

   none 

* **Data Params**
    **Required:**

  `original_url=[string]`

* **Success Response:**

  * **Code:** 201
    **Content:** `{ original_url: original_url, shorthand: shorthand }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** `{ error: 'original_url is missing from the request body' }`

  OR

  * **Code:** 403 UNAUTHORIZED
    **Content:** `{ auth: false, message: 'No token provided.' }`

  OR  
  
  * **Code:** 409 CONFLICT
    **Content:** `{ error: Shorthand: ${shorthand} already exists }`
  
  OR

  * **Code:** 500 UNAUTHORIZED
    **Content:** `{ auth: false, message: 'Failed to authenticate token.' }`

### Test request

``` sh
curl -d '{"original_url":"https://github.com/postmanlabs/postman-app-support/issues/292"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJqb2huZG9lIiwicmVhbG5hbWUiOiJKb2huIERvZSJ9.10cg9u3gFDOLtY0hQvqkR2LlryOdifz5yrjATBHyXjA" -X POST http://127.0.0.1:3000/api/create
```

**Redirect to the original URL**
----
  Redirects to the original url by the given shorthand.

* **URL**

  /:{$shorthand}

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   `shorthand=[string]`

* **Data Params**
    
    none

* **Success Response:**

  * **Code:** 301
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** `{ 'error': `URL for: "${shorthand}" not found` }`

### Test request

``` sh
curl -X GET http://127.0.0.1:3000/${shortand}
```
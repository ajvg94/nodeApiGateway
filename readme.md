# Dynamics Web Api JS
Node JS web service to insert records into dynamics using the dynamics web api

---
## Prerequisites
### Azure AD Application
For setting up your D365 enviorment and getting your Azure AD keys please reffer to the link below and follow the steps:
https://medium.com/@ferryjongmans/microsoft-powerapps-cds-for-apps-api-7f9de4c4c795

### Auth0 Account
For basic Auth0 underestanding and implemmentation please reffer to the link below and follow the steps:
https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/

---
## Dependencies
"adal-node": "^0.2.1"\
"ajv": "^6.12.3"\
"body-parser": "^1.19.0"\
"compression": "^1.7.4"\
"cookie-parser": "^1.4.5"\
"cors": "^2.8.5"\
"csurf": "^1.11.0"\
"dotenv": "^8.2.0"\
"dynamics-web-api": "^1.6.10"\
"express": "^4.17.1"\
"express-jwt": "^6.0.0"\
"express-rate-limit": "^5.1.3"\
"express-slow-down": "^1.3.1"\
"helmet": "^4.0.0"\
"hpp": "^0.2.3"\
"jwks-rsa": "^1.9.0"\
"morgan": "^1.10.0"\
"mysql": "^2.18.1"\
"toobusy-js": "^0.5.1"

---
## Dev dependencies (ES6 and testing porpouses)
"@babel/cli": "^7.10.5"\
"@babel/core": "^7.11.1"\
"@babel/node": "^7.10.5"\
"@babel/preset-env": "^7.11.0"\
"nodemon": "^2.0.4"

---
## Scripts
To install dependencies:
`npm install`

To start the package:
`npm start`

## Misc
To use your D365 as a database in SQL Management please reffer to the link below and follow the steps:
https://docs.microsoft.com/en-us/powerapps/developer/common-data-service/cds-sql-query

To install CRM Rest Builder in your D365 enviorment as a solution please reffer to the link below and follow the steps:
https://www.youtube.com/watch?v=VgumdjLd57E
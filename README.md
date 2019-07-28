Serverless project.

# Objectives:

Lambda's functions, API Gateway and S3 to Create/List/Detail a json based location's file.

The project is managed by [severless](https://github.com/serverless/serverless) for automations and
deployment, with serverless.yml the framework will auto scale and build all the required configurations in
a microservices lambda functions.

The project had been build from scratch using serverless' `aws-nodejs` template:

`serverless create --template aws-nodejs --path lambda`

Deployment: 

`serverless deploy -v` with verbosity ;)

* Create view to upload a json file that descripes a location.

* List view for all uploaded files.

* Detail view for the uploaded file by key (filename), stream the file with an extra field for distance calculations.


### Project structure:

### Project urls:

List view url:

Will list all the objects from the locations bucket.

`GET` /api/geo

Detail view url:

Will stream the object by it's key.

The key will be filename+uuid to uniqily define the file.

`GET` /api/geo/{key}

Create view url:

Will upload the object by it's key.

`POST` /api/geo

### Tools used: 

[nodejs10.x](https://nodejs.org/download/release/latest-v10.x/)

[severless](https://github.com/serverless/serverless)

[yarn](https://github.com/yarnpkg/yarn)

[uuid](https://www.npmjs.com/package/uuid)

[prettier](https://github.com/prettier/prettier)
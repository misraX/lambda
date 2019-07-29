Serverless project.

# Objectives:

Lambda's functions, API Gateway and S3 to Create/List/Detail a json based location's file.

The project is managed by [severless](https://github.com/serverless/serverless) for automations and
deployment, with serverless.yml the framework will auto scale and build all the required configurations in
a microservices lambda functions.

The project had been build from scratch using serverless' `aws-nodejs` template:

`serverless create --template aws-nodejs --path lambda`

### Deployment: 

`serverless deploy -v` with verbosity ;)

* Create view to upload a json file that descripes a location.

* List view for all uploaded files.

* Detail view for the uploaded file by key (filename), stream the file with an extra field for distance calculations.

### Live endpoints:                                                                                                                              
  GET - https://5u094xtgk8.execute-api.us-east-1.amazonaws.com/dev/geo                                                                                                          
  POST - https://5u094xtgk8.execute-api.us-east-1.amazonaws.com/dev/geo                                                                                                         
  GET - https://5u094xtgk8.execute-api.us-east-1.amazonaws.com/dev/geo/{key}

### Project structure:

  API:  api/geo/{list,create,detail}.js

  Utils: utils/{parsers,s3}.js

  Tests: tests/handler.spec.js

  Index|Handler: handler.js

  PrettierIngone: .prettierignore

  GitIgnore: .gitigonre

  S3config: s3config.js
  
### Project urls:

List view url:

Will list all the objects from the locations bucket.

`GET` /api/geo

Detail view url:

Will stream the object by it's key.

The key will be filename+uuid to uniqily define the file.

`GET` /api/geo/{key}

Create view url:

multipart uploads using busyboy parser.
`POST` /api/geo

### Response format:

create:

onSuccess:

`{ data: { Key: res.Key } }`

onError:

AWS ERROR: `{ statusCode: 409 }, { error: 'Error while uploading.' }`

CODE Exceptions: `{ statusCode: 409 }, { error: 'Error while creating an object.' }`

list:

onSuccess:

```{
    data: {
        Contents: res['Contents'] ? res['Contents'] : [],
        KeyCount: res['KeyCount'] ? res['KeyCount'] : 0
    }
}```

onError:

AWS ERROR: `{ statusCode: 409 }, { error: 'Error while listing objects.' })`

detail:

onSuccess:

```{
    data: {
        longitude: 29.978277,
        latitude: 31.1302063,
        distance: 2729.967613173234
    }
}```

onError:

AWS ERROR: `{ statusCode: 409 }, { error: 'Error while getting an object.' }`


### Tools used: 

[nodejs10.x](https://nodejs.org/download/release/latest-v10.x/)

[severless | Serverless Framework](https://github.com/serverless/serverless)

[uuid | RFC4122 UUIDS for filenames](https://www.npmjs.com/package/uuid)

[busyboy | Parse form-data](https://github.com/mscdex/busboy)

[prettier | Code formatter](https://github.com/prettier/prettier)

[yarn | Package manager](https://github.com/yarnpkg/yarn)

[chaijs | Testing Framework](https://github.com/chaijs/chai)
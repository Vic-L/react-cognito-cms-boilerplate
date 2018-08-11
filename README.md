# Description

React front end CMS integrated with AWS Cognito built on top [React Router v4 + React Transition Group v2](https://github.com/Vic-L/react-router-4-react-transition-group-2).

## Usage

```
# in root directory, for backend dependencies
cd backend && npm install
npm start
```

### Front End
1. Run these commands:
```
# in root directory, for frontend dependencies
$ cd frontend && npm install
$ npm start
```

2. Open `http://localhost:8080` in browser

3. Develop the front end as usual. The backend will only be needed for deployment.

### Backend
Only used during deployment.

The only thing to check is if a html page is properly rendered while in local development.

This should only be done after a copy of front end has already been uploaded to an S3 bucket.

1. Set up the `env.yml` file. For local development for backend, the only key that matter will be the `assetDomainName`. Usually it is a CDN or S3 endpoint, which will point to where the front end bundle file is.

2. Run these commands:
```
$ BUNDLE_HASH=$(aws s3 ls s3://<BUCKET_NAME>/assets/ --profile <AWS_NAMED_PROFILE> | grep -G 'bundle*' | cut -d '-' -f 4) && echo $BUNDLE_HASH && sls offline start --bundleHash $BUNDLE_HASH
```

3. Open `http://localhost:8000` in browser

## Deployment

### FrontEnd
1. Create a IAM user with access to S3.
2. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
3. Create a [named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) to use with AWS CLI.
4. Create bucket to store front end js bundle file assets.
5. Deploy front end to S3 first by running these commands
```
# in root directory
$ cd frontend
$ assetsDirectory='s3://<BUCKET_NAME>/assets' awsProfile='<AWS_NAMED_PROFILE>' npm run deploy
```

### BackEnd
1. Register a domain with AWS Route53.
2. Have a certificate in the *`us-east-1`* region with matching domain that you want to deploy to. This is due to a limitation by AWS. Your lambda function can still be deployed to other regions, as specified in your `serverless.yml` file.
3. Deploy server side rendering API to API Gateway and AWS Lambda
```
# in root directory, get the hash of the bundle file that is uploaded in step 1 and put it as an env variable
$ cd backend
$ BUNDLE_HASH=$(aws s3 ls s3://<BUCKET_NAME>/assets/ --profile <AWS_NAMED_PROFILE> | grep -G 'bundle*' | cut -d '-' -f 4) && echo $BUNDLE_HASH && sls deploy --stage prod --bundleHash $BUNDLE_HASH
```
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

1. Set up the `env.yml` file. For local development for backend, the only key that matter will be the `assetDomainName`. Usually it is a CDN or S3 endpoint, which will point to where the front end bundle file is. Eg `s3.amazonaws.com/<BUCKET_NAME>` This will be where the javascript files will be getting the assets from.

2. Run these commands, from root directory:
```
$ cd backend && BUNDLE_HASH=$(aws s3api list-objects --bucket <BUCKET_NAME> --prefix assets/ --profile <AWS_NAMED_PROFILE> | grep "Key\": \"assets/bundle" | cut -d '-' -f 2 | cut -d '.' -f 1) && echo $BUNDLE_HASH && sls offline start --bundleHash $BUNDLE_HASH
```

The command is basically trying to get the hash of the bundle that is uploaded to the S3 bucket, and insert it to the html that will be rendered for your react SPA.

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
$ cd frontend && assetsDirectory='s3://<BUCKET_NAME>/assets' awsProfile='<AWS_NAMED_PROFILE>' assetsPublicPathHostName='<ASSET_PUBLIC_PATH_HOST>' npm run deploy
```
This command will upload

### Variables explanation
* `BUCKET_NAME` is the S3 bucket where you will upload your js bundles to. It will always be uploaded to a folder named `assets` of the root directory of the bucket. Changes can be made by tweaking the webpack configuration and, correspondingly, the variables in the command above.
* `AWS_NAMED_PROFILE` is the named profile that will authenticate the uploading process to AWS S3. Read more about [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html).
* `ASSET_PUBLIC_PATH_HOST` is from where your assets will be loaded. By default, it should be `https://s3.amazonaws.com/<BUCKET_NAME>` which is the S3 endpoint of your assets. It is left as a variable should one needs to setup a CDN to improve delivery.

### BackEnd
1. Register a domain with AWS Route53.
2. Have a certificate in the *`us-east-1`* region with matching domain that you want to deploy to. This is due to a limitation by AWS. Your lambda function can still be deployed to other regions, as specified in your `serverless.yml` file.
3. Run `sls create_domain --stage prod` if you have not done so to create the domain. Skip ths setp if you have created the domain.
4. Deploy server side rendering API to API Gateway and AWS Lambda
```
# in root directory
$ cd backend && BUNDLE_HASH=$(aws s3api list-objects --bucket <BUCKET_NAME> --prefix assets/ --profile <AWS_NAMED_PROFILE> | grep "Key\": \"assets/bundle" | cut -d '-' -f 2 | cut -d '.' -f 1) && echo $BUNDLE_HASH && sls deploy --stage prod --bundleHash $BUNDLE_HASH
```
Similarly, this command trying to get the hash of the bundle that is uploaded to the S3 bucket. It takes the hash and insert it as a env variable (`bundleHash`) for the command. This env variable will trickle down to the serverless.yml file, which passes it on further to the lamda functions via [serverless environment variables](https://serverless.com/framework/docs/providers/aws/guide/variables).
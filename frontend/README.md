# React front end CMS integrated with AWS Cognito built on top [React Router v4 + React Transition Group v2](https://github.com/Vic-L/react-router-4-react-transition-group-2).

## Usage

Run these commands:
```
npm install
npm start
```

Open this address in browser
```
http://localhost:8080
```

## Deployment

### Front End
1. Create a IAM user with access to S3.
2. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
3. Create a [named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html) to use with AWS CLI.
4. Create bucket to store front end js bundle file assets.
5. Deploy front end to S3 first by running these commands
```
# in root directory
cd frontend && assetsDirectory='s3://<BUCKET_NAME>/assets' awsProfile='<AWS_NAMED_PROFILE>' npm run deploy
```

### Back End
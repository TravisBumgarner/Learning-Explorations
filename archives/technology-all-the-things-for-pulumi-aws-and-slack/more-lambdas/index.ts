import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx"; // Gives us even more functionality goodness

// Create a role to execute the function
const role = new aws.iam.Role('my-function-role', {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: "lambda.amazonaws.com"
    })
})

const lambdaFunction = new aws.lambda.Function('my-function', {
    role: role.arn,
    handler: "index.handler",
    runtime: aws.lambda.NodeJS12dXRuntime,
    code: new pulumi.asset.AssetArchive({
        'index.js': new pulumi.asset.StringAsset(
            "exports.handler = (e, c, cb) => cb(null, {statusCode: 200, body: 'Hello Devops dot com'});"
        )
    })
})

//  Pulumi prevents colisions and gives unique names to our functions, so we'll need to export it to actually get it out.
export const lambdaName = lambdaFunction.name
// Can then execute the function
// aws --profile demos lambda invoke --function-name $(pulumi stack output lambdaName) /tmp/out

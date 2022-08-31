import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Power of the AWS Package is that it'll spin up all this goodness and we don't have to do much of anything to get there.
const api = new awsx.apigateway.API('hello-world', {
    routes: [
        {
            path: "/",
            method: "GET",
            eventHandler: async (event) => {
                console.log('get request received')
                return {
                    statusCode: 200,
                    body: "hello"
                }
            }
        },
        {
            path: "/",
            method: "POST",
            eventHandler: async (event) => {
                console.log('post request received')
                return {
                    statusCode: 200,
                    body: "hello post"
                }
            }
        }
    ]
})

export const functionName = api.getFunction.name
export const urn = api.urn
export const url = api.url
// curl $(pulumi stack output url)
// curl -X POST $(pulumi stack output url)
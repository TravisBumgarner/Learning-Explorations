
import * as aws from "@pulumi/aws";
import axios from 'axios'

import config from './config'

const docsBucket = new aws.s3.Bucket("magic-lambdas");

docsBucket.onObjectCreated("docsHandler", (e) => {
    axios.post(
        config.webhookSlackURL,
        {
            "text":`Document created at ${new Date()}`
        }
    )
});
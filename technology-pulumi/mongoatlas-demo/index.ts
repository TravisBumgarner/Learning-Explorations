import 'dotenv/config'

import * as pulumi from "@pulumi/pulumi";
import * as mongodbatlas from "@pulumi/mongodbatlas";



const project = new mongodbatlas.Project("my-demo-project", {
    orgId: "12345",
});
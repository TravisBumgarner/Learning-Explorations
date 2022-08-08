import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";


const config = new pulumi.Config();
const frontendPort = config.requireNumber("frontendPort");
const backendPort = config.requireNumber("backendPort");
const mongoPort = config.requireNumber("mongoPort");
const mongoHost = config.require("mongoHost");
const database = config.require("database");
const nodeEnvironment = config.require("nodeEnvironment");
const protocol = config.require("protocol")

const stack = pulumi.getStack();

const backendImageName = "backend";
const backend = new docker.RemoteImage(`${backendImageName}`, {
    name: "pulumi/tutorial-pulumi-fundamentals-backend:latest",
});

const frontendImageName = "frontend";
const frontend = new docker.RemoteImage(`${frontendImageName}`, {
    name: "pulumi/tutorial-pulumi-fundamentals-frontend:latest",
});

const mongoImage = new docker.RemoteImage("mongo", {
    name: "pulumi/tutorial-pulumi-fundamentals-database-local:latest",
});

const network = new docker.Network("network", {
    name: `services-${stack}`,
});

const mongoContainer = new docker.Container("mongoContainer", {
    image: mongoImage.repoDigest,
    name: `mongo-${stack}`,
    ports: [
        {
            internal: mongoPort,
            external: mongoPort,
        },
    ],
    networksAdvanced: [
        {
            name: network.name,
            aliases: ["mongo"],
        },
    ],
});

const backendContainer = new docker.Container("backendContainer", {
    name: `backend-${stack}`,
    image: backend.repoDigest,
    ports: [
        {
            internal: backendPort,
            external: backendPort,
        },
    ],
    envs: [
        `DATABASE_HOST=${mongoHost}`,
        `DATABASE_NAME=${database}`,
        `NODE_ENV=${nodeEnvironment}`,
    ],
    networksAdvanced: [
        {
            name: network.name,
        },
    ],
}, { dependsOn: [ mongoContainer ]});

const frontendContainer = new docker.Container("frontendContainer", {
    image: frontend.repoDigest,
    name: `frontend-${stack}`,
    ports: [
        {
            internal: frontendPort,
            external: frontendPort,
        },
    ],
    envs: [
        `LISTEN_PORT=${frontendPort}`,
        `HTTP_PROXY=backend-${stack}:${backendPort}`,
        `PROXY_PROTOCOL=${protocol}`
    ],
    networksAdvanced: [
        {
            name: network.name,
        },
    ],
});
# ts-temporal
Test for temporal in typescript.

## Install

1. Install **Node.js** (v16.15) (Download/Install at [nodejs.org](https://nodejs.org/dist/latest-v16.x)). See [installation guide](https://github.com/nodejs/help/wiki/Installation).
2. Install **Yarn** (v1.\*) (Download/Install at [yarnpkg.com](https://yarnpkg.com/getting-started/install))
3. Install Dependencies

```
yarn install
```

## How to start

Currently, the tests use the testing environment as a default. So no local cluster is needed.

However, when not using the testing environment. The temporal cluster first needs to be started with docker-compose.
In another terminal at another location do

```bash
docker-compose up
```

After launching you can check Temporal web UI at port 8088. The port can be changed by setting the env variable TEMPORAL_WEB_PORT.
Now you can launch tests using Temporal or start a worker and client.

### Start worker

yarn run worker

### Start client

yarn run client


## Test

```
yarn test
```

### Replay workflow

You can easily replay and debug a workflow by running `replay.test.ts` with the correct workflowId.
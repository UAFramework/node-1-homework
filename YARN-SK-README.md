# Yarn Starter Kit
This is monorepo powered with [Yarn Workpspaces](https://classic.yarnpkg.com/en/docs/workspaces) where Client and Server run simultaneously.

Prerequisites:
- installed NodeJS v16 or higher


## Installation of Yarn and npm packages:
Install yarn with the cmd below:
```shell
npm install --global yarn
```

After installation run
```shell
yarn install
```

if you see networ errors like below:
```
[1/4] 🔍  Resolving packages...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
info There appears to be trouble with your network connection. Retrying...
```

try re-running install script with timeout:
```shell
yarn cache clean
yarn install --network-timeout 1000000
```

## Running project:
- both Clent and Server
    ```shell
    yarn dev
    ```
- start server only:
    ```shell
    yarn --cwd server dev
    # or
    yarn dev:server
    ```
- start client only:
    ```shell
    yarn --cwd client dev
    # or
    yarn dev:client
    ```

## More about Yarn and Workspaces:
- Installation: [https://classic.yarnpkg.com/en/docs/install]
- Usage: [https://classic.yarnpkg.com/en/docs/usage]
- Workspaces: [https://classic.yarnpkg.com/en/docs/workspaces]

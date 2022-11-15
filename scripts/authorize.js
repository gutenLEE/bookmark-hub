import { OAuthApp, createNodeMiddleware } from "octokit";


const { url } = app.getWebFlowAuthorizationUrl({
    clientType: "oauth-app",
    clientId: "be7364bd92671966625b",
    clientSecret: "6b5d6da12cd72baac6eb7db78ef74de0231d5cab",
    defaultScopes: ["repo"],
})
console.log(url)

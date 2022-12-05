


document.querySelector('hook_mode')

const app = new OAuthApp();
const { url } = app.getWebFlowAuthorizationUrl({
    clientType: "oauth-app",
    clientId: this.CLIENT_ID,
    clientSecret: this.CLIENT_SECRET,
    defaultScopes: ["repo"],
})
alert(url)

// https://stackoverflow.com/questions/71819585/chrome-extension-refusing-to-load-external-scripts

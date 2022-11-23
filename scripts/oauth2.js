import { OAuthApp, createNodeMiddleware } from "octokit";

const oAuth2 = {

    init() {
        this.KEY = 'bookmark-hub-token';
        this.CLIENT_ID = 'be7364bd92671966625b';
        this.CLIENT_SECRET = '6b5d6da12cd72baac6eb7db78ef74de0231d5cab';
        this.REDIRECT_URL = 'https://github.com/'; 
        this.SCOPES = ['repo'];
    },

    begin() {
        this.init();

        const app = new OAuthApp();
        const { url } = app.getWebFlowAuthorizationUrl({
            clientType: "oauth-app",
            clientId: this.CLIENT_ID,
            clientSecret: this.CLIENT_ID,
            defaultScopes: ["repo"],
        })

        console.log(url)
    }
}
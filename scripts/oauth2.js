const oAuth2 = {
    init() {
        this.KEY = 'bookmark-hub-token';
        this.ACCESS_TOKEN_URL =
          'https://github.com/login/oauth/access_token';
        this.AUTHORIZATION_URL =
          'https://github.com/login/oauth/authorize';
        this.CLIENT_ID = 'be7364bd92671966625b';
        this.CLIENT_SECRET = '6b5d6da12cd72baac6eb7db78ef74de0231d5cab';
        this.REDIRECT_URL = 'https://github.com/'; 
        this.SCOPES = ['repo'];
    }

}
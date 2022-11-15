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
    },

    begin() {
        this.init();
        
        let url = `${this.AUTHORIZATION_URL}?client_id=${this.CLIENT_ID}&redirect_uri${this.REDIRECT_URL}&scope=`;

        for (let i = 0; i < this.SCOPES.length; i += 1) {
            url += this.SCOPES[i];
        }
        console.log(url)
    }

}
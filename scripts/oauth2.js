
const oAuth2 = {
    /**
     * Initialize
     */
    init() {
      this.KEY = 'leethub_token';
      this.ACCESS_TOKEN_URL =
        'https://github.com/login/oauth/access_token';
      this.AUTHORIZATION_URL =
        'https://github.com/login/oauth/authorize';
      this.CLIENT_ID = 'be7364bd92671966625b';
      this.CLIENT_SECRET = '843f835609c7ef02ef0f2f1645bc49514c0e65a6';
      this.REDIRECT_URL = 'https://github.com/'; // for example, https://github.com
      this.SCOPES = ['repo'];
    },
  
    /**
     * Begin
     */
    begin() {
      this.init(); // secure token params.
  
      let url = `${this.AUTHORIZATION_URL}?client_id=${this.CLIENT_ID}&redirect_uri${this.REDIRECT_URL}&scope=`;
  
      for (let i = 0; i < this.SCOPES.length; i += 1) {
        url += this.SCOPES[i];
      }
  
      chrome.storage.local.set({ pipe_leethub: true }, () => {
        // opening pipe temporarily
        chrome.tabs.create({ url, active: true }, function () {
          window.close();
          chrome.tabs.getCurrent(function (tab) {
            alert("tab.id " +tab.id)
            chrome.tabs.remove(tab.id, function () {});
          });
        });
      });
    },
  };
  

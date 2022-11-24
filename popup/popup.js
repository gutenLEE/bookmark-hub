
import { oAuth2 } from "../scripts/oauth2";

document.querySelector('.modal')
        .addEventListener(
            'click', 
            () => {oAuth2.begin()}
        );

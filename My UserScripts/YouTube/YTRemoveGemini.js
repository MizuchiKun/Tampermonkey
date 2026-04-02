// ==UserScript==
// @name         Remove YouTube Gemini buttons
// @namespace    http://tampermonkey.net/
// @version      2026-04-02
// @description  Removes/hides YouTube's new Gemini buttons (in fullscreen and near like button).
// @author       MizuchiKun
// @match        https://www.youtube.com/watch*
// @icon         https://www.youtube.com/s/desktop/78e11dee/img/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let geminiButtons = null;

    window.addEventListener("load", (e) => {
        // Need to delay getting videoPlayer because I guess they're loading/creating that part via. script?
        setTimeout(() => {
            geminiButtons = document.getElementsByClassName('you-chat-entrypoint-button');
            for (let i = 0; i < geminiButtons.length; i++) {
                geminiButtons[i].style.display = "None";
            }
            console.log(`MizuchiKun: Initialised Remove YouTube Gemini button.`);
        }, 2000);
    });

})();

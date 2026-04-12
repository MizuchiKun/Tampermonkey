// ==UserScript==
// @name         Remove YouTube Gemini buttons.
// @namespace    http://tampermonkey.net/
// @version      2026-04-12
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
        setTimeout(() => {
            geminiButtons = document.getElementsByClassName('you-chat-entrypoint-button');
            console.log(`MizuchiKun: Initialised Remove YouTube Gemini buttons.`);
        }, 2000);
    });

    // This event triggers when a video's data has been fully loaded.
    // That includes individual videos, but also any video in a playlist (including the first one you open, not just the following ones).
    window.addEventListener("yt-navigate-finish", (e) => {
        // Wait a bit to guarantee the buttons are loaded.
        setTimeout(() => {
            for (let i = 0; i < geminiButtons.length; i++) {
                geminiButtons[i].style.display = "None";
            }
            console.log(`MizuchiKun: Removed Gemini buttons.`);
        }, 2500);
    });

})();

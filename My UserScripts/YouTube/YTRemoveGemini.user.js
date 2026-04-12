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

    /*** Functions ***/
    function RemoveGeminiButtons(buttons) {
        let removedButtons = false;
        for (const button of buttons) {
            if (button.style.display !== "None") {
                button.style.display = "None";
                removedButtons = true;
            }
        }

        if (removedButtons) {
            console.log(`MizuchiKun: Removed Gemini buttons.`);
        }
    }

    /*** Events ***/
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
            RemoveGeminiButtons(geminiButtons);
        }, 2500);
    });

    window.addEventListener('fullscreenchange', (event) => {
        // I literally just need this because the non-fullscreen button isn't loaded when going to the playlist's next video while in fullscreen.
        // And therefore it's not removed, so I need to do it again when exiting fullscreen.
        // Oddly enough, this is not an issue when you choose one of the suggested videos at the end of a non-playlist video. Then, the buttons stay gone??
        const isFullscreen = document.fullscreenElement !== null;
        if (!isFullscreen) {
            // Wait a bit to guarantee the buttons are loaded.
            setTimeout(() => {
                RemoveGeminiButtons(geminiButtons);
            }, 1000);
        }
    });

})();

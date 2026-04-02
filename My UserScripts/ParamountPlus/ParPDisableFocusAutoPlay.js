// ==UserScript==
// @name         Paramount+ Disable auto-play on focus
// @namespace    http://tampermonkey.net/
// @version      2026-01-17
// @description  Disables the auto-playing of the current video when the tab/window gets focused / switched to.
// @author       MizuchiKun
// @match        https://www.paramountplus.com/shows/video/*
// @icon         https://www.paramountplus.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let videoPlayer = null;
    let pausedBeforeUnfocus = true;

    window.addEventListener("load", (e) => {
        // Need to delay getting videoPlayer because I guess they're loading/creating that part via. script?
        setTimeout(() => {
            videoPlayer = document.getElementsByTagName('video')[0];
            console.log(`MizuchiKun: Initialised Paramount+ Disable auto-play.`);
        }, 2000);
    });

    // ('blur' is basically the 'unfocus' event.)
    window.addEventListener("blur", (e) => {
        pausedBeforeUnfocus = videoPlayer.paused;
    });

    window.addEventListener("focus", (e) => {
        // Apparently this code doesn't have to be delayed, to happen after Paramount+'s auto-play nonsense?
        // If this does cause an issue, add setTimeout(). But a delay of <10 ms should be enough.
        // It definitely works with the delay, but then the video (incl. audio) might play a tiny bit before being paused again.
        if (pausedBeforeUnfocus)
        {
            videoPlayer.pause();
            console.log(`MizuchiKun: Prevented auto-play on focus.`);
        }
    });

})();

// ==UserScript==
// @name         Paramount+ Arrow Key Skip & Disable Auto-play on focus
// @namespace    http://tampermonkey.net/
// @version      2026-01-17
// @description  Enables the use of the left/right arrow keys to skip through videos. \nAlso disables the auto-playing of the current video when the tab/window gets focused / switched to.
// @author       MizuchiKun
// @match        https://www.paramountplus.com/shows/video/*
// @icon         https://www.paramountplus.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let videoPlayer = null;
    const SkipDuration = 10;
    let pausedBeforeUnfocus = true;

    // Would've preferred to just simulate the J and L key presses to just use Paramount's skipping code (in case of some unknown functionality), but it didn't wanna work . . .
    // Specifically, I think I just didn't target the right element to trigger the skipping? Or they're checking that 'isTrusted' bool on the keypress events.

    window.addEventListener("load", (e) => {
        // Need to delay getting videoPlayer because I guess they're loading/creating that part via. script?
        setTimeout(() => {
            videoPlayer = document.getElementsByTagName('video')[0];
            console.log(`MizuchiKun: Initialised Paramount+ Skip with arrow keys.`);
        }, 2000);
    });

    window.addEventListener("keydown", (e) => {
        if (e.code == 'ArrowLeft')
        {
            videoPlayer.currentTime -= SkipDuration;
            console.log(`MizuchiKun: Rewound by ${SkipDuration} seconds.`);
        }
        else if (e.code == 'ArrowRight')
        {
            videoPlayer.currentTime += SkipDuration;
            console.log(`MizuchiKun: Fast-forwarded by ${SkipDuration} seconds.`);
        }
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

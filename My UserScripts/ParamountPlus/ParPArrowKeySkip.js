// ==UserScript==
// @name         Paramount+ Arrow Key Skip
// @namespace    http://tampermonkey.net/
// @version      2026-01-17
// @description  Enables the use of left/right arrow keys skipping through videos.
// @author       MizuchiKun
// @match        https://www.paramountplus.com/shows/video/*
// @icon         https://www.paramountplus.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let videoPlayer = null;
    const SkipDuration = 10;

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

})();

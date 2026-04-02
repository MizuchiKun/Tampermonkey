// ==UserScript==
// @name         Toggle YouTube video progress bar and text
// @namespace    http://tampermonkey.net/
// @version      2026-03-25
// @description  Toggle with F10: Toggles YouTube's video progress bar and progress text (timestamp). In case I don't wanna know the video's progress, for 'dramatic' reasons, or i.a. (Japanese) immersion.
// @author       MizuchiKun
// @match        https://www.youtube.com/watch*
// @icon         https://www.youtube.com/s/desktop/78e11dee/img/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let scriptEnabled = false;
    let progressBar = null;
    let progressTimestamp = null;
    let bottomUI = null;

    window.addEventListener("load", (e) => {
        // Need to delay getting videoPlayer because I guess they're loading/creating that part via. script?
        setTimeout(() => {
            progressBar = document.getElementsByClassName('ytp-progress-bar')[0];
            progressTimestamp = document.getElementsByClassName('ytp-time-current')[0];
            bottomUI = document.getElementsByClassName('ytp-chrome-bottom')[0];
            console.log(`MizuchiKun: Initialised Toggle YouTube progress bar.`);
        }, 2000);
    });

    window.addEventListener("keydown", (e) => {
        if (e.code == 'F10')
        {
            scriptEnabled = !scriptEnabled;

            let newVisibility = scriptEnabled ? 'hidden' : 'visible';
            progressBar.style.visibility = newVisibility;
            progressTimestamp.style.visibility = newVisibility;

            let newBorder = scriptEnabled ? '0.5rem solid #5227AA' : 'unset';
            bottomUI.style.borderTop = newBorder;

            let alertMessage = `${scriptEnabled ? 'Enabled' : 'Disabled'} Toggle YouTube progress bar.`;
            console.log(`MizuchiKun: ${alertMessage}`);
            //alert(alertMessage);
        }
    });

})();

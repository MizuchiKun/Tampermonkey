// ==UserScript==
// @name         Pause YouTube to check new eggs in ARK
// @namespace    http://tampermonkey.net/
// @version      2026-02-18
// @description  Toggle with F9: Pauses the YouTube video currently being watched (whose tab is focused) and tells the user to go check new eggs in ARK.
// @author       MizuchiKun
// @match        https://www.youtube.com/watch*
// @icon         https://www.youtube.com/s/desktop/78e11dee/img/favicon.ico
// @grant        none
// ==/UserScript==

(function() {

    // 'Spript-wide' globals.
    let videoPlayer = null;
    let scriptEnabled = false;

    const EggReminderInterval = 8.5 * 60 * 1000; // 8.5 minutes.
    let eggReminder = () => {
        videoPlayer.pause();
        alert(`Go check your newly bred eggs in ARK!`);
        // It currently doesn't pause the interval during the alert.
        // E.g. if I take 1 minute to check the eggs, it's only gonna be another 7.5 minutes until the next alert.
        videoPlayer.play();
    };
    let eggReminderIntervalID = null;

    window.addEventListener("load", (e) => {
        // Need to delay getting videoPlayer because I guess they're loading/creating that part via. script?
        setTimeout(() => {
            videoPlayer = document.getElementsByTagName('video')[0];
            console.log(`MizuchiKun: Initialised Pause YouTube for ARK eggs.`);
        }, 2000);
    });

    window.addEventListener("keydown", (e) => {
        if (e.code == 'F9')
        {
            scriptEnabled = !scriptEnabled;
            let alertMessage = `${scriptEnabled ? 'Enabled' : 'Disabled'} Pause YouTube for ARK eggs.`;
            console.log(`MizuchiKun: ${alertMessage}`);
            alert(alertMessage);

            clearInterval(eggReminderIntervalID);
            eggReminderIntervalID = null;
            if (scriptEnabled)
            {
                eggReminderIntervalID = setInterval(eggReminder, EggReminderInterval);
            }
        }
    });

})();

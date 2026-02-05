// ==UserScript==
// @name         Prime Video toggle subtitles with S.
// @namespace    http://tampermonkey.net/
// @version      2025-05-16
// @description  Toggle subtitles on Prime Video by pressing S.
// @author       Naud
// @match        https://www.primevideo.com/detail/*, https://www.amazon.de/gp/video/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=primevideo.com
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener("keypress", (e) => {
        const subtitles = document.getElementsByClassName('atvwebplayersdk-captions-overlay')[0];

        if (e.code === 'KeyS')
        {
            subtitles.style.display = subtitles.style.display === '' ? 'none' : '';
        }
    });

})();

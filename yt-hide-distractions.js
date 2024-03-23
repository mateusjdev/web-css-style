// ==UserScript==
// @name        YT Hide Distractions
// @namespace   Violentmonkey Scripts
// @grant       none
// @encoding    utf-8
// @version     1.0
// @author      mateusjdev
// @match       *://*.youtube.com/*
// @exclude     *://music.youtube.com/*
// @exclude     *://*.music.youtube.com/*
// @grant       GM_registerMenuCommand
// @run-at      document-start
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

"use strict";

const settings = {
    hide_homepage: true,
    hide_subscriptions: false,
    hide_related: true,
    hide_chat: true,
    secondary: {
        hide: false,
        enable_toggle: true
    }
};

(function() {

    if (settings.hide_homepage) {
        const hp_style = document.createElement("style");
        hp_style.textContent = `[page-subtype="home"] { display: none; }`;
        document.documentElement.appendChild(hp_style);
    }

    if (settings.hide_subscriptions) {
        const sub_style = document.createElement("style");
        sub_style.textContent = `[page-subtype="subscriptions"] { display: none; }`;
        document.documentElement.appendChild(sub_style);
    }

    if (settings.hide_related) {
        const rel_style = document.createElement("style");
        rel_style.textContent = `#related { display: none; }`;
        document.documentElement.appendChild(rel_style);
    }

    if (settings.hide_chat) {
        const chat_style = document.createElement("style");
        chat_style.textContent = `#chat-container { display: none; }`;
        document.documentElement.appendChild(chat_style);
    }
})();

if (settings.secondary.hide) {
    (function() {
        const style = document.createElement("style");
        style.textContent = `#secondary { display: none; }`;
        document.documentElement.appendChild(style);
    })();
}

if (settings.secondary.enable_toggle) {
    (function() {
        GM_registerMenuCommand('Toggle Secondary', function() {
            var element = document.querySelector("#co1lumns #secondary")
            console.log(element.style.display)
            if (settings.secondary.hide) {
                if (element.style.display === '' || element.style.display === 'none') {
                    element.style.display = "block";
                } else {
                    element.style.display = "none";
                }
            } else {
                if (element.style.display === '' || element.style.display === 'block') {
                    element.style.display = "none";
                } else {
                    element.style.display = "block";
                }
            }
        });
    })();
}

// Toggle Tittle
(function() {
    GM_registerMenuCommand('Toggle Tittle', function() {
        var element = document.querySelector("#above-the-fold #title")
        if (element.style.display) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
})();

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
    hide_subscriptions: true,
    hide_related: true,
    hide_chat: false,
    secondary: {
        hide: false,
        enable_toggle: true,
        // live stream chat sometimes block primary panel to expand
        // when secondary is hidden, this setting ignores hide_chat
        // and disables it anyway
        force_hide_chat: true
    },
    runtime: {
        timer: null
    }
};


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

if (settings.secondary.hide) {
    const style = document.createElement("style");
    style.textContent = `#secondary { display: none; }`;
    document.documentElement.appendChild(style);
}


function hideLiveChatLoop() {
    document.getElementById("chatframe").contentWindow.document.querySelector("#chat-messages #close-button > yt-button-renderer > yt-button-shape > button").click();
    clearInterval(myVar);
}

function hideLiveChat() {
    settings.runtime.timer = setInterval(hideLiveChatLoop, 5000);
}

function keepLiveChat() {
    console.log(settings.runtime.timer)
    if (settings.runtime.timer != null)
        clearInterval(settings.runtime.timer)
}

if (settings.secondary.enable_toggle) {
    // TODO: if clientHeight = 0 already hidden
    // document.getElementById("chatframe").clientHeight
    if (settings.secondary.force_hide_chat) {
        window.addEventListener("yt-navigate-finish", () => hideLiveChat(), true);
    }

    GM_registerMenuCommand('Toggle Secondary', function () {
        var element = document.querySelector("#columns #secondary")
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
}


function toggleTitle() {
    var element = document.querySelector("#above-the-fold #title")
    if (element.style.display) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

GM_registerMenuCommand('Disable Live Chat', () => hideLiveChat());
GM_registerMenuCommand('Enable Live Chat', () => keepLiveChat());
GM_registerMenuCommand('Toggle Tittle', () => toggleTitle());
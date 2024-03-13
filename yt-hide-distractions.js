// ==UserScript==
// @name        YT Hide Distractions
// @namespace   Violentmonkey Scripts
// @grant       none
// @encoding    utf-8
// @version     1.0
// @author      mateusjdev
// @match        *://*.youtube.com/*
// @exclude      *://music.youtube.com/*
// @exclude      *://*.music.youtube.com/*
// @grant    GM_registerMenuCommand
// @run-at document-start
// @icon                https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

"use strict";

const settings = {
  Hide_HomePage: true,
  Hide_Subscriptions: false,
  Hide_Related: true,
  Hide_Chat: true,
  Hide_Secondary: true
};

(function () {

  if (settings.Hide_HomePage) {
    const style1 = document.createElement("style");
    style1.textContent = `[page-subtype="home"] { display: none; }`;
    document.documentElement.appendChild(style1);
  }

  if (settings.Hide_Subscriptions) {
    const style2 = document.createElement("style");
    style2.textContent = `[page-subtype="subscriptions"] { display: none; }`;
    document.documentElement.appendChild(style2);
  }

  if (settings.Hide_Related) {
    const style3 = document.createElement("style");
    style3.textContent = `#related { display: none; }`;
    document.documentElement.appendChild(style3);
  }

  if (settings.Hide_Chat) {
    const style4 = document.createElement("style");
    style4.textContent = `#chat-container { display: none; }`;
    document.documentElement.appendChild(style4);
  }
})();

if (settings.Hide_Secondary) {
  (function () {
    const style = document.createElement("style");
    style.textContent = `#secondary { display: none; }`;
    document.documentElement.appendChild(style);
  })();

  (function () {
    GM_registerMenuCommand('Toggle Secondary', function() {
      var element = document.querySelector("#columns #secondary")
      if(element.style.display == ''){
        element.style.display="block";
      } else if(element.style.display == 'none'){
        element.style.display="block";
      } else {
        element.style.display="none";
      }
    });
  })();
}

// Toggle Tittle
(function () {
    GM_registerMenuCommand('Toggle Tittle', function() {
      var element = document.querySelector("#above-the-fold #title")
      if(element.style.display){
        element.style.display="block";
      } else {
        element.style.display="none";
      }
    });
})();
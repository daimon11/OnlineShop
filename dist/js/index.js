import{timer}from"./modules/timer.js";import{acc}from"./modules/acc.js";import{menuControl}from"./modules/menuShow.js";const timerElem=document.querySelector(".main-promotion__timer"),deadline=timerElem.getAttribute("data-deadline");console.log("deadline",deadline),timer(timerElem,deadline);const accRun=acc(document.querySelectorAll(".footer__title--type_close"),document.querySelectorAll(".footer__list--type_hidden")),btnMenu=document.querySelector(".header__btn-menu");console.log("btnMenu",btnMenu);const menuBody=document.querySelector(".header__menu-group");console.log(menuBody),menuControl(btnMenu,menuBody);
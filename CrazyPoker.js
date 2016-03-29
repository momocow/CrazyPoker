// ==UserScript==
// @name         CrazyPoker
// @namespace    https://github.com/momocow
// @version      1.0
// @description  Keep poking without surrendering!
// @author       momocow.cs04g@g2.nctu.edu.tw
// @match        https://www.facebook.com/pokes*
// @grant        none
// ==/UserScript==

var victims = [];
var period = 500;

function is_victim(target){
    for(var idx in victims){
        if(victims[idx] == target){
            return true;
        }
    }
    return false;
}

function addAttackBtn(mainWarField){
        for(var idx = 0; idx < mainWarField.childNodes.length; idx ++){
            if(!mainWarField.childNodes[idx].childNodes[1] && !is_victim(mainWarField.childNodes[idx].id)){
                var onAttack = document.createElement("BUTTON");
                var attackMsg = document.createTextNode("戳爆他");
                onAttack.appendChild(attackMsg);
                onAttack.addEventListener("click", function(e){
                    victims.push(e.target.parentNode.id);
                    e.target.parentNode.removeChild(e.target);
                });
               mainWarField.childNodes[idx].appendChild(onAttack);
            }
       }
}

function try_poke(target){
    var trigger = target.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
    if(trigger && trigger.tagName == "A"){
        trigger.click();
    }
}

function attack(mainWarField){
    for(var idx = 0; idx < mainWarField.childNodes.length; idx ++){
            if(is_victim(mainWarField.childNodes[idx].id)){
                try_poke(mainWarField.childNodes[idx]);
            }
    }
}

function refresh(schedule, param){
    schedule(document.getElementById("contentArea").childNodes[0].childNodes[0].childNodes[2], param);
    schedule(document.getElementById("poke_live_new"), param);
}

function routine(){
    refresh(addAttackBtn);
    refresh(attack);
    setTimeout(routine, period);
}

(function() {
    'use strict';

    var permission = confirm("是否要召喚狂戳士?");
    if(permission){
        routine();
    }
})();

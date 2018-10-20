'use strict';

console.log(`toolkit.js is being used at ${Date.now()}.`);

var navIsOpen = false,
    body = document.querySelector('body'),
    navToggle = document.getElementById('nav-toggle'),
    nav = document.getElementsByClassName('main-nav')[0],

    navUserIsOpen = false,
    navUserToggle = document.getElementsByClassName('user')[0],
    navUser = document.getElementsByClassName('user-nav')[0],

    input = document.getElementsByClassName('top-up-input')[0],
    inputBox = document.getElementsByClassName('top-up-amount-input-box')[0],
    topUpInfo = document.getElementsByClassName('top-up-info')[0],
    output = document.getElementsByClassName('top-up-box-calculated-amount')[0],
    output2 = document.getElementsByClassName('top-up-info-converted')[0],

    topUpButtons = document.getElementsByClassName('top-up-buttons')[0],

    mainContainer = document.querySelector('main'),
    chart1 = document.getElementById("chart-1-chart"),
    chart2 = document.getElementById("chart-2-chart"),
    chart3 = document.getElementById("chart-3-chart");

var chartOptions = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 90, 
    },
    chartType = 'doughnut';

    var chartColor = [];

    var opacity = 1.3;

    for (i = 0; i < 100; i++) {

        opacity -= .3;
        if(opacity < 0) {
            opacity = 1;
        } else if(i % 4 == 0){
            opacity = .7;
        };
        //console.log(i % 4, opacity);
        var color = 'rgba(255,255,255, ' + opacity + ')';
        chartColor.push(color);
    };

    chartColor = ['#C1053F', '#CE0140', '#FF5757', '#FF57EB', '#8F57FF', '#9999CD', '#3399CC', '#339966', '#01AA99', '#F5E82C'];


if(chart1 != null){
    var chart1chart = new Chart(chart1, {
        type: chartType,
        data: {
            labels: labelsChart1,
            datasets: [{
                data: dataChart1,
                backgroundColor: chartColor,
                borderWidth: 0
            }]
        },
        options: chartOptions
    });

    var chart2chart = new Chart(chart2, {
        type: chartType,
        data: {
            labels: labelsChart2,
            datasets: [{
                data: dataChart2,
                backgroundColor: chartColor,
                borderWidth: 0
            }]
        },
        options: chartOptions
    });

    var chart3chart = new Chart(chart3, {
        type: chartType,
        data: {
            labels: labelsChart3,
            datasets: [{
                data: dataChart3,
                backgroundColor: chartColor,
                borderWidth: 0
            }]
        },
        options: chartOptions
    });
};

// Generic Popup

var openPopup = document.getElementsByClassName('open-popup')[0],
    popup = document.getElementsByClassName('overlay')[0],
    closePopup = document.getElementsByClassName('close-overlay')[0];

if(openPopup != null && popup != null){
    openPopup.addEventListener('click', function(e){
        e.preventDefault();

        popup.classList.add('overlay-visible');
    });

    closePopup.addEventListener('click', function(e){
        popup.classList.remove('overlay-visible');
    });
};


navToggle.addEventListener('click', function(e){
e.preventDefault();
if(!navIsOpen){
    body.classList.add('main-nav-open');
    navIsOpen = true;
} else {
    body.classList.remove('main-nav-open');
    navIsOpen = false;
}
});

navUserToggle.addEventListener('click', function(e){
e.preventDefault();
if(!navUserIsOpen){
    navUser.classList.add('user-nav-open');
    navUserIsOpen = true;
} else {
    navUser.classList.remove('user-nav-open');
    navUserIsOpen = false;
}
});

if(input != null){

    input.addEventListener('input', function(){
    this.value = this.value.replace(/[e\+\-]/gi, "");
    if(this.value != '' && this.value != 0){
        var value = parseInt(this.value);
        var amountPlusPercent = value + ((value / 100) * 25) - ((value / 100) * 3);
        //output.innerHTML = '<span>£</span>' + amountPlusPercent;
        topUpInfo.classList.add('top-up-info-visible');
        var after = '<span class="top-up-info-converted-info" data-info="We will transform your top-up to £' + amountPlusPercent + ' by claiming 25% GiftAid less our 3% administration fee">i</span>'
        output2.innerHTML = parseFloat(amountPlusPercent).toFixed(2) + after;
        topUpButtons.classList.add('top-up-buttons-visible');
    } else {
        //output.innerHTML = '<span>£</span>' + '0';
        topUpInfo.classList.remove('top-up-info-visible');
        output2.innerHTML = '<span>£</span>' + '0';
        topUpButtons.classList.remove('top-up-buttons-visible');
    }
    });

    input.addEventListener('focus', function(){
    //console.log('focus')
    inputBox.classList.add('focused');
    })

    input.addEventListener('blur', function(){
    //console.log('blur')
    if(this.value == '' || this.value == 0){
        inputBox.classList.remove('focused');
    }
    });

    var invalidChars = [
        "-",
        "+",
        "e",
      ];
      
      input.addEventListener("input", function() {
        this.value = this.value.replace(/[e\+\-]/gi, "");
      });
      
      input.addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      });

};

var inputs = document.querySelectorAll('.input input');

for (i = 0; i < inputs.length; ++i) {
    inputs[i].addEventListener('focus', function(){
        this.parentNode.classList.add('focused')
    });
    inputs[i].addEventListener('blur', function(){
        this.parentNode.classList.remove('focused')
    });
}


document.addEventListener("DOMContentLoaded", function(event) {
setTimeout(function(){
    document.getElementsByTagName('body')[0].classList.add('ready');
}, 100);

});   

var charitySearchInput = document.querySelector('.charity-search-input'),
    charitySearchDropdown = document.querySelector('.charity-drop-down'),
    charityFav = document.querySelector('.charity-fav'),
    charityOverlayFav = document.querySelector('.charity-overlay-fav'),
    charityFavList = document.querySelector('.charity-fav-list'),
    charitySearchDropdownItems = charitySearchDropdown != null ? charitySearchDropdown.querySelectorAll('.charity-name') : '',
    charityFavListItems = charityFavList != null ? charityFavList.querySelectorAll('.charity-name') : '',
    charityOverlay = document.querySelector('.charity-overlay'),
    closeBtn = document.querySelector('.close-overlay'),
    middle = document.querySelector('.middle');


if(charitySearchInput != null){

    charitySearchInput.addEventListener('input', function(){
        if(this.value != ''){
            charitySearchDropdown.classList.add('charity-drop-down-visible');
            charityFav.classList.add('charity-fav-hidden');
            middle.classList.add('overflow-hidden');
            
        } else {
            charitySearchDropdown.classList.remove('charity-drop-down-visible');
            charityFav.classList.remove('charity-fav-hidden');
            middle.classList.remove('overflow-hidden');
            
        }
        
    });

    charitySearchInput.addEventListener('focus', function(){
        this.parentNode.parentNode.classList.add('focused');
    });

    charitySearchInput.addEventListener('blur', function(){
        this.parentNode.parentNode.classList.remove('focused');
    });

    for(var i=0; i < charitySearchDropdownItems.length; i++){
        charitySearchDropdownItems[i].addEventListener('click', function () {
            charityOverlay.classList.add('charity-overlay-visible');
        }, false);
    }

    for(var i=0; i < charityFavListItems.length; i++){
        charityFavListItems[i].addEventListener('click', function () {
            charityOverlay.classList.add('charity-overlay-visible');
        }, false);
    }

    closeBtn.addEventListener('click', function(){
        charityOverlay.classList.remove('charity-overlay-visible');
    });
}

var checkboxAnonym = document.getElementById('anonym'),
    nameSpace = document.querySelector('.card-stat-you-name'),
    yourName = document.querySelector('.card-stat-you-name') != null ? nameSpace.innerHTML : '',
    anonymName = 'Anonymous gift';
    
if(checkboxAnonym != null ){
    checkboxAnonym.addEventListener('change', function() {
        if(this.checked) {
            nameSpace.innerHTML = anonymName;
        } else {
            nameSpace.innerHTML = yourName;
        }
    });
}

// Change funding source

var switchBtn = document.querySelector('.switch-funding'),
    payMethodOverlay = document.querySelector('.pay-method-overlay'),
    payMethodOverlayBtn = payMethodOverlay != null ? payMethodOverlay.querySelectorAll('.btn') : "";

if(payMethodOverlay != null){
    
    switchBtn.addEventListener('click', function() {
        payMethodOverlay.classList.add('pay-method-overlay-visible');
        // mainContainer.classList.add('blur');
    });

    for(var i=0; i < payMethodOverlayBtn.length; i++){
        payMethodOverlayBtn[i].addEventListener('click', function () {
            payMethodOverlay.classList.remove('pay-method-overlay-visible');
            // mainContainer.classList.remove('blur');
        }, false);
    };

    closeBtn.addEventListener('click', function(){
        payMethodOverlay.classList.remove('pay-method-overlay-visible');
    });
}
// Add to fav

var addToFav = Array.prototype.slice.call(document.querySelectorAll('.add-to-fav'), 0),
    removeFromfav = Array.prototype.slice.call(document.querySelectorAll('.remove-from-fav'), 0);

addToFav.forEach(function(el){
    el.addEventListener('click', function(e){

        e.preventDefault();

        if(!this.classList.contains('add-to-fav-added')){
            this.classList.add('add-to-fav-added');
            this.innerHTML = '<i class="ion-ios-heart"></i>';
        } else {
            this.classList.remove('add-to-fav-added');
            this.innerHTML = '<i class="ion-ios-heart-outline"></i>';
        }
    });
});

removeFromfav.forEach(function(el){
    el.addEventListener('click', function(e){

        e.preventDefault();

        if(!this.classList.contains('remove-from-fav-removed')){
            this.classList.add('remove-from-fav-removed');
            this.innerHTML = '<i class="ion-ios-heart-outline"></i>';
        } else {
            this.classList.remove('remove-from-fav-removed');
            this.innerHTML = '<i class="ion-ios-heart"></i>';
        }
    });
});

// Gift Aid Overlay

var giftAidToggle = document.getElementById('tax'),
    giftOverlay = document.querySelectorAll('.gift-overlay')[0],
    yesBtn = document.querySelectorAll('.yes')[0],
    noBtn = document.querySelectorAll('.no')[0];

if(giftAidToggle != null ){

    giftAidToggle.addEventListener('change', function(){
        if(this.checked){
            giftOverlay.classList.add('gift-overlay-visible');
        };
    });

    yesBtn.addEventListener('click', function(e){
        e.preventDefault();
        //console.log('yes');
        giftAidToggle.checked = true;
        giftOverlay.classList.remove('gift-overlay-visible');
    });

    noBtn.addEventListener('click', function(e){
        e.preventDefault();
        //console.log('no')
        giftAidToggle.checked = false;
        giftOverlay.classList.remove('gift-overlay-visible');
    });

    closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        giftAidToggle.checked = false;
        giftOverlay.classList.remove('gift-overlay-visible');
    });

};

// Show Ref, recent activity

var refToggle = document.querySelectorAll('.open-ref');

for(var i=0; i < refToggle.length; i++){
    refToggle[i].addEventListener('click', function(e){
        e.preventDefault();
        var thisNextSibling = this.nextElementSibling;
        if(!thisNextSibling.classList.contains('transaction-reference-visible')){
            this.innerHTML = '<i class="ion-eye-disabled"> </i>';
            this.title = 'Hide reference';
            thisNextSibling.classList.add('transaction-reference-visible');

        } else {
            this.innerHTML = '<i class="ion-eye"> </i>';
            this.title = 'Show reference';
            thisNextSibling.classList.remove('transaction-reference-visible');
        }
    });
};

// Delete Notifications

var deleteNotificationTrigger = document.querySelectorAll('.delete-not'),
    notBox = document.querySelector('.notifications');

// console.log(deleteNotificationTrigger)

for(var i=0; i < deleteNotificationTrigger.length; i++){
    var j = i;
    deleteNotificationTrigger[i].addEventListener('click', function(e){
        e.preventDefault();
        this.parentNode.parentNode.removeChild(this.parentNode);
        j -= 1;
        //console.log(j + 1, deleteNotificationTrigger.length);
         if(j + 1 == 0) {
            //notBox.remove();
            notBox.parentNode.removeChild(notBox);
         }
    });
};

// Type Numbers maxlength attribute

var inputNumber = document.querySelectorAll('[type="number"]');

for (i = 0; i < inputNumber.length; ++i) {
    inputNumber[i].addEventListener('input', function(){
        if (this.value.length > this.maxLength && this.hasAttribute('maxlength')){
            this.value = this.value.slice(0, this.maxLength)
        };
    });
};

// Exp Date

var inputExpDate = document.getElementById('exp-date');

if(inputExpDate != null) {
    inputExpDate.addEventListener('input', function(){

        if(this.value.length == 2){
            var thisValue = this.value;
            this.value = thisValue + '/';
        }
    });

    inputExpDate.addEventListener('keyup', function(e){

        if(e.keyCode == 8 && this.value.length == 3){
            var newValue = this.value.slice(0, -2);
            this.value = newValue;
        }
    });

};

// Scroll To
window.addEventListener('scroll', function(e) {
    
    var scrollToBtn = document.getElementsByClassName('scroll-down')[0];
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollToBtn != null){
        scrollToBtn.style.opacity = 1 - (scrollTop / 100);
        scrollToBtn.style.transform = 'translateY(-'+ scrollTop * 1.5 +'px)';
    }
});

//

var dontAsk = document.getElementsByClassName('dont-ask')[0];

if(dontAsk != null){
    dontAsk.addEventListener('click', function(e){
        e.preventDefault();
        this.classList.add('fade-out');
        setTimeout(function(){ dontAsk.parentNode.removeChild(dontAsk); }, 400);
        //this.parentNode.removeChild(this);
    });
};

// Home Bubble Slider

function getPreviousSiblings(el, filter) {
    var siblings = [];
    while (el = el.previousSibling) { if (!filter || filter(el)) siblings.push(el); }
    return siblings;
}

function getNextSiblings(el, filter) {
    var siblings = [];
    while (el = el.nextSibling) { if (!filter || filter(el)) siblings.push(el); }
    return siblings;
}

var elem = document.querySelector('.bubble-slider');
var flkty = new Flickity( elem, {
  // options
    cellAlign: 'center',
    contain: true,
	initialIndex: 1,
    prevNextButtons: false,
    watchCSS: true
});

if(document.querySelector('.flickity-enabled') != null){

    var currentItem = document.querySelector('.bubble-slider-item.is-selected'),
        prevItem = getPreviousSiblings(currentItem),
        nextItem = getNextSiblings(currentItem);

        prevItem.forEach(function(element) {
            element.classList.add('prev');
        });
        nextItem.forEach(function(element) {
            element.classList.add('next');
        });


    flkty.on( 'select', function(){
        var currentItem = document.querySelector('.bubble-slider-item.is-selected'),
        prevItem = getPreviousSiblings(currentItem),
        nextItem = getNextSiblings(currentItem);
        
        currentItem.classList.remove('prev');
        currentItem.classList.remove('next');
        
        prevItem.forEach(function(element) {
            element.classList.remove('next');
            element.classList.add('prev');
        });
        nextItem.forEach(function(element) {
            element.classList.remove('prev');
            element.classList.add('next');
        });
        
        
    } );

};


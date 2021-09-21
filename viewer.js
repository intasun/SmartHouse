"use strict";

var divMainContent = document.getElementById("mainContent");
var deviceSelect = document.forms.deviceCreator.children[0];
var locationSelect = document.forms.deviceCreator.children[1];
var submitBtn = document.forms.deviceCreator.children[2];
var devices = [];

function refresh(){
   divMainContent.innerHTML = "";
   var deviceItem;
   for (var item in devices){
      deviceItem = buildDeviceItem(devices[item]);
      divMainContent.appendChild(deviceItem);
   }
}

function removeArrElem(arr, elem){
   var indexElem = arr.indexOf(elem);
   if(indexElem !== -1){
      arr.splice(indexElem, 1);
   }
   return arr;
}

submitBtn.onclick = function() {
   var deviceValue = deviceSelect.value;
   var locationValue = locationSelect.value;
   var deviceItemObj;
   var newDeviceItem;
   if(locationValue === ""){
      alert("Please select location!")
   } else {
      switch(deviceValue) {
         case "AirConditioning":
            deviceItemObj = new AirConditioning(locationValue);
            devices.push(deviceItemObj);
            break;
         case "Fridge":
            deviceItemObj = new Fridge(locationValue);
            devices.push(deviceItemObj);
            break;
         case "Lamp":
            deviceItemObj = new Lamp(locationValue);
            devices.push(deviceItemObj);
            break;
         case "TvSet":
            deviceItemObj = new TvSet(locationValue);
            devices.push(deviceItemObj);
            break;
         default:
            alert("Please select device!")
            break;
      }
      newDeviceItem = buildDeviceItem(deviceItemObj);
      divMainContent.appendChild(newDeviceItem);
      //deviceSelect[0].selected = true;
      //locationSelect[0].selected = true;
   }
}


function getFildsByTypeFromObj(obj, type){
   var propArr = [];
   for (var prop in obj) {
      if (obj[prop] instanceof type) {
         propArr.push(obj[prop]);
      }
   }
   return propArr;
}


function buildDeviceItem(deviceObj){
   var newItem = document.createElement("div");
   newItem.setAttribute("class", "deviceItem");
   
   //creating itemHead
   var delButton = document.createElement("button");
   delButton.className = "del-btn";
   delButton.type = "button";
   delButton.innerHTML = "<b>x</b>";
   delButton.onclick = function(){
      var removeItem = this.parentElement.parentElement;
      divMainContent.removeChild(removeItem);
      devices = removeArrElem(devices, deviceObj)
   };
   
   var pHead = document.createElement("p");
   pHead.innerText = deviceObj.constructor.name + " in " + deviceObj.getLocation();

   var itemHead = document.createElement("div");
   itemHead.className = "itemHead";
   itemHead.appendChild(delButton);
   itemHead.appendChild(pHead);
   
   //adding switch
   var btnOn = document.createElement("button");
   btnOn.className = "switch-btn on";
   btnOn.type = "button";
   btnOn.value = "On";
   btnOn.innerText = "On";
   if(deviceObj.getSwitchState()){
      btnOn.style.boxShadow = "0 0 7px 2px springgreen";
   }
   btnOn.onclick = function() {
      deviceObj.on();
      refresh();
   };
   
   var btnOff = document.createElement("button");
   btnOff.className = "switch-btn off";
   btnOff.type = "button";
   btnOff.value = "Off";
   btnOff.innerText = "Off";
   if(!deviceObj.getSwitchState()){
      btnOff.style.boxShadow = "0 0 7px 2px salmon";
   }
   btnOff.onclick = function() {
      deviceObj.off();
      refresh();
   };
   
   var switchElem = document.createElement("div");
   switchElem.className = "switch";
   switchElem.appendChild(btnOn);
   switchElem.appendChild(btnOff);
   
   var itemBody = document.createElement("div");
   itemBody.className = "itemBody";
   itemBody.appendChild(switchElem);
   
   //adding ranges
   var ranges = getFildsByTypeFromObj(deviceObj, Range);
   var rangeNames = [];
   for (var item in ranges) {
      var pRange = document.createElement("p");
      pRange.innerText = ranges[item].getName() + ":";
      
      var rangeBtnGroup = document.createElement("div");
      rangeBtnGroup.className = "range-group " + ranges[item].getName();
      rangeNames.push(ranges[item].getName());
      
      var rangePrevBtn = document.createElement("button");
      rangePrevBtn.className = "range-btn previous";
      rangePrevBtn.type = "button";
      rangePrevBtn.value = "previous";
      rangePrevBtn.innerHTML = "&#9668;";
      rangePrevBtn.onclick = function() {
         if(deviceObj.getSwitchState()){
            var rangeName = this.parentElement.className.split(" ").pop();
            var rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].previousValue();
            refresh();
         }
      };
      
      var rangeInp = document.createElement("input");
      rangeInp.type = "text";
      if(deviceObj.getSwitchState()){
         rangeInp.value = ranges[item].currentValue();
      }
      rangeInp.onchange = function () {
         if(deviceObj.getSwitchState()) {
            var rangeName = this.parentElement.className.split(" ").pop();
            var rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].currentValue(this.value);
            refresh();
         }
      };
            
      var rangeNextBtn = document.createElement("button");
      rangeNextBtn.className = "range-btn next";
      rangeNextBtn.type = "button";
      rangeNextBtn.value = "next";
      rangeNextBtn.innerHTML = "&#9658;";
      rangeNextBtn.onclick = function() {
         if(deviceObj.getSwitchState()){
            var rangeName = this.parentElement.className.split(" ").pop();
            var rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].nextValue();
            refresh();
         }
      };
      
      rangeBtnGroup.appendChild(rangePrevBtn);
      rangeBtnGroup.appendChild(rangeInp);
      rangeBtnGroup.appendChild(rangeNextBtn);
      
      var range = document.createElement("div");
      range.className = "range";
      range.appendChild(pRange);
      range.appendChild(rangeBtnGroup);
      
      itemBody.appendChild(range);
   }

   //adding modes
   var modes = getFildsByTypeFromObj(deviceObj, Modes);
   for (var item in modes) {
      var pMode = document.createElement("p");
      pMode.innerText = modes[item].getName() + ":";
      
      var selectMode = document.createElement("select");
      selectMode.name = "modes";
      selectMode.onchange = function() {
         if(deviceObj.getSwitchState()){
            modes[item].currentMode(selectMode.value);
            refresh();
         }
      }
      
      var options = modes[item].getModes();
      var optMode;
      
      if(deviceObj.getSwitchState()){
         for (var opt = 0; opt < options.length; opt++) {
            optMode = document.createElement("option");
            optMode.value = options[opt];
            optMode.innerText = options[opt];
            selectMode.appendChild(optMode);
            if(optMode.value === modes[item].currentMode() && deviceObj.getSwitchState()) {
               optMode.selected = true;
            } else {
               optMode.selected = false;
            }
         }
      }
      
      var modeDiv = document.createElement("div");
      modeDiv.className = "mode";
      modeDiv.appendChild(pMode);
      modeDiv.appendChild(selectMode);
      
      itemBody.appendChild(modeDiv);
   }
     
   //creating itemFoot
   var pFoot = document.createElement("p");
   pFoot.innerText = deviceObj.info();
   
   var itemFoot = document.createElement("div");
   itemFoot.className = "itemFoot";
   itemFoot.appendChild(pFoot);
   
   newItem.appendChild(itemHead);
   newItem.appendChild(itemBody);
   newItem.appendChild(itemFoot);
   
   return newItem;
}
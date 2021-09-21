"use strict";

//type Switch
function Switch () {
   this._state = false;
 };
Switch.prototype.state = function (booleanValue) {
   if (booleanValue === undefined) {
      return this._state;
   } else {
      this._state=booleanValue;
   }
};


//type Range
function Range(nameRange, minValue, maxValue) {
   this._name = nameRange;
   this._minValue = minValue;
   this._maxValue = maxValue;
   this._currentValue = minValue;
};
Range.prototype.currentValue = function (newCurrentValue) {
   if (newCurrentValue === undefined) {
      return this._currentValue;
   } else {
      if (newCurrentValue >= this._minValue && newCurrentValue <= this._maxValue) {
         this._currentValue = newCurrentValue;
      }
   }
};
Range.prototype.previousValue = function() {
   if (this._currentValue > this._minValue) {
      this._currentValue--;
   }
};
Range.prototype.nextValue = function() {
   if (this._currentValue < this._maxValue) {
      this._currentValue++;
   }
};
Range.prototype.getName = function() {
   return this._name;
};



//type Modes
function Modes(nameModes, modesArr) {
   this._name = nameModes;
   this._modes = modesArr;
   this._currentMode = this._modes[0];
};
Modes.prototype.currentMode = function(newCurrentMode) {
   if (newCurrentMode === undefined) {
      return this._currentMode;
   } else {
      if(this._modes.indexOf(newCurrentMode) !== -1) {
         this._currentMode = newCurrentMode;
      }
   }
};
Modes.prototype.getName = function() {
   return this._name;
};
Modes.prototype.getModes = function() {
   return this._modes;
};


//Device
function Device (locationName){
   this._locationName = locationName;
   this._switch = new Switch();
};
Device.prototype.getLocation = function(){
   return this._locationName;
};
Device.prototype.on = function() {
   this._switch.state(true);
};
Device.prototype.off = function() {
   this._switch.state(false);
};
Device.prototype.getSwitchState = function() {
   return this._switch.state();
};
Device.prototype.info = function() {
   if(this._switch.state()) {
      return "Device is on. "; 
   } else {
      return "Device is off. "; 
   }
};

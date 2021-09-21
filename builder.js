"use strict";

//Lamp
function Lamp(locationName){
   Device.call(this, locationName);
};
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;


//AirConditioning
function AirConditioning(locationName) {
   Device.call(this, locationName);
   this._temperature = new Range("Temperature", 15, 40);
   this._modes = new Modes("Mode", ["Cool", "Heat", "Dry", "Air"]);
};
AirConditioning.prototype = Object.create(Device.prototype);
AirConditioning.prototype.constructor = AirConditioning;

AirConditioning.prototype.info = function(){
   var info = Device.prototype.info.call(this);
   if(Device.prototype.getSwitchState.call(this)){
      info += this._temperature.getName() + ":" + this._temperature.currentValue();
      info += ". " + this._modes.getName() + ":" + this._modes.currentMode();
   }
   return info;
};


//TvSet
function TvSet(locationName) {
   Device.call(this, locationName);
   this._volume = new Range("Volume", 0, 85);
   this._channels = new Range("Channel", 1, 28);
};
TvSet.prototype = Object.create(Device.prototype);
TvSet.prototype.constructor = TvSet;

TvSet.prototype.info = function(){
   var info = Device.prototype.info.call(this);
   if(Device.prototype.getSwitchState.call(this)){
      info += this._volume.getName() + ":" + this._volume.currentValue();
      info += ". " + this._channels.getName() +  ":" + this._channels.currentValue();
   }
   return info;
};


//Fridge
function Fridge(locationName) {
   Device.call(this, locationName);
   this._temperature = new Range("Temperature", -5,10);
   this._modes = new Modes("Mode", ["Freez", "Cold", "Frost"]);
};
Fridge.prototype = Object.create(Device.prototype);
Fridge.prototype.constructor = Fridge;

Fridge.prototype.info = function(){
   var info = Device.prototype.info.call(this);
   if(Device.prototype.getSwitchState.call(this)){
      info += this._temperature.getName() + ":" + this._temperature.currentValue();
      info += ". " + this._modes.getName() + ":" + this._modes.currentMode();
   }
   return info;
};
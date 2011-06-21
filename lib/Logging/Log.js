var color = require("ansi-color").set;

var COLORS = {
  "info": "black",
  "error": "red+bold",
  "warn": "green",
  "debug": "magenta",
  "fatal": "black+yellow_bg+bold",
}

var Logger = Klass({
  statics: {
    logThis: function (str, type) {
      var now = new Date();
      //var formated_date = now.format("dddd, mmmm dS, yyyy, h:MM:ss TT");
      console.log(now + " ", color(type.toUpperCase(), COLORS[type]),  ": " + str);
    }, 

    info: function (str) {
      this.logThis(str, 'info');
    },

    error: function (str) {
      this.logThis(str, 'error');
    },

    debug: function (str) {
      this.logThis(str, 'debug');
    },

    warn: function (str) {
      this.logThis(str, 'warn');
    },

    fatal: function (str) {
      this.logThis(str, 'fatal');
    }
  }
});


module.exports = Logger;

var color = require("ansi-color").set;

var COLORS = {
  "info": "white",
  "error": "red+bold",
  "warn": "green",
  "debug": "magenta",
  "fatal": "black+yellow_bg+bold",
}

var Logger = Klass({
  statics: {
    logThis: function (str, type) {
      var now = new Date();
      if (type != 'debug') {
        console.log("[" + now + "]", color(type.toUpperCase(), COLORS[type]),  ": " + str);
      } else {
        console.log(color(str, COLORS['debug']));
      }
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

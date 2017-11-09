/**
 * Created by gramachandran on 09/11/17.
 */
OO.plugin("sherlock", function (OO, _, JQ, W) {

  /**
   * Sherlock Plugin Module
   *
   * Parameters:
   * OO, namespace for Player
   * _, a reference to underscore.js lib.
   * JQ, a reference to jQuery lib.
   * W, a reference to window object.
   */
  var PlugIn = {};

  // A constructor for the module class
  PlugIn.sherlock = function (mb, id) {
    this.mb = mb; // save message bus reference for later use
    this.id = id;
    this.init();
  };

  // public functions of the module object
  PlugIn.sherlock.prototype = {
    init: function () {
      console.log('Initialising sherlock plugin for ooyala player...');
      // jQuery - pull for Bacon
      JQ.getScript('https://cdnjs.cloudflare.com/ajax/libs/bacon.js/0.7.95/Bacon.min.js', function () {
        {
          resetFeed();
          var intervalID = window.setInterval(feedTimer, 1000);
          window.mouselist = [];
          window.mousecount = 0;
          window.seconds = [];
          window.second = 1;

          function feedTimer() {
            // Your code here
            if (window.pp && pp.getState() === "playing") {
              sendFeed();
              window.mousecount = 0;
              window.second++;
            }
          }

          function resetFeed() {
            $.post("http://localhost:3000/feeds/reset",
              {
                count: window.mousecount,
                seconds: window.second
              },
              function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
              });
          }

          function sendFeed() {
            $.post("http://localhost:3000/feeds",
              {
                count: window.mousecount,
                second: parseInt(pp.getPlayheadTime()) //window.second
              },
              function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
              });
          }
          console.log("Bacon -",Bacon);
          var signsOfWindowLife = Bacon.mergeAll(
            $(window).asEventStream('focus'),
            $(window).asEventStream('click'),
            $(window).asEventStream('scroll'),
            $(window).asEventStream('mousemove'),
            $(window).asEventStream('touchstart'),
            $(window).asEventStream('touchend'),
            $(window).asEventStream('touchcancel'),
            $(window).asEventStream('touchleave'),
            $(window).asEventStream('touchmove')
          );
          console.log("signsOfLife ", signsOfWindowLife);
          signsOfWindowLife.onValue(function (val) {
            window.mousecount = window.mousecount + 1;
          });
        }
      });
      console.log("page visibility api");
      // Set the name of the hidden property and the change event for visibility
      var hidden, visibilityChange;
      if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
      }
      function handleVisibilityChange() {
        if (document[hidden]) {
          pp.pause();
        } else {
          pp.play();
        }
      }

      // Warn if the browser doesn't support addEventListener or the Page Visibility API
      if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
      } else {
        // Handle page visibility change
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
      }
    },
    __end_marker: true
  };
  // Return the constructor of the module class.
  return PlugIn.sherlock;
});
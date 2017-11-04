var express = require('express');
var router = express.Router();
let distractions = [];
let seconds = [];
let maxSecond = 1;
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({"distractions": distractions, "seconds": seconds,"maxSecond":maxSecond});
});

router.post('/', function (req, res, next) {
  console.log("req", req.body);
  distractions.push(parseInt(req.body.count));
  let second = parseInt(req.body.second);
  maxSecond = second > maxSecond ? second : maxSecond;
  seconds.push(second);
  res.send('done');
});


//reset is temporary one for the demo. It won't be necessery when we get the feeds per browser session. But that is for future.
router.post('/reset', function (req, res, next) {
  distractions = [];
  seconds = [];
  res.send('done');
});

module.exports = router;

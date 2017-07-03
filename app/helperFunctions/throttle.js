export default function(func, delay) {
  let called = false,
      throttled = false,
      args = null;
  var fn = function() {
    args = arguments;
    if(throttled) {
      called = true;
    } else {
      func.apply(this, args);
      called = false;
      throttled = true;
      setTimeout(check, delay);
    }
  }
  function check() {
    if(called) {
      func.apply(this, args);
      called = false;
      throttled = true;
      setTimeout(check, delay);
    } else {
      called = false;
      throttled = false;
    }
  }
  return fn;
}
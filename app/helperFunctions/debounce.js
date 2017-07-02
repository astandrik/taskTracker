export default function debounce(fun, delay) {
    let called = false,
        timeout = null,
        args = null;
    var fn = function() {
      args = arguments;
      if(!called) {
        called = true;
      } else {
        clearTimeout(timeout);
        called = true;
      }
      timeout = setTimeout(() => {
          fun.apply(this,args);
          called = false;
        }, delay);
    }
    return fn;
}
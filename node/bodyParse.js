const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function Post(text, date) {
  let splitted =  date.split(" ");
  let newDate = splitted[0].split("/"),
      time = splitted[2];
  let c = newDate[1];
  newDate[1] = newDate[0];
  newDate[0] = c;
  return {text: text.replace(/\t|\n/g,''), timestamp: new Date((newDate.join('/') + " " + time).trim()).getTime()};
}

module.exports = function(body) {
  var dom = new JSDOM(body);
  let elements = Array.prototype.slice.call(dom.window.document.querySelectorAll(".thread .oppost"));
  elements = elements.map( x => Post(x.getElementsByClassName("post-message")[0].textContent, x.getElementsByClassName('posttime')[0].textContent));
  elements.sort((a,b) => b.timestamp - a.timestamp)
  return elements;
}
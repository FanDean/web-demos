//alert("Hello app");
//alert(require('./people.js'));
let cats = require('./cats.js');
let $ = require('jquery');
require("!style-loader!css-loader!./style.css");

$("body").append("<h1>" + cats[0] + "</h1>");
console.log($);
console.log(cats[1]);
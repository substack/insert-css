var test = require('tape');
var insertCss = require('../');
var computedStyle = require('computed-style');

var css = 'body { background-color: purple; color: yellow; }';

test(function (t) {
    t.plan(6);
    
    var before = colors();
    t.ok(before.bg === 'rgba(0,0,0,0)' || before.bg === 'transparent');
    t.ok(before.fg === 'rgb(0,0,0)' || before.fg === '#000000');
    
    insertCss(css);
    
    var after = colors();
    t.ok(after.bg === 'rgb(128,0,128)' || after.bg === 'purple');
    t.ok(after.fg === 'rgb(255,255,0)' || after.fg === 'yellow');

    var resetStyle = 'body { background-color: transparent; color: #000000; }';
    insertCss(resetStyle);

    var reset = colors();
    t.ok(reset.bg === 'rgba(0,0,0,0)' || reset.bg === 'transparent');
    t.ok(reset.fg === 'rgb(0,0,0)' || reset.fg === '#000000');
});

function colors () {
    var body = document.getElementsByTagName('body')[0];
    return {
      fg: style('color'),
      bg: style('background-color')
    };

    function style(attr) {
      return computedStyle(body, attr).replace(/\s/g, '');
    }
}

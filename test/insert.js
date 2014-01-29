var test = require('tape');
var insertCss = require('../');

var css = 'body { background-color: purple; color: yellow; }';

test(function (t) {
    iePolyfil();
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
    var style = window.getComputedStyle(body);
    return {
        bg: style.backgroundColor.replace(/\s+/g, ''),
        fg: style.color.replace(/\s+/g, '')
    };
}

function iePolyfil() {
  // getComputedStyle https://raw.github.com/jonathantneal/Polyfills-for-IE8/master/getComputedStyle.js
  !('getComputedStyle' in this) && (this.getComputedStyle = (function () {
    function getPixelSize(element, style, property, fontSize) {
      var
      sizeWithSuffix = style[property],
      size = parseFloat(sizeWithSuffix),
      suffix = sizeWithSuffix.split(/\d/)[0],
      rootSize;

      fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
      rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

      return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
    }

    function setShortStyleProperty(style, property) {
      var
      borderSuffix = property == 'border' ? 'Width' : '',
      t = property + 'Top' + borderSuffix,
      r = property + 'Right' + borderSuffix,
      b = property + 'Bottom' + borderSuffix,
      l = property + 'Left' + borderSuffix;

      style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
                         : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
                         : style[l] == style[r] ? [style[t], style[r], style[b]]
                         : [style[t], style[r], style[b], style[l]]).join(' ');
    }

    function CSSStyleDeclaration(element) {
      var
      currentStyle = element.currentStyle,
      style = this,
      fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

      for (property in currentStyle) {
        if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
          style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
        } else if (property === 'styleFloat') {
          style['float'] = currentStyle[property];
        } else {
          style[property] = currentStyle[property];
        }
      }

      setShortStyleProperty(style, 'margin');
      setShortStyleProperty(style, 'padding');
      setShortStyleProperty(style, 'border');

      style.fontSize = fontSize + 'px';

      return style;
    }

    CSSStyleDeclaration.prototype = {
      constructor: CSSStyleDeclaration,
      getPropertyPriority: function () {},
      getPropertyValue: function ( prop ) {
        return this[prop] || '';
      },
      item: function () {},
      removeProperty: function () {},
      setProperty: function () {},
      getPropertyCSSValue: function () {}
    };

    function getComputedStyle(element) {
      return new CSSStyleDeclaration(element);
    }

    return getComputedStyle;
  })(this));
}

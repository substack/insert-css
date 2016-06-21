var inserted = {};
var styleElements = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;

    options = options || {};

    var position = options.prepend ? 'prepend' : 'append';

    var styleElement = styleElements[position];

    if (!styleElement) {
      styleElement = styleElements[position] = document.createElement('style');
      styleElement.setAttribute('type', 'text/css')
    }

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText += css
    } else {
      styleElement.appendChild(document.createTextNode(css))
    }

    var head = document.getElementsByTagName('head')[0];

    if (position === 'prepend') {
        head.insertBefore(styleElement, head.childNodes[0]);
    } else {
        head.appendChild(styleElement);
    }

    return styleElement;
};

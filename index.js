var inserted = {};
var styleElements = {};

module.exports = function (css, options) {
    options = options || {};

    var position = options.prepend ? 'prepend' : 'append';
    var container;

    if (options.container !== undefined) {
        container = options.container;
    } else {
        container = document.querySelector('head');
    }

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

    if (position === 'prepend') {
        container.insertBefore(styleElement, container.childNodes[0]);
    } else {
        container.appendChild(styleElement);
    }

    return styleElement;
};

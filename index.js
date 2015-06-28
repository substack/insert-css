module.exports = function (css, options) {
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var parent = (options && options.parent) ||
        document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        parent.insertBefore(elem, parent.childNodes[0]);
    } else {
        parent.appendChild(elem);
    }
};

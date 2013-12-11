var inserted = {};

module.exports = function (css) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');
    'textContent' in elem ?
        elem.textContent = css
        :
        elem.styleSheet.cssText = css
    ;
    
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(elem);
};

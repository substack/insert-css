var inserted = [];
var elem;

module.exports = function (css) {
    if (inserted.indexOf(css) >= 0) return;
    inserted.push(css);

    var text = document.createTextNode(css);
    if (elem) return elem.appendChild(text);
    
    elem = document.createElement('style');
    elem.appendChild(text);
    
    if (document.head.childNodes.length) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
    }
    else {
        document.head.appendChild(elem);
    }
};

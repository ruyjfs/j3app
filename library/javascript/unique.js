Array.prototype.unique = function() {
    var a = [],k = 0,e;
    for(k=0;e=this[k];k++)
        if(a.indexOf(e)==-1)
            a.push(e);
    return a;
};
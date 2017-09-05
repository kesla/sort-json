module.exports = visit;

function visit(old, mainKey) {
    if (typeof(old) !== 'object' || old === null) {
        return old;
    }
    var copy = Array.isArray(old) ? [] : {};
    if (mainKey === null){
    	var keys = Object.keys(old).sort();
        keys.forEach(function(key) {
            copy[key] = visit(old[key], null);
        });
    } else {
    	var type = typeof(old[0][mainKey]);
    	for (var x = 0; x < old.length; x++){
    		old.sort(function(a, b){
    			if (type !== 'number')
    				return (a[mainKey] < b[mainKey]);
    			else
    				return (a[mainKey] - b[mainKey])
    		});
    	}
    	return (old);
    }
    return copy;
}

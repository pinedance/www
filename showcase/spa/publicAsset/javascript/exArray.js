////

Array.prototype.intersection = function(b){
	return this.filter(function(i) {return b.indexOf(i) != -1 });
};

Array.prototype.diff = function(b) {
	return this.filter(function(i) {return b.indexOf(i) < 0;});
};

////

Array.prototype.now = 0;

Array.prototype.next = function() {
			var i = ++this.now;
			var l = this.length;
			if(l == 0){
				this.now = 0;
				return this[0];
			} else if(i == l){
				this.now = 0;
				return this[0];
			} else {
				return this[i];
			}
		};
		
Array.prototype.prev = function() {
	var i = --this.now;
	var l = this.length;
	if(l == 0){
		this.now = 0;
		return this[0];
	} else if(i < 0){
		this.now = l - 1;
		return this[this.now];
	} else {
		return this[i];
	}
};
		
Array.prototype.current = function(){
	return this[this.now];
};		


////
Array.prototype.search = function(key, value){
    for (var i=0; i < this.length; i++) {
        if (this[i][key] === value) {
            return this[i];
        } else {
        	return false;
        }
    }
};

Array.prototype.sortby = function(key){
	this.sort( 
		function(a, b){
			if (a[key] < b[key]){return -1};
			if (a[key] > b[key]){return 1};
			return 0;
		}
	);
};

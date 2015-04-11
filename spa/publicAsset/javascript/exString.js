String.prototype.gsub = function(bf, af){
    var all_bf = new RegExp(bf, "g");
    return this.replace(all_bf, af);
}; // http://stackoverflow.com/questions/7951768/does-something-similar-to-gsub-exist-in-javascript
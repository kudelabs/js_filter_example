function filter(id, criteria) {
    var container = $(id);
    if (!container) { return; }
    
	container.select('.no_matched_notice').each(function(elem) {
		elem.remove();
	});
    //no_matched_notice = $('no_matched_notice');
    var notice_msg = 'No matching data found!';
    //if (no_matched_notice) no_matched_notice.remove();

	var empty_input = criteria.blank();
	//filter_reg = new RegExp(criteria,"i");
	// Wu: using regular expression is too complicated, need to escape a lot of characters, e.g. [] + ?...
	var keys = criteria.split(" ").invoke("strip").compact().without('');
    
    var matched_none = true;
    container.childElements().each(function(elem) {
    	// if the user doesn't input anything, then show all the elements
		if (!elem.matched_strs || empty_input) {
			Element.show(elem);
			return;
		}

		var matched_count = 0;
	
		keys.each(function(k) {
			for (i = 0; i < elem.matched_strs.size(); i++) {
				str = elem.matched_strs[i];
				if (str.toUpperCase().indexOf(k.toUpperCase()) != -1) {
					matched_count += 1;
					break;
				}					
			}				
		});
	
  		if (matched_count == keys.size()) {
			Element.show(elem);
			matched_none = false;
		} else Element.hide(elem);
    });

    
    if (matched_none && !empty_input) {
        var tag = container.tagName;
        var ins = null;
        switch (tag) {
            case "TBODY":
            case "TABLE":
                ins = new Insertion.Bottom(container, "<tr class=\"no_matched_notice light\"><td colspan='100'>" + notice_msg + "</td></tr>");
                break;
            case "OL":
            case "UL":
                ins = new Insertion.Bottom(container, "<li class=\"no_matched_notice light\">" + notice_msg + "</li>");
                break;
            default:
                ins = new Insertion.Bottom(container, "<" + tag + "  class=\"no_matched_notice light\">" + notice_msg + "</" + tag + ">");
                break;
        }
    }
}
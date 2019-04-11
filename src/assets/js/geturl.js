(function ($) {
    $.extend({
     Request: function (m) {
      var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
      return sValue ? sValue[1] : sValue;
     },
     UrlUpdateParams: function (url, name, value) {
      var r = url;
      if (r != null && r != 'undefined' && r != "") {
       value = encodeURIComponent(value);
       var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
       var tmp = name + "=" + value;
       if (url.match(reg) != null) {
        r = url.replace(eval(reg), tmp);
       }
       else {
        if (url.match("[\?]")) {
         r = url + "&" + tmp;
        } else {
         r = url + "?" + tmp;
        }
       }
      }
      return r;
     }
    
    });
   })(jQuery);
(function(d3) {
  "use strict";
  /* TODO: insert your code here */

  d3.json("/api/delphi", function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data", data)
  });

})(d3);

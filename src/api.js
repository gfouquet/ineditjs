$(document).on("click", ".ind-view", function(event) {
  console.log("onclick .ind-view")
  console.log(event.currentTarget)

  var $tgt = $(event.currentTarget);
  var $ind = $(".inedit[data-ind-id=" + $tgt.data("indId") + "]");
  console.log("ind", $ind);
  $ind.inedit("edit", event);
});

$(document).on("click", ".ind-btn.ind-btn-ok", function(event) {
  console.log("onclick .ind-ok", $(".edit"))
  console.log(event.currentTarget)

  var $tgt = $(event.currentTarget);
  var $ind = $(".inedit[data-ind-id=" + $tgt.data("indId") + "]");
  console.log("ind", $ind);
  $ind.inedit("submit", event);
});

$(document).on("click", ".ind-btn.ind-btn-cancel", function(event) {
  console.log("onclick .ind-ok", $(".edit"))
  console.log(event.currentTarget)

  var $tgt = $(event.currentTarget);
  var $ind = $(".inedit[data-ind-id=" + $tgt.data("indId") + "]");
  console.log("ind", $ind);
  $ind.inedit("cancel", event);
});

$(function() {
  $(".inedit").inedit();
});

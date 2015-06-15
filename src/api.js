/**
 * Returns the `.inedit` $element which matches the given event target
 * @param event a DOM event triggered by an `.inedit` sub-element
 * @returns {*|jQuery|HTMLElement}
 */
function $tgtInd(event) {
  return $(".inedit[data-ind-id=" + event.currentTarget.getAttribute("data-ind-id") + "]");
}

$(document).on("click", ".ind-view:not(.ind-static)", function(event) {
  $tgtInd(event).inedit("edit", event);
});

$(document).on("click", ".ind-btn.ind-btn-ok", function(event) {
  $tgtInd(event).inedit("submit", event);
});

$(document).on("click", ".ind-btn.ind-btn-cancel", function(event) {
  $tgtInd(event).inedit("cancel", event);
});

$(function() {
  console.log("domready")
  $(".inedit").inedit();
});

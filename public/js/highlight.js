var isMouseDown = false;
var isMouseMove = false;
var book = document.getElementById("book")
document.onmousedown = function () {
    isMouseMove = false;
    isMouseDown = true
};
document.onmouseup = function () {
    if (isMouseMove == true) {
        highlight("#dee"); //#af9
    }
    isMouseMove = false;
    isMouseDown = false
};
document.onmousemove = function () {
    isMouseMove = true;
    if (isMouseDown) { /* do drag things */ }
};

var count = 0;

function highlight(color) {
    var span = document.createElement("span");
    var anchor = document.createElement("a");
    span.style.backgroundColor = "" + color;
    span.id = "highLight" + count;
    span.className = "userHighlights";

    var comment = document.createElement("div");

    // Styles
    comment.style.backgroundColor = "#f4f4f4";
    comment.style.width = "20vw";
    comment.innerHTML = "Write your annotation here.";
    comment.id = "comment" + count;
    comment.style.display = "hide";
    comment.contentEditable = "false";
    comment.className = "annotationedNotes";
    comment.style.padding = "15px";
    comment.style.marginRight = "30px";
    comment.style.minHeight = "250px"

    // Double click editing
    comment.ondblclick = function () {
        this.contentEditable = true;

        //Some sort of thing to know hwat you are editing...
        // span.style.fontWeight = "bold";
    }
    comment.onblur = function () {
        this.contentEditable = false;
    }


    // Hide the annotated notes and etc
    span.addEventListener("click", function () {
        //var comm = document.getElementById("comment" + count);
        var divider = document.getElementById("hLine");
        divider.style.backgroundColor = "#90EE90"

        if (comment.style.display == "none") {
            // Hide all other elements
            var elems = document.getElementsByClassName("annotationedNotes");
            for (var i = 0; i < elems.length; i++) {
                elems[i].style.display = "none";
            }

            comment.style.display = "block";
        } else {
            comment.style.display = "none";
        }
    });

    span.addEventListener("mouseover", function () {

        span.style.backgroundColor = "#a2efa2";
    });

    span.addEventListener("mouseleave", function () {
        span.style.backgroundColor = "#deefdc";
    });

    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(anchor);
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    document.getElementById("comments").appendChild(comment);
    count += 1;

    // Hide all other annotations
    var elems = document.getElementsByClassName("annotationedNotes");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = "none";
    }
    comment.style.display = "block";
    //
    //
}


// ENABLE FIXED SCROLLING
$(window).scroll(function () {
    $("#comments").css("top", Math.max(0, 250 - $(this).scrollTop()));
});
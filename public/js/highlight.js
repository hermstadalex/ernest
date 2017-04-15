var isMouseDown = false;
var isMouseMove = false;
var book = document.getElementById("book")
document.onmousedown = function() { isMouseMove = false; isMouseDown = true  };
document.onmouseup   = function() { 
    if( isMouseMove == true ) {
        highlight("#af9");
    }
    isMouseMove = false;
    isMouseDown = false 
};
document.onmousemove = function() { isMouseMove = true; if(isMouseDown) { /* do drag things */ } };

var count = 0;

function highlight(color) {
    var span = document.createElement("span");
    span.style.backgroundColor = "" + color;
    span.id = "highLight" + count;
    var comment = document.createElement("div");

    // Styles
    comment.style.backgroundColor = "rgba(24, 163, 52, .7)";
    comment.style.width = "100%";
    comment.innerHTML = "This is some text" + count;
    comment.id = "comment" + count;
    comment.style.display = "hide";
    comment.contentEditable = "false";
    comment.className = "annotationedNotes";

    // Double click editing
    comment.ondblclick= function() { 
        this.contentEditable=true;

        //Some sort of thing to know hwat you are editing...
        // span.style.fontWeight = "bold";
    }
    comment.onblur = function() { 
        this.contentEditable=false;
    }


    // Hide the annotated notes and etc
    span.addEventListener("click", function () {
        //var comm = document.getElementById("comment" + count);
        if (comment.style.display == "none"){
            // Hide all other elements
            var elems = document.getElementsByClassName("annotationedNotes");
            for(var i = 0; i < elems.length; i++) {
                elems[i].style.display = "none";
            }

            comment.style.display = "block";
        } else {
            comment.style.display = "none";
        }

        console.log("OK");
    });


    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    document.getElementById("comments").appendChild(comment);
    count += 1;

    var elems = document.getElementsByClassName("annotationedNotes");
        for(var i = 0; i < elems.length; i++) {
            elems[i].style.display = "none";
        }
        comment.style.display = "block";
}

   var $window = $(window),
       $stickyEl = $('#comment0'),
       elTop = $stickyEl.offset().top;

   $window.scroll(function() {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });
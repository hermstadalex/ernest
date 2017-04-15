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
// class Pair {
//     constr
//}

function highlight(color) {
    var span = document.createElement("span");
    span.style.backgroundColor = "" + color;
    span.id = "highLight" + count;
    var comment = document.createElement("div");

    // Styles
    comment.style.backgroundColor = "green";
    comment.style.width = "100%";
    comment.style.height = "100px";
    comment.innerHTML = "This is some text" + count;
    comment.id = "comment" + count;
    comment.style.display = "hide";
    comment.contentEditable = "false";

    // Double click editing
    comment.ondblclick= function() { 
        this.contentEditable=true;
        this.className='inEdit';
        //Some sort of thing to know hwat you are editing...
        // span.style.fontWeight = "bold";
    }
    comment.onblur = function() { 
        this.contentEditable=false;
        this.className='';
    }



    span.addEventListener("click", function () {
        //var comm = document.getElementById("comment" + count);
        if (comment.style.display == "none"){
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
}

//
// AI CREATED ANNOTATIONS
//
var elems = document.getElementsByClassName("aiHighlight");
for (var i = 0; i < elems.length; i++) {
    // Doing a function makes each one unique
    aiCreation();
}

function aiCreation() {
    var comment = document.createElement("div");

    // Styles
    comment.style.backgroundColor = "#f4f4f4";
    comment.style.width = "20vw";
    comment.innerHTML = "<b>Ernest.ai suggested this annotation for you! </b>";
    comment.id = "comment" + count;
    comment.style.display = "none";
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
    elems[i].addEventListener("mouseover", function () {

        this.style.backgroundColor = "#bcd1ff";
    });

    elems[i].addEventListener("mouseleave", function () {
        this.style.backgroundColor = "#e2ebff";
    });

    document.getElementById("comments").appendChild(comment);

    // Event to hide all other notes after you click this one
    elems[i].addEventListener("click", function () {
        if (comment.style.display == "none") {
            // Hide all other elements
            var d = document.getElementsByClassName("annotationedNotes");
            for (var i = 0; i < d.length; i++) {
                d[i].style.display = "none";
            }
            comment.style.display = "block";
        } else {
            comment.style.display = "none";
        }
    });
}

// HIDE ALL ANNOTATIONED NOTES
var elems = document.getElementsByClassName("annotationedNotes");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = "none";
    }

//
//  END OF AI CREATED ANNOTATIONS
//

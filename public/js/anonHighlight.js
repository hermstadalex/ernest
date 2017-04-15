var other = document.getElementById("anonAnnotate");
anonCreation();
function anonCreation() {
    var comment = document.createElement("div");

    // Styles
    comment.style.backgroundColor = "#f4f4f4";
    comment.style.width = "20vw";
    comment.innerHTML = "<b>This sentence really speaks about how Holmes is overly encapsulated by his work. He was great at his trade, but his work was driving him farther away from others. <br> <br> - Shannon L.</b>";
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
    other.addEventListener("mouseover", function () {

        this.style.backgroundColor = "#ffd87c";
    });

    other.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "#ffebbc";
    });

    document.getElementById("comments").appendChild(comment);

    // Event to hide all other notes after you click this one
    other.addEventListener("click", function () {
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
var enterButton = document.getElementById("enter");
var pdfButton = document.getElementById("generate");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength(){
	return input.value.length;
} 

function listLength(){
	return item.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	input.value = "";


	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);

	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);

	function deleteListItem(){
		li.classList.add("delete")
	}

}


function addListAfterClick(){
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which ===13) {
		createListElement();
	}
}

function generatePDF() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
var today = dd + '/' + mm + '/' + yyyy;
    if (ul.childElementCount > 0)  {
    var doc = new jsPDF();
    doc.text(today+' - TO DO LIST',10,10);
    for(var i=0;i<ul.children.length;i++)
    {
        doc.text(ul.children[i].firstChild.data,10,(i+2)*10);
    }
    doc.save(today+'_toDoList.pdf');
    }
}


enterButton.addEventListener("click",addListAfterClick);
pdfButton.addEventListener("click",generatePDF);

input.addEventListener("keypress", addListAfterKeypress);
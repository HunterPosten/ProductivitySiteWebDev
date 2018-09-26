
var currentslide = [];
var tasks;
var sortmethod;
var addorder = [];

function openshadowbox(index){
	currentslide = index;
	console.log("openshadowbox function called");
	var box = document.getElementById("shadow");
	box.style.display = "block";
	currentimg(index);
}

function currentimg(index){
	console.log("currentimg called");
	var imgs = ["squidward.jpg", "old.jpg","tree.jpg", "bigrocks.jpg","arch.jpg",'arizona.jpg','camera.jpg','cave.jpg', 'chair.jpg','cow.jpg','feild.jpg','work.jpg',"birds.jpg","bridge.jpg","dry.jpg","hill.jpg","mud.jpg","sheep.jpg","skate.jpg","train.jpg"];
	var shadowimg = document.getElementById("boximg");
	shadowimg.src = imgs[index];
	
}

function nextslide(){
	currentslide = (currentslide + 1) %20;
	currentimg(currentslide);
}

function prevslide(){
	currentslide = (currentslide -1);
	if (currentslide < 0) {
		currentslide = 19;
	}
	currentimg(currentslide);
}

function slideshow(){
	setTimeout(slideshow,10000);
	nextslide();
	slideshow();
}


document.onkeydown = function(evt){

	evt = evt || window.event;
	var code = evt.keyCode;

	console.log(code);
	if(code == 37){
		prevslide();
	}
	else if(code == 39){
		nextslide();
	}
	else if(code == 27){
		closeshadowbox();
	}
}





function closeshadowbox(){
	console.log("closeshadowbox called");
	var box = document.getElementById("shadow");
	box.style.display = "none";
}



function addtask(){
	var newtask;
	var desc;
	var datetime;
	var cat;
	var addtime;
	console.log("addtask called");

	desc=document.getElementById("descriptionIN").value;
	datetime=document.getElementById("datetimeIN").value;
	cat=document.getElementById("categoryIN").value.replace("T", " : ");
	

	console.log(desc);
	console.log(datetime);
	console.log(cat);

	newtask = {desc, datetime, cat};
	currentslide.push(newtask);
	addorder.push(newtask);

	display();
	console.log(currentslide);

}


function sort(x){
	var sortedlist = [];
	console.log('original order =:');
	console.log(addorder);
	console.log(x);
	if(x == 1){
		//sort by category
		for (var i = 0; i < currentslide.length; i++){
			if(currentslide[i].cat == "School"){
				console.log("school item found");
				sortedlist.push(currentslide[i])
			}
		}

		for (var i = 0; i < currentslide.length; i++){
			if(currentslide[i].cat == "Work"){
				console.log("work item found");
				sortedlist.push(currentslide[i]);
			}
		}

		for (var i = 0; i < currentslide.length; i++){
			if(currentslide[i].cat == "Liesure"){
				console.log("Liesure item found");
				sortedlist.push(currentslide[i]);
			}
		}

		for (var i = 0; i < currentslide.length; i++){
			if(currentslide[i].cat == "Chores"){
				console.log("chores item found");
				sortedlist.push(currentslide[i]);
			}
		}
		
		currentslide = sortedlist;
		display();
	}
	else if(x == 2){
		//sort by duedate

		//converting object datetime to epoch
		for (var i = 0; i < currentslide.length; i++) {
			
			var epoch = Date.parse(currentslide[i].datetime);
			
			//var datestr = currentslide[i].datetime.split('T');
			
			currentslide[i].epoch = epoch;
		}

		var sourcearray = []
		sourcearray = currentslide.slice();
		
		sourcearray.sort(function(a,b){
			return a.epoch - b.epoch;
		})
		sourcearray.reverse();

		console.log('[][][][][][][][][][][][][][]');
		console.log('currentlide order:');
		console.log(currentslide);
		console.log('sortedlist order:');
		console.log(sourcearray);
		console.log('[][][][][][][][][][][][][][]]');
		

		currentslide = sourcearray;
		display();


	}

	else if(x == 3){
		//posted order
		currentslide = addorder.slice();
		display();
	}
}


function display(){

	//by deleting the previous list and repopulating it with a sorted list display achieves and effective albiet crude way of preserving sorting when adding a todo
	if(currentslide.length > 1){
		
	}
	


	clearlist();
	//in the display table of the todolist eah row is an item and the 
	//cells in the row are laid out like: |description| category| duedate |


	var todotable = document.getElementById("todolist");
	

	for (var i = 0; i < currentslide.length; i++) {
	
	
	var row = todotable.insertRow(0);
	var taskcell1 = row.insertCell(0);
	var taskcell2 = row.insertCell(1);
	var taskcell3 = row.insertCell(2);

	taskcell1.innerHTML = currentslide[i].desc;
	taskcell2.innerHTML = currentslide[i].cat;
	taskcell3.innerHTML = currentslide[i].datetime;


	row.id = 'row';
	row.addEventListener("click",function(){crossout(row.id);});
	
	}
}


function clearlist(){
	var todotable = document.getElementById("todolist");
	todotable.innerHTML = "";
}




;
function crossout(id){
	var target = document.getElementById(id);
	target.style.textDecoration="line-through"
}
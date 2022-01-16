/*need to create some sort of display for 16 tiles 
on arrow press new piece must spawn and old pieces must slide and combine 
pieces of the same number must add and change color 
smooth sliding
random piece generation 
color changing - arrays w colors and numbers 
use a piece.js file to create each piece 
board.js ??? */

//coords are defined in (col, row) or (x,y)
var size = 150;
const canvas = document.getElementById("board");
const ctx = canvas.getContext('2d');
var pieceArr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var colorArr = ["LightGray","red","orange","yellow","LightGreen","LimeGreen","LightSkyBlue","RoyalBlue","MediumBlue","purple","pink","white"];
ctx.canvas.width = size * 4;
ctx.canvas.height = size * 4;
ctx.strokeStyle = "gray";
 for (var x=0;x<=size*4;x+=size) {
        for (var y=0;y<=size*4;y+=size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, size*4);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(size*4, y);
            ctx.stroke();
        }
    }
ctx.scale(size,size);
spawnPiece();
spawnPiece();
function validToSpawn(){
	for(var x=0;x<3;x++){
		for(var y=0;y<3;y++){
			if(pieceArr[y][x]==pieceArr[y][x+1]) return true;
			if(pieceArr[y][x]==pieceArr[y+1][x])return true;
			if(pieceArr[y][x]==0) return true;
		}
	}
	return false;
}

function spawnPiece(){
	var colorPick = Math.random();
	if(colorPick>0.10) ctx.fillStyle = "red";
	else ctx.fillStyle = "orange";
	if(validToSpawn()){
		do{
			var rand1 = parseInt(Math.random()*4);
			var rand2 = parseInt(Math.random()*4);
		}while(pieceArr[rand1][rand2]!=0);
		ctx.fillRect(rand1,rand2,1,1);
		if(colorPick>0.10) pieceArr[rand1][rand2]=1;
		else pieceArr[rand1][rand2]=2;
	}
	else{
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,4,4);
	}
}
document.addEventListener("keydown",slide);
function slide(event){
	if(event.keyCode == 37) slideLeft();
	else if(event.keyCode == 38) slideUp();
	else if(event.keyCode == 39) slideRight();
	else if(event.keyCode == 40) slideDown();
}
function slideLeft(){
	var didMove = false;
	var count = 0;
	var transArr = transformArr(pieceArr);
	var newArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var col = 0;col<4;col++){
		var arrCol = transArr[col];
		for(var idx = 0;idx<4;idx++){
			if(arrCol[idx]!=0) count++;
			if(count == 1 && arrCol[idx]!=0) var num = arrCol[idx];
			else if(count == 2 && arrCol[idx]!=0) var num2 = arrCol[idx];
			else if(count == 3 && arrCol[idx]!=0) var num3 = arrCol[idx];
			else if(count == 4 && arrCol[idx]!=0) var num4 = arrCol[idx];
		}
		if(count == 1){
			arrCol = [num,0,0,0];
		}
		else if(count == 2){
			if(num == num2) arrCol = [num+1,0,0,0];
			else arrCol = [num, num2, 0,0];
		}
		else if(count == 3){
			if(num==num2) arrCol = [num+1,num3,0,0];
			else if(num2==num3) arrCol = [num,num2+1,0,0];
			else arrCol = [num,num2,num3,0];
		}
		else if(count == 4){
			if(num==num2){
				if(num3==num4) arrCol = [num+1,num3+1,0,0];
				else arrCol = [num+1,num3,num4,0];
			}
			else if(num2==num3) arrCol = [num,num2+1,num4,0];
			else if(num3==num4) arrCol = [num,num2,num3+1,0];
		}
		newArr[col] = arrCol;
		count = 0;
		num = 0;
		num2 = 0;
		num3 = 0;
		num4 = 0;
	}

	didMove = compareArr(transformArr(newArr));
	pieceArr = transformArr(newArr);
	if(didMove){
		spawnPiece();
		drawBoard();
	}
	else if(!validToSpawn()) gameOver();

}
function slideUp(){
	var didMove = false;
	var count = 0;
	var newArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var col = 0;col<4;col++){
		var arrCol = pieceArr[col];
		for(var idx = 0;idx<4;idx++){
			if(arrCol[idx]!=0) count++;
			if(count == 1 && arrCol[idx]!=0) var num = arrCol[idx];
			else if(count == 2 && arrCol[idx]!=0) var num2 = arrCol[idx];
			else if(count == 3 && arrCol[idx]!=0) var num3 = arrCol[idx];
			else if(count == 4 && arrCol[idx]!=0) var num4 = arrCol[idx];
		}
		if(count == 1){
			arrCol = [num,0,0,0];
		}
		else if(count == 2){
			if(num == num2) arrCol = [num+1,0,0,0];
			else arrCol = [num, num2, 0,0];
		}
		else if(count == 3){
			if(num==num2) arrCol = [num+1,num3,0,0];
			else if(num2==num3) arrCol = [num,num2+1,0,0];
			else arrCol = [num,num2,num3,0];
		}
		else if(count == 4){
			if(num==num2){
				if(num3==num4) arrCol = [num+1,num3+1,0,0];
				else arrCol = [num+1,num3,num4,0];
			}
			else if(num2==num3) arrCol = [num,num2+1,num4,0];
			else if(num3==num4) arrCol = [num,num2,num3+1,0];
		}
		newArr[col] = arrCol;
		count = 0;
		num = 0;
		num2 = 0;
		num3 = 0;
		num4 = 0;
	}
	didMove = compareArr(newArr);
	pieceArr = newArr;
	if(didMove){
		spawnPiece();
		drawBoard();
	}
	else if(!validToSpawn()) gameOver();

}
function slideRight(){
	var didMove = false;
	var count = 0;
	var transArr = transformArr(pieceArr);
	var newArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var col = 0;col<4;col++){
		var arrCol = transArr[col];
		for(var idx = 0;idx<4;idx++){
			if(arrCol[idx]!=0) count++;
			if(count == 1 && arrCol[idx]!=0) var num = arrCol[idx];
			else if(count == 2 && arrCol[idx]!=0) var num2 = arrCol[idx];
			else if(count == 3 && arrCol[idx]!=0) var num3 = arrCol[idx];
			else if(count == 4 && arrCol[idx]!=0) var num4 = arrCol[idx];
		}
		if(count == 1){
			arrCol = [0,0,0,num];
		}
		else if(count == 2){
			if(num == num2) arrCol = [0,0,0,num+1];
			else arrCol = [0,0,num,num2];
		}
		else if(count == 3){
			if(num3==num2) arrCol = [0,0,num,num2+1];
			else if(num2==num) arrCol = [0,0,num+1,num3];
			else arrCol = [0,num,num2,num3];
		}
		else if(count == 4){
			if(num3==num4){
				if(num==num2) arrCol = [0,0,num+1,num3+1];
				else arrCol = [0,num,num2,num3+1];
			}
			else if(num2==num3) arrCol = [0,num,num2+1,num4];
			else if(num==num2) arrCol = [0,num+1,num3,num4];
		}
		newArr[col] = arrCol;
		count = 0;
		num = 0;
		num2 = 0;
		num3 = 0;
		num4 = 0;
	}
	didMove = compareArr(transformArr(newArr));
	pieceArr = transformArr(newArr);
	
	if(didMove){
		spawnPiece();
		drawBoard();
	}
	else if(!validToSpawn()) gameOver();


}
function compareArr(array){
	for(var x=0;x<4;x++){
		for(var y=0;y<4;y++){
			if(array[y][x] != pieceArr[y][x]) return true;
		}
	}
	return false;
}
function slideDown(){
	var didMove = false;
	var count = 0;
	var newArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var col = 0;col<4;col++){
		var arrCol = pieceArr[col];
		for(var idx = 0;idx<4;idx++){
			if(arrCol[idx]!=0) count++;
			if(count == 1 && arrCol[idx]!=0) var num = arrCol[idx];
			else if(count == 2 && arrCol[idx]!=0) var num2 = arrCol[idx];
			else if(count == 3 && arrCol[idx]!=0) var num3 = arrCol[idx];
			else if(count == 4 && arrCol[idx]!=0) var num4 = arrCol[idx];
		}
		if(count == 1){
			arrCol = [0,0,0,num];
		}
		else if(count == 2){
			if(num == num2) arrCol = [0,0,0,num+1];
			else arrCol = [0,0,num,num2];
		}
		else if(count == 3){
			if(num3==num2) arrCol = [0,0,num,num2+1];
			else if(num2==num) arrCol = [0,0,num+1,num3];
			else arrCol = [0,num,num2,num3];
		}
		else if(count == 4){
			if(num3==num4){
				if(num==num2) arrCol = [0,0,num+1,num3+1];
				else arrCol = [0,num,num2,num3+1];
			}
			else if(num2==num3) arrCol = [0,num,num2+1,num4];
			else if(num==num2) arrCol = [0,num+1,num3,num4];
		}
		newArr[col] = arrCol;
		count = 0;
		num = 0;
		num2 = 0;
		num3 = 0;
		num4 = 0;
	}
	didMove = compareArr(newArr);
	pieceArr = newArr;
	if(didMove){
		spawnPiece();
		drawBoard();
	}
	else if(!validToSpawn()) gameOver();

}
function transformArr(arr){
	var origArr = arr; 
	var transArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var x=0;x<4;x++){
		for(var y=0;y<4;y++){
			transArr[y][x] = origArr[x][y];
		}
	}
	return transArr;
}
function drawBoard(){
	for(var x=0;x<4;x++){
		for(var y=0;y<4;y++){
			ctx.fillStyle = colorArr[pieceArr[x][y]];
			ctx.fillRect(x,y,1,1);
		}
	}
	drawLines();
}
function drawLines(){
	ctx.scale(1/size,1/size);
	ctx.strokeStyle = "gray";
	for (var x=0;x<=size*4;x+=size) {
        
            ctx.moveTo(x, 0);
            ctx.lineTo(x, size*4);
            ctx.stroke();
	}
	for (var y=0;y<=size*4;y+=size) {
            ctx.moveTo(0, y);
            ctx.lineTo(size*4, y);
            ctx.stroke();
    }
ctx.scale(size,size);
}
document.getElementById("reset").addEventListener("click",newGame);
function newGame(){
	pieceArr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	drawBoard();
	spawnPiece();
	spawnPiece();
}
function gameOver(){
	document.getElementById("over").style.display = "inline";
}
//["red","orange","yellow","LightGreen","LimeGreen","LightSkyBlue","RoyalBlue","MediumBlue","purple","pink","white"];
//make piece arr in 2048.js to add each piece 
//have to find a way to deal with spawning in empty spaces - math.random + validation 
//dealing with collisions - event listeners to slide, combination ???
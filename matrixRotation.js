'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    if (Math.min(matrix.length,matrix[0].length)%2 != 0){
        return;
    }
    if (!r > 1 && !r < 10**9) {
        return;
    }
    
   if (!matrix.length >= 2 && !matrix.length <= 300
   && !matrix[0].length >= 2 && !matrix[0].length <= 300){
       return;
   }
   let newMatrix = cleanMatrix(matrix);
   let dimension = newMatrix.length;
   while(r != 0) {
        newMatrix = rotateMatrix(newMatrix, dimension);
        r--;
   }
   let result = '';
   for(let i = 0 ; i < newMatrix.length ; i++){
        for(let j = 0 ; j < newMatrix.length ; j++){
            if (newMatrix[i][j] !== undefined) {
                 result +=newMatrix[i][j]+" ";
            }
        }
        result += '\n';
   }
   console.log(result);
}

function rotateMatrix(matrix, dimension){
    let newMatrix = [];
    let previous = []
    for(let i = 0; i < dimension; i++) {
             newMatrix.push([]);
    }
    
    let startRow = 0;
    let startColumn = 0;
    let endRow = matrix.length-1;
    let endColumn = matrix[0].length-1;
    
   while (startRow <= endRow && startColumn <= endColumn){
        //move top row
        for(let i = endColumn; i >= startColumn ; i--) {
            newMatrix[startRow][i] = matrix[startRow][i+1];
        }
        startRow++;
        //move side column
        for(let i = startRow; i <= endRow; i++ ){
            newMatrix[i][startColumn] = matrix[i-1][startColumn];
        }
        for(let i = endRow;  i >= startRow; i--){
            newMatrix[i-1][endColumn] = matrix[i][endColumn];
        }
        //move end row
        startColumn++;
        for(let i = startColumn; i <= endColumn ; i++) {
            newMatrix[endRow][i] = matrix[endRow][i-1];       
        }
        endColumn--;
        endRow--;
   }
  return newMatrix;
}

function cleanMatrix(matrix) {
    let topMat = 0;
    let newArray = [];
    let row = matrix.length;
    let previous = [];
    for(let i=0; i < matrix.length ; i++) {
        if (previous.length == 0){
             previous = matrix[i];
        }
        if (previous.length <= matrix[i].length){
            newArray.push(matrix[i]);
        }
    }

    return newArray;
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}

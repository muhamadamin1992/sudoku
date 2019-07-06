module.exports = function solveSudoku(matrix) {
  'use strict';

  let spots = [],
  		length = matrix.length,
  		solved = false,
  		i,
  		x,
  		y;

  for ( y = 0; y < length; y++ ) {

  	for ( x = 0; x < length; x++ ) {

  		if ( matrix[y][x] === 0 ) {
  			spots.push( { x, y } );
  		}
  	}
  }

  let solve = ( spots, val ) => {

  	let i,
  			newSpots;

  	if ( spots.length === 0 ) {
  		solved = true;
  		return;
  	}

  	const { x, y } = spots[0];

  	if ( checkRow( x, val ) && checkCol( y, val ) && checkSub( x, y, val ) ) {
			matrix[y][x] = val;
  	} else {
  		return;
  	}

  	newSpots = spots.slice( 1 );

  	for ( i = 1; i <= length; i++ ) {

  		if ( solved ) {
  			return;
  		}

  		solve( newSpots, i );
  	}
  };

  let checkRow = ( x, val ) => {
  	return !matrix.map( arr => arr[x] ).includes( val );
  }

  let checkCol = ( y, val ) => {
  	return !matrix[y].includes( val );
  }

  let checkSub = ( x, y, val ) => {
  	let startX = startPos( x ),
  			startY = startPos( y ),
  			endX,
  			endY;

  	for ( endY = startY + 3; startY <= endY; startY++ ) {

  		for ( endX = startX + 3; startX <= endX; startX++ ) {
  			
  			if ( matrix[startY][startX] === val ) {
  				return false;
  			}
  		}
  	}

  	return true;
  };

  let startPos = ( x ) => {
  	switch ( x ) {
  		case 0:
  		case 1:
  		case 2:
  			return 0;
  		case 3:
  		case 4:
  		case 5:
  			return 4;
  		case 6:
  		case 7:
  		case 8:
  			return 8;
  	}
  };

  for ( i = 1; i <= length; i++ ) {

  	if ( solved ) {
  		break;
  	}

  	solve( spots, i );
  }

  return matrix;
}

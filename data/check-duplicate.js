function removeDuplicate(elements){
  var reVal = [];
  for(var i=0; i<elements.length; i++){
    var duplicated = 0;
    
    for(var j=0; j<reVal.length; j++){
      duplicated = isDuplicatedElements(elements[i], reVal[j]);
      if(duplicated == 1) { 
        break; 
      } else if (duplicated == 2){
        duplicated = j;
        break;
      }
    }
    
    if(duplicated == 1) {
      // do nothing
      continue;
    } else if (duplicated == 0) { 
      reVal.push(elements[i]);
    } else {
      reVal[duplicated] = elements[i];
    } 
  }
  return reVal;
}

function isDuplicatedElements(element1, element2){
  var reVal = 0;
  if (element1 == element2
      || contains(element2, element1)) {
    reVal = 1;
  } else if (contains(element1, element2)) {
    reVal = 2;
  }
  //if(reVal != 0) {console.log('haha');}
  return reVal;
}

function contains(element1, element2){
  var reVal = false;
  var R1 = element1.getBoundingClientRect();
  var R2 = element2.getBoundingClientRect();
  if (R1.left <= R2.left
      && R2.right <= R1.right
      && R1.top <= R1.top
      && R2.top <= R1.bottom)
  {
      reVal = true;
  }
  return reVal;
}
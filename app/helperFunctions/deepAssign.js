export default function deepAssign(object1, object2) {
  let newObj = {};
  if(typeof(object2) !== 'object' || (object2 instanceof Array)) {
    return object2;
  }
  for(let e in object1) {
    newObj[e] = deepAssign({},object1[e]);
  }
  for(let e in object2) {
    if(newObj[e] === undefined) {
      newObj[e] = {};
    }
    newObj[e] = deepAssign(newObj[e], object2[e]);
  }
  return newObj;
}

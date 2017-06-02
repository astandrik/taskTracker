export default function(type){
  return function(data) {
    return {type, ...data};
  }
}
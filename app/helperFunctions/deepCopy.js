import deepAssign from "./deepAssign";

export default function deepCopy(obj) {
  return deepAssign({}, obj);
}
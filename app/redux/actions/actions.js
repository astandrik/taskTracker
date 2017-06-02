import ac from "./actionCreator";
export const INIT_APP = "INIT_APP";

export const initApp = ac(INIT_APP, {header: "Who will win?"});
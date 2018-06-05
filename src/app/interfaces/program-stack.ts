export interface ProgramStack {
  programName : String; //The Name of the bindedObject JSON
  trackingOn : boolean; //Checks if the bindedObject should be tracked JSON
  isRunning: boolean; //Checks if the bindedObject is already running JSON
  alreadyUsedTime : number; //Time Used this bindedObject in Hours  JSON
  timeUsedNow : number; //The Time used now
  programStartTime : number; //stores the starting time of the application
  timeAlreadyRun : number; //Stores the time which the bindedObject alredy run in that session

}

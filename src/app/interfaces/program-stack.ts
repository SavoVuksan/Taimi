export interface ProgramStack {
  programName : String; //The Name of the program JSON
  trackingOn : boolean; //Checks if the program should be tracked JSON
  isRunning: boolean; //Checks if the program is already running JSON
  alreadyUsedTime : number; //Time Used this program in Hours  JSON
  timeUsedNow : number; //The Time used now
  programStartTime : number; //stores the starting time of the application
  timeAlreadyRun : number; //Stores the time which the program alredy run in that session

}

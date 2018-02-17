export class Localhost{
  port:string = 'http://localhost:9090';
  checkAdmin: string    = this.port+'/checkadmin';
  checkMaster: string   = this.port+'/checkmaster';
  masterList: string    = this.port+'/masterlist';
  taskList: string      = this.port+'/tasklist';
  addNewMaster: string  = this.port+'/addnewmaster';
  addNewTask: string    = this.port+'/addnewtask';
  deleteTask: string    = this.port+'/deletetask';
  login: string         = 'http://localhost:9090/api/auth';

}

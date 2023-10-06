import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
taskobj: any={id:0,task_name:''};
taskArr :any =[];

addTaskvalue!:string;
editTaskValue!:string;
  constructor(private crud:CrudService){}

  ngOnInit(): void {
    this.taskobj=new Task();
    this.taskArr=[];
    this.getAllTask();
    this.addTaskvalue='';
    this.editTaskValue='';
  }

  addTask(){
    this.taskobj.task_name=this.addTaskvalue;
    this.crud.addtask(this.taskobj).subscribe((res:any)=>{
      this.ngOnInit();
      this.addTaskvalue='';
    } ,(err:any)=>{
      alert("error");
    });
  }

  getAllTask(){
    this.crud.getalltask().subscribe((res)=>{
      this.taskArr=res;
  },(err:any)=>{
    alert('Unable to get list of tasks');
  });
}

editTask(){
  this.taskobj.task_name=this.editTaskValue;
  this.crud.edittask(this.taskobj).subscribe(res=>{
    this.ngOnInit();
  },(err:any)=>{
    alert('unable to edit task') ;
  });
}

deleteTask(etask:Task){
  this.crud.deletetask(etask).subscribe(res=>{
    if(window.confirm('do you need to delete this task')){
      this.ngOnInit();
    }
  },(err:any)=>{
    alert('unable to delete the task ');
  });
}

call(etask:Task){
  this.taskobj=etask;
  this.editTaskValue=etask.task_name;
}
}

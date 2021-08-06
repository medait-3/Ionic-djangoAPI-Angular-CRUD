import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  constructor(private http:HttpClient) { }

  departments:any=[];
  employees:any=[];

  modalTitle ="";
  EmployeeId = 0;
  EmployeeName = "";
  Department="";
  DateOfJoining="";
  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    });

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
   
  }
  imageUpload(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    
    this.http.post(environment.API_URL+'employee/savefile',formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
    });
  }


}

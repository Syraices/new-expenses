import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import * as _ from 'lodash';
import {Subject} from 'rxjs';
interface EmpAccount {
  accountId: string;
  accountName: string;
  employeeId?: string[];
  employeeName?: string[];
  amount?: number[];
  accountTotal?: number;
}
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  positionType: string;
  startDate: Date;
  userId: string;
  userEmail: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataControlService {
  accList: EmpAccount[];
  empList: Employee[];
  accChange = new Subject<EmpAccount[]>();
  empChange = new Subject<Employee[]>();

  constructor(private http: HttpClient) { }

  getAccList(){
    return this.http.get<object[]>('assets/data.json')
      .pipe(
        map((account) => {
          // console.log(account);
          this.accList = account.map((acc: EmpAccount) => {
            const list = _.pick(acc, ['accountId', 'accountName', 'employeeId', 'employeeName', 'amount']);
            // console.log(this.accListist);
            return list;
          });
          console.log(this.accList);
          return this.accList;
        })
      );

  }

  getEmp(ids: string){
    return this.http.get<[]>('assets/employees.json')
      .pipe(map(employees => {
        this.empList = employees;
        // console.log(this.accList);
        return _.find(this.empList, {id: ids});
      }));
  }


  getPositions(){
     return this.http.get('assets/position-types.json')
      .pipe(
        map((positions: string[]) => {
          return positions;
        })
      );
  }

  editEmp(emp: Employee, ids: string){

    const employee = _.findIndex(this.empList, {id: ids});
    console.log(this.accList);
    this.accList.map((acc, index) => {

      const a = _.findIndex(acc.employeeId, ids);
      console.log(a);
    });
    this.empList[employee].positionType = emp.positionType;
    this.empList[employee].userEmail = emp.userEmail;
    this.empList[employee].startDate = emp.startDate;
    this.empList[employee].id = emp.id;
    this.empList[employee].firstName = emp.firstName;
    this.empList[employee].lastName = emp.lastName;
    this.empList[employee].userId = emp.userId;
    this.empList[employee].name = `${emp.firstName} ${emp.lastName}`;
    // console.log(this.empList[employee]);
    return this.empChange.next(this.empList.slice());

  }

}

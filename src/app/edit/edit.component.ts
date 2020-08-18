import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {DataControlService} from '../data-control.service';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  positionType: string;
  startDate: Date;
  userId: string;
  userEmail: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  id: string;
  subscription: Subscription;
  emp: Employee;
  posTypes: string[];
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dcService: DataControlService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    // console.log(this.id);
    this.dcService.getEmp(this.id)
      .subscribe((employee: Employee) => {
        this.emp = employee;
        // console.log(employee);
      }
    );
    this.dcService.getPositions()
      .subscribe(positions => {
        this.posTypes = positions;
      });
  }

  onSubmit(edited: NgForm) {
    // console.log(edited.value);
    this.dcService.editEmp(edited.value, this.id);
    // console.log(this.dcService.empList);
  }

  onDelete() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

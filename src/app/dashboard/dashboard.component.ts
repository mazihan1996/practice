import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { from, Observable } from 'rxjs';

import { DeleteDialogComponent } from '../common/delete-dialog/delete-dialog.component';
import { SubeditDialogComponent } from '../common/subedit-dialog/subedit-dialog.component';
import { AddHeroDialogComponent } from '../common/add-hero-dialog/add-hero-dialog.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '100%', width: '100%'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit{

  subData = new MatTableDataSource([]);
  treeList = [];
  list = true;
  tree = false;
  id: number;
  name: string;
  heroList: any[];
  statusList: string[];
  orgList: string[];
  index: number;
  searchForm: FormGroup;
  dataSource = new MatTableDataSource([]);
  data: any[];
  displayedColumns: string[] = ['id', 'name', 'organization', 'status', 'actions'];
  subColumns: string[] = ['email', 'degree', 'actions'];
  expandedElement: any | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('tabGroup') group;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.list = true;
    this.statusList = ['new', 'under review', 'closed'];
    this.orgList = ['company', 'department'];

    this.initForm();

    this.data = [];
    this.dashBoardService.getHeroes().subscribe(res => {
      this.dataSource.data = res;
    });

    // get tab index
    this.route.queryParams.subscribe(res => {
      this.index = res.index;
    });

    // sort
    this.dataSource.sort = this.sort;
    // paginator
    this.dataSource.paginator = this.paginator;

  }

  initForm() {
    this.searchForm = this.fb.group({
      id: null,
      name: null,
      organization: null,
      status: null,
    });
  }

  edit(element) {
    this.router.navigate(['dashboard', element.id],
    {queryParams: { name: element.name,
                    org: element.organization,
                    status: element.status,
                    index: this.group.selectedIndex
                  }
    });
  }

  subEdit(element) {
    const dialogRef = this.dialog.open(SubeditDialogComponent, {
      width: '300px',
      data: element,
    });
  }

  delete(element) {
    const id = element.id;
    const afterDelete = this.dataSource.data;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = afterDelete.filter(d => {
          return d.id !== id;
        });
        // this.data = this.dataSource.data;
        this.dashBoardService.deleteHero(result).subscribe();
      }
    });
  }

  reset() {
    this.searchForm.reset();
    this.dataSource.data = this.data;
  }

  search() {
    const formValue = this.searchForm.value;
    const keys = Object.keys(formValue);

    for (const key of keys) {
      console.log(formValue[key]);
      if (formValue[key]) {
        if (key === 'id') {
          this.dataSource.data = this.dataSource.data.filter(d => {
            return d.id.toString().includes(formValue.id.toString());
          });
        } else {
          this.dataSource.data = this.dataSource.data.filter(d => {
            return d[key].includes(formValue[key]);
          });
        }
      }
    }
  }

  toSubData(element) {
    this.subData.data = [element];
  }

  toTree() {
    this.list = false;
    this.tree = true;
    this.data = this.dataSource.data;

    document.getElementById('tree').style.display = 'flex';
  }

  toList() {
    this.list = true;
    this.tree = false;

    document.getElementById('tree').style.display = 'none';

  }

  addHero() {
    const dialogRef = this.dialog.open(AddHeroDialogComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(res => {
      this.dashBoardService.addHero(res).subscribe(ret => {
        this.dataSource.data.push(ret);
        this.data = [];
        this.dataSource._updateChangeSubscription();
      });
    });
  }

}

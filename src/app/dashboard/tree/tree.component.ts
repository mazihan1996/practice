import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnChanges {
  @Input() treeData;

  data: any[];
  treeList = [];

  treeControl = new NestedTreeControl<any>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<any>();


  constructor(
    private dashBoardService: DashboardService,
  ) { }

  hasChild = (_: number, node: any) => node.children && node.children.length > 0;


  ngOnInit(): void {
    // this.treeData.subscribe(res => {
    //   this.data = res;
    //   this.initTreeList();
    //   console.log('treetree',res);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.treeData;
    this.initTreeList();
  }

  initTreeList() {
    let companyList = [];
    let departmentList = [];
    companyList = this.data.filter(d => {
      return d.organization === 'company';
    });
    departmentList = this.data.filter(d => {
      return d.organization === 'department';
    });

    this.treeList = [
      {
        name: 'Company',
        children: this.prepData(this.data, 'company'),
      }
    ];

    this.treeDataSource.data = this.treeList;
  }

  prepData(data, level): {name: string, children?: any}[] {
    const list = [];
    if (level === 'company') {
      data.forEach(d => {
        if (d.organization === 'company') {
          list.push(
            {
              name: d.name,
              children: this.prepData(d, 'employee'),
            }
          );
        }
      });
      list.push(
        {
          name: 'Department',
          children: this.prepData(this.data, 'department'),
        }
      );

      return list;
    }

    if (level === 'department') {
      data.forEach(d => {
        if (d.organization === 'department') {
          list.push(
            {
              name: d.name,
              children: this.prepData(d, 'employee'),
            }
          );
        }
      });

      return list;
    }

    if (level === 'employee') {
      list.push(
        {
          name: data.email,
        }
      );

      return list;
    }
  }

}

import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { Module } from "ag-grid-community";
import { DashboardService } from "./dashboard.service";


function actionCellRenderer(params: any) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell: any) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> update  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit"  data-action="edit" > edit  </button>
<button class="action-button delete" data-action="delete" > delete </button>
`;
  }

  return eGui;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private gridApi: any;
  private gridColumnApi: any;

  public modules: Module[] = [ClientSideRowModelModule, RangeSelectionModule];
 columnDefs;
 defaultColDef;
 rowData: any= [];

  constructor(private http: HttpClient,
    private _service: DashboardService) {
    this.columnDefs = [
      { headerName: "Task Name", field:"taskName", minWidth: 150, resizable: true  },
      { headerName: "Task Description",field:"taskDescription", maxWidth: 200 , resizable: true },
      { headerName: "Status", field:"status",maxWidth: 200, resizable: true  },
      { headerName: "Priority",field:"priority", maxWidth: 200 , resizable: true },
      {
        headerName: "action",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action"
      }
    ];
    this.defaultColDef = {
       editable: true,
       sortable: true,
       filter: true,
    };
   this.getTaskData();
  }

  getTaskData(){
    this._service.getAllTasks().subscribe(data =>{
      this.rowData= data;
      console.log(this.rowData);
    });
  }

  onGridReady(params: any) {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellClicked(params: any) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]

        });

        var parameter = params.node.data;
          this._service.deleteTask(parameter.id).subscribe((response: any) =>
            {
              console.log(response);
            })
      }

      if (action === "update") {
        params.api.stopEditing(false);
        //params.api.setRowData(params.node.data)
        this._service.updateTask(params.node.data).subscribe(response=>{
          this.getTaskData()})
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  onRowEditingStarted(params: any) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  onRowEditingStopped(params: any) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }

}

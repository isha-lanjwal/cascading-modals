import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cascading-modals';
  closeResult: any = "";
  modalReference:any;
  @ViewChild('modal1', { read: TemplateRef, static: false }) modal1: TemplateRef<any> | undefined;
  @ViewChild('modal2', { read: TemplateRef, static: false }) modal2: TemplateRef<any> | undefined;
  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {

  }
  openFirstModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(this.modal1, ngbModalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openSecondModal(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalReference  = this.modalService.open(this.modal2, ngbModalOptions)
    this.modalReference .result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  closeModal(){
    this.modalService.dismissAll()
  }

  closeModal2(){
    this.modalReference.close();
  }
}


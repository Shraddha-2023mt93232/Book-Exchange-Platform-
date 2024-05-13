import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ViewChild } from '@angular/core';
import { bookBorrow } from '../../models/bookBorrow';
import { EventEmitter, Output } from '@angular/core';
import { bookExchangePlatformService } from '../../services/book-exchange-service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})



export class LayoutComponent {
  
  showModalPopup = false;
  currBookName: string = "";
  borrowBookData: any;
  tableHeaders = [
    "Book Title",
    "Author Name",
    "Released On",
    "Borrow", 
    "Actions"
  ]
  user: any;
  data: any

  
  
  showDelete = false
  borrowerDetails: any;
  constructor(private router: Router, private bookBorrowService: bookExchangePlatformService) {
    const localUser = localStorage.getItem('loggedUser');
    if(localUser != null) {
      this.user = JSON.parse(localUser);
    }
  }

  ngOnInit (): void{
    // load table data
    this.bookBorrowService.getAllBooks().subscribe(res=>{
      this.data = res}
    )
    
  }

 
  borrower: any = {};

  @Output() submitFormEvent = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();

  submitForm() {
    this.showModalPopup = false
    console.log(this.borrower)
    //add api here to push data to table
  }

  
  openModal(book: string){
    this.showModalPopup = true;
    this.currBookName = book
    

  }
  handleSubmitForm(borrower: any) {
    console.log('Borrower details submitted:', borrower);
    // You can handle the borrower details here, like updating your borrower list
    this.closeModal();
  }
  closeModal() {
    this.showModalPopup = false;
    this.closeModalEvent.emit();
  }
  closeModalDelete(){
    this.showModalPopup = true;
  }
  confirmDelete(user: any){
    // delete user api
    this.bookBorrowService.deleteAccount(user)
  }
  ngOninit (){
    this.user = {
      "name": "Mehak"
    }
    this.borrowBookData = new bookBorrow()
  }
  onLogoff() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login')
  }
  

  formModalDelete(){

  }

  deleteAccount(user: string){
    this.showDelete = true
    this.user = user
    // ccmd to delete user
    // this.showModalPopup=false
  }
}





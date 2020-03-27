import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public notes: any;
  public notesSize: number = 0;
  public selectedUser: number = 0;
  public newNoteContent = "";

  constructor(
    public apiService: APIService
  ) { 
    apiService.Notes.subscribe((notes) => {
      this.notes = notes;
      this.notesSize = this.notes.length;
      this.selectedUser = this.apiService.selectedUserId;
    });
  }

  saveNewNote() {
    this.apiService.addNote(this.newNoteContent).subscribe(data => {this.apiService.getNotes(this.selectedUser);}, error => {console.error(error);});
    this.newNoteContent = "";
  }
    
}

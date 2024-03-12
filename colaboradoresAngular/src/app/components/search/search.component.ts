import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'coppel-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() dataResult: any = new EventEmitter<string>();

  @Input() plceHolderInput: string;

  @Input() titleButton: string;

  public searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchData: this.formBuilder.control('', [Validators.required]),
    });
  }

  public searchData() {
    if (this.searchForm.status !== 'INVALID') {
      this.dataResult.emit(this.searchForm.controls['searchData'].value);
    }
  }
}

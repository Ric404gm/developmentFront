import { Component, Input } from '@angular/core';

@Component({
  selector: 'coppel-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() titleComponent: string;

  
}

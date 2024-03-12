import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cambiatoupper'
})
export class CambiatoupperPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}

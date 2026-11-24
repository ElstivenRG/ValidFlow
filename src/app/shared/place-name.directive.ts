import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { validName } from '../catalog/catalog.logic';

@Directive({
  selector: '[appPlaceName][ngModel]',
  standalone: false,
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PlaceNameDirective), multi: true }],
})
export class PlaceNameDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return validName(control.value) ? null : { placeName: { minLength: 3 } };
  }
}

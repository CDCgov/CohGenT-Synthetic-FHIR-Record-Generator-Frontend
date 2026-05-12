import { Pipe, PipeTransform } from '@angular/core';

const TAGS = {
  optional: "Optional",
  required: "Required",
  default: "Has Defaults"
} as const;

type TagKey = keyof typeof TAGS;

@Pipe({
  name: 'chipsStr',
  standalone: true
})
export class ChipsPipe implements PipeTransform {

  transform(value: string): string {
    if (value in TAGS) {
      return TAGS[value as TagKey];
    }
    return null;
  }

}

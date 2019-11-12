import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { SprkListItemComponent } from '../sprk-list-item/sprk-list-item.component';

@Component({
  selector: 'sprk-unordered-list',
  template: `
    <ul [ngClass]="getClasses()" [attr.data-id]="idString">
      <li
        *ngFor="let item of items"
        [attr.data-analytics]="item.analyticsString"
        [attr.data-id]="item.idString"
        [ngClass]="item.additionalClasses"
      >
        <ng-container [ngTemplateOutlet]="item.content"></ng-container>
      </li>
    </ul>
  `
})
export class SprkUnorderedListComponent {
  /**
   * This value determines what List variant is rendered.
   * Can be `bare` or `indented`.
   */
  @Input()
  listType: string;
  /**
   * Expects a space separated string
   * of classes to be added to the
   * component.
   */
  @Input()
  additionalClasses: string;
  /**
   * The value supplied will be assigned
   * to the `data-id` attribute on the
   * component. This is intended to be
   * used as a selector for automated
   * tools. This value should be unique
   * per page.
   */
  @Input()
  idString: string;

  /**
   * This component expects children `<sprk-list-item></sprk-list-item>`
   * components.
   */
  @ContentChildren(SprkListItemComponent) items: QueryList<
    SprkListItemComponent
  >;

  /**
   * @ignore
   */
  getClasses(): string {
    const classArray: string[] = [''];

    switch (this.listType) {
      case 'indented':
        classArray.push('sprk-b-List');
        classArray.push('sprk-b-List--indented');
        break;
      case 'bare':
        classArray.push('sprk-b-List');
        classArray.push('sprk-b-List--bare');
        break;
      case 'horizontal':
        classArray.push('sprk-o-HorizontalList');
        break;
      default:
        break;
    }

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }
  constructor() {}
}

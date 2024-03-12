import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import Toast from 'awesome-toast-component';

@Component({
  selector: 'coppel-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnDestroy, OnInit {
  public mobileQuery: MediaQueryList;
  public selectItem: string = 'colaboradores';

  fillerNav = [
    {
      label: 'Colaboradores',
      url: '/colaboradores',
      tab: 'colaboradores',
    },
    {
      label: 'Iniciativas',
      url: '/Iniciativas',
      tab: 'iniciativas',
    },
    {
      label: 'Asignaciones',
      url: '/Asignaciones',
      tab: 'asignaciones',
    },
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnInit(): void {}

  public selectedItem(data: string) {
    this.selectItem = data;
  }

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

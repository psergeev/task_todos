import { Component, NgZone, AfterViewInit } from '@angular/core';

@Component({
  selector: 'demo-layout',
  moduleId: module.id,
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements AfterViewInit {

  constructor(private _zone: NgZone) {}

  // Inspinia theme scripts
  public ngAfterViewInit() {
    this._fixHeight();
    this._bindHandlers();
  }

  private _bindHandlers() {
    this._zone.runOutsideAngular(() =>
      $(window).bind('load resize scroll', () => {
        if (!$('body').hasClass('body-small')) {
          this._fixHeight();
        }
      })
    );
  }

  private _fixHeight() {
    let heightWithoutNavbar = $('#wrapper').height() - 61;
    $('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');

    let navbarHeight = $('nav.navbar-default').height();
    let wrapperHeight = $('#page-wrapper').height();

    if (navbarHeight > wrapperHeight) {
      $('#page-wrapper').css('min-height', navbarHeight + 'px');
    }

    if (navbarHeight <= wrapperHeight) {
      $('#page-wrapper').css('min-height', ($(window).height() + $(window).scrollTop()) + 'px');
    }

    if ($('body').hasClass('fixed-nav')) {
      $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
    }
  }
}

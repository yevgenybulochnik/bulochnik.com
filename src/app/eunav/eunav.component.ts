import { Component } from '@angular/core';

class EuButton {
  link: string;
  link_path: string;
  is_active = false;
  constructor(linkname: string) {
    this.link = linkname;
  }
}

@Component({
  selector: 'eu-nav',
  templateUrl: './eunav.component.html',
  styleUrls: ['./eunav.component.css']
})

export class EuNavComponent {
  eubuttons: EuButton[] = [
    new EuButton('About'),
    new EuButton('Programming'),
    new EuButton('Photography'),
    new EuButton('Climbing'),
  ];
  nav_state = 'open';
  toggle_nav() {
    this.nav_state = (this.nav_state === 'open' ? 'closed' : 'open');
  }
  eubutton_click(event: any) {
    event.stopPropagation();
    console.log(event);
    console.log(this);
  }
}

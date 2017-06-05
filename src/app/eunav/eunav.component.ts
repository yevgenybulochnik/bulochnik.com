import { Component } from '@angular/core';

class EuLink {
  link: string;
  link_path: string;
  is_active = false;
  constructor(linkname: string) {
    this.link = linkname;
    this.link_path = '/' + linkname.toLowerCase().replace(' ', '');
  }
}

class EuButton extends EuLink {
  sublink: EuLink[];
  constructor(linkname: string, sublinks?: string[]) {
    super(linkname);
    this.sublink = this.gen_sublink(sublinks);
  }
  gen_sublink(sublinks: string[]) {
    if (sublinks) {
      let sublink_array = [];
      for (let i = 0; i < sublinks.length; i++) {
        sublink_array.push( new EuLink(sublinks[i]) )
      }
      return sublink_array
    } else {
      return null
    }
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
    new EuButton('Programming', ['Editor', 'Electronic Cv']),
    new EuButton('Photography', ['Nature', 'Landscape', 'Portrait']),
    new EuButton('Climbing'),
  ];
  nav_state = 'open';
  toggle_nav() {
    this.nav_state = (this.nav_state === 'open' ? 'closed' : 'open');
  }
  eubutton_click(event: any) {
    event.stopPropagation();
    console.log(this);
  }
}

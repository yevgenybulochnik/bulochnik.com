import { Component, HostListener} from '@angular/core';

class EuLink {
  link: string;
  link_path: string;
  link_id: string;
  is_active = false;
  scroll_position: number;
  constructor(linkname: string) {
    this.link = linkname;
    this.link_path = '/' + linkname.toLowerCase().replace(' ', '');
    this.link_id = '#' + linkname.toLowerCase();
  }
  get_scrollPosition() {
    let elem = document.getElementById(this.link.toLowerCase())
    if (elem) {
      this.scroll_position = elem.offsetTop
    }
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
  window_position: number;
  @HostListener('window:scroll') onScroll() {
    let window_position = window.pageYOffset
    console.log(window_position)
    this.window_position = window_position
  }
  ngOnInit() {
    for (let i = 0; i < this.eubuttons.length; i++) {
      this.eubuttons[i].get_scrollPosition()
      if (this.eubuttons[i].sublink) {
        for (let n = 0; n < this.eubuttons[i].sublink.length; n++) {
          this.eubuttons[i].sublink[n].get_scrollPosition()
        }
      }
    }
    console.log(this.eubuttons)
  }
  toggle_nav() {
    this.nav_state = (this.nav_state === 'open' ? 'closed' : 'open');
  }
  eubutton_click(event: any) {
    event.stopPropagation();
  }
}

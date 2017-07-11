import { Component, HostListener, OnInit } from '@angular/core';

class EuLink {
  link: string;
  link_path: string;
  link_id: string;
  is_active = false;
  constructor(linkname: string) {
    this.link = linkname;
    this.link_path = '/' + linkname.toLowerCase().replace(' ', '');
    this.link_id = '#' + linkname.toLowerCase();
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
  scroll_positions: object;
  nav_state = 'open';
  @HostListener('window:scroll') onScroll() {
    let window_position = window.pageYOffset
    console.log(window_position)
    for (let button in this.scroll_positions) {
      console.log(button, this.scroll_positions[button])
    }
  }
  ngOnInit() {
    let scrollable_links = []
    for (let i = 0; i < this.eubuttons.length; i++) {
      scrollable_links.push(this.eubuttons[i].link.toLowerCase())
      if (this.eubuttons[i].sublink) {
        for (let n = 0; n < this.eubuttons[i].sublink.length; n++) {
          scrollable_links.push(this.eubuttons[i].sublink[n].link.toLowerCase().replace(' ', ''))
        }
      }
    }
    let link_dict = {}
    for (let i = 0; i < scrollable_links.length; i++) {
      if (document.getElementById(scrollable_links[i])) {
        link_dict[scrollable_links[i]] = document.getElementById(scrollable_links[i]).offsetTop
      }
    }
    this.scroll_positions = link_dict
  }
  toggle_nav() {
    this.nav_state = (this.nav_state === 'open' ? 'closed' : 'open');
  }
  eubutton_click(event: any) {
    event.stopPropagation();
  }
}

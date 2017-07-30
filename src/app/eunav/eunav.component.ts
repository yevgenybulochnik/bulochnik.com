import { Component, HostListener} from '@angular/core';

class EuLink {
  link: string;
  link_path: string;
  link_id: string;
  is_active = false;
  scroll_position: number;
  parent: any;
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
        let placeholder = new EuLink(sublinks[i])
        placeholder.parent = this
        sublink_array.push(placeholder)
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
  @HostListener('window:scroll') onScroll() {
    let window_position = window.pageYOffset
    let eubuttons_ref = []
    let eubuttons_scrollPositions = []
    for (let i = 0; i < this.eubuttons.length; i++) {
      eubuttons_ref.push(this.eubuttons[i])
      if (this.eubuttons[i].scroll_position) {
        eubuttons_scrollPositions.push(this.eubuttons[i].scroll_position)
      }
      if (this.eubuttons[i].sublink) {
        for (let n = 0; n < this.eubuttons[i].sublink.length; n++) {
          eubuttons_ref.push(this.eubuttons[i].sublink[n])
          if (this.eubuttons[i].sublink[n].scroll_position) {
            eubuttons_scrollPositions.push(this.eubuttons[i].sublink[n].scroll_position)
          }
        }
      }
    }
    for (let i = 0; i < eubuttons_scrollPositions.length; i++) {
      if (window_position < eubuttons_scrollPositions[i + 1] && window_position >= eubuttons_scrollPositions[i]) {
        eubuttons_ref[i].is_active = true
        if (eubuttons_ref[i].parent) {
          eubuttons_ref[i].parent.is_active = true
        }
      }else {
        eubuttons_ref[i].is_active = false
      }
    }
    //console.log(eubuttons_ref)
    //console.log(eubuttons_scrollPositions)
    //console.log(window_position)
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
  }
  toggle_nav() {
    this.nav_state = (this.nav_state === 'open' ? 'closed' : 'open');
  }
  reset_buttons() {
    for (let i = 0; i < this.eubuttons.length; i++) {
      this.eubuttons[i].is_active = false
      if (this.eubuttons[i].sublink) {
        for (let n = 0; n < this.eubuttons[i].sublink.length; n++) {
          this.eubuttons[i].sublink[n].is_active = false
        }
      }
    }
    console.log(this)
  }
  eubutton_click(event: any, button: EuButton, subbutton?: EuLink) {
    this.reset_buttons()
    button.is_active = !button.is_active
    if (subbutton) {
      subbutton.is_active = !subbutton.is_active
    }
    event.stopPropagation();
  }
}

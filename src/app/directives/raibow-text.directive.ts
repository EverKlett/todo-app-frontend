import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRaibowText]'
})
export class RaibowTextDirective implements OnInit {

  @Input('appRaibowText')
  text!: string;

  private colours: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  constructor( private element: ElementRef, private renderer: Renderer2 ) { }

  ngOnInit(): void {
    let arrayIndex: number = 0;

    let spans: HTMLSpanElement[] = this.text.split("").map(char => {
      const span: HTMLSpanElement = this.renderer.createElement("span");

      if (char !== ' ') {
        this.renderer.setStyle(span, 'color', this.colours[arrayIndex]);
        this.renderer.setStyle(span, 'text-shadow', '0px 0px 3px gray');
        arrayIndex++;
      };

      this.renderer.appendChild(span, this.renderer.createText(char));

      if (arrayIndex === this.colours.length) { arrayIndex = 0}

      return span;
    });

    spans.forEach(span => { this.element.nativeElement.appendChild(span) });
  }
}

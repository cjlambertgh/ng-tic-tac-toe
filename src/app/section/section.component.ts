import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../game/game.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() section: Section;
  @Output() sectionClicked = new EventEmitter<number>();

  constructor() {
    this.section = {id: 0};
  }

  ngOnInit(): void {
  }

  onSectionClick(): void {
    this.sectionClicked.emit(this.section.id);
  }

  get selectedPlayerName(): string {
    return this.section.playerSelected?.name || '';
  }

  getColor(): string {
    return this.section.playerSelected?.color || '';
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tg-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() user: any = null;
  ngOnInit(): void {}
}

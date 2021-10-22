import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalStateService } from 'src/app/services/global-state/global-state.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(public readonly globalStateService: GlobalStateService) {}

  ngOnInit(): void {}
}

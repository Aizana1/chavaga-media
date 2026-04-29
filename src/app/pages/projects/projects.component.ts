import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  lang = inject(LanguageService);

  ornaments = [
    'assets/images/project1.svg',
    'assets/images/project2.svg',
    'assets/images/project3.svg',
    'assets/images/project4.svg',
  ];
}

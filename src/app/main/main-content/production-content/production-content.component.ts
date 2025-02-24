import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MockService } from './mockervice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-production-content',
  templateUrl: './production-content.component.html',
  styleUrl: './production-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionContentComponent {
 
}


/**
 * Component for displaying detailed review of custom items with visual chart representation.
 * Renders weighting and tribal affiliation data as stacked bar charts using Chart.js.
 */
import {
  Component,
  input,
  viewChild,
  ElementRef,
  effect,
  untracked,
  OnDestroy
} from '@angular/core';
import { PercentPipe} from "@angular/common";
import { Chart, registerables } from 'chart.js';
import {SummaryValueFormatPipe} from '../../../../pipes/summary-value-format-pipe';
import {SummaryOption} from '../defaults-summary';
import {SystemStrPipe} from '../../../../pipes/system-str-pipe';

Chart.register(...registerables);

@Component({
  selector: 'app-custom-item-review',
  standalone: true,
  imports: [
    PercentPipe,
    SummaryValueFormatPipe,
    SystemStrPipe,
  ],
  templateUrl: './custom-item-review.component.html',
  styleUrl: '../defaults-summary.scss',
})
export class CustomItemReview implements OnDestroy {
  /** The summary option containing data to visualize */
  option = input.required<SummaryOption>();

  /** Whether to render the chart in compact mode with smaller dimensions */
  compact = input<boolean>(false);

  /** Reference to the canvas element for rendering the chart */
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  /** The Chart.js instance for rendering the visualization */
  private chart: Chart | null = null;

  /** Constructor that sets up reactive effects for chart rendering */
  constructor() {
    effect(() => {
      const opt = this.option();
      const canvas = this.chartCanvas();
      const isCompact = this.compact();

      if ((opt.control === 'weighting' || opt.control === 'tribal-affiliation') && canvas) {
        untracked(() => {
          this.initChart(opt, canvas.nativeElement, isCompact);
        });
      }
    });
  }

  /** Cleanup method that destroys the chart instance when component is destroyed */
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  /** Initializes and renders the Chart.js bar chart with the provided data */
  private initChart(opt: SummaryOption, canvas: HTMLCanvasElement, isCompact: boolean) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barThickness = isCompact ? 12 : 16;
    const borderRadius = isCompact ? 3 : 4;

    let datasets: any[];

    if (opt.control === 'tribal-affiliation') {
      // For tribal affiliation, create two datasets: affiliation and no affiliation
      const prevalenceValue = Number(opt.value?.prevalence?.value) || 0;
      const noAffiliationValue = 100 - prevalenceValue;
      const label = opt.value?.isRandomlyAssigned
        ? 'Random assignment'
        : opt.value?.affiliation?.display || 'Tribal affiliation';

      datasets = [
        {
          label: label,
          data: [prevalenceValue],
          backgroundColor: this.getThemeColorFromCSS(0),
          barThickness: barThickness,
          borderRadius: borderRadius
        },
        {
          label: 'No affiliation',
          data: [noAffiliationValue],
          backgroundColor: this.getThemeColorFromCSS(1),
          barThickness: barThickness,
          borderRadius: borderRadius
        }
      ];
    } else {
      // For weighting, use the existing array format
      datasets = opt.value.map((item: any, i: number) => ({
        label: item[0],
        data: [(Number(item[1]) || 0) * 100],
        backgroundColor: this.getThemeColorFromCSS(i),
        barThickness: barThickness,
        borderRadius: borderRadius
      }));
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: datasets
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.x;

                if (value === null || value === undefined) {
                  return `${label}: 0%`;
                }

                const formatted = value < 1 ? value.toFixed(2) : value.toFixed(1);
                return `${label}: ${formatted}%`;
              }
            }
          }
        },
        scales: {
          x: { stacked: true, display: false, max: 100 },
          y: { stacked: true, display: false }
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  /** Retrieves theme color from CSS custom properties for chart styling */
  getThemeColorFromCSS(index: number): string {
    const canvas = this.chartCanvas()?.nativeElement;
    if (!canvas) return '#000000';

    const styles = getComputedStyle(canvas);
    const varName = `--chart-${index % 8}`;
    const value = styles.getPropertyValue(varName);

    return value?.trim() || '#000000';
  }
}

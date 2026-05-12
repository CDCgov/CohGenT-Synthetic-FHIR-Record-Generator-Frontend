import {
  Component,
  input,
  viewChild,
  ElementRef,
  effect,
  untracked,
  OnDestroy
} from '@angular/core';
import { PercentPipe } from "@angular/common";
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
    SystemStrPipe
  ],
  templateUrl: './custom-item-review.component.html',
  styleUrl: '../defaults-summary.scss',
})
export class CustomItemReview implements OnDestroy {
  option = input.required<SummaryOption>();
  compact = input<boolean>(false);
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const opt = this.option();
      const canvas = this.chartCanvas();
      const isCompact = this.compact();

      if (opt.control === 'weighting' && canvas) {
        untracked(() => {
          this.initChart(opt, canvas.nativeElement, isCompact);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private initChart(opt: SummaryOption, canvas: HTMLCanvasElement, isCompact: boolean) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barThickness = isCompact ? 12 : 16;
    const borderRadius = isCompact ? 3 : 4;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: opt.value.map((item: any, i: number) => ({
          label: item[0],
          data: [(Number(item[1]) || 0) * 100],
          backgroundColor: this.getThemeColorFromCSS(i),
          barThickness: barThickness,
          borderRadius: borderRadius
        }))
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

  getThemeColorFromCSS(index: number): string {
    const canvas = this.chartCanvas()?.nativeElement;
    if (!canvas) return '#000000';

    const styles = getComputedStyle(canvas);
    const varName = `--chart-${index % 8}`;
    const value = styles.getPropertyValue(varName);

    return value?.trim() || '#000000';
  }
}

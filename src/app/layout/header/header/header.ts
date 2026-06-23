import {Component, inject, OnInit} from '@angular/core';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {NavigationStart, Router} from '@angular/router';
import {ConfigService} from '../../../config/config.service';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {openConfirmationDialog} from '../../../shared/components/confirmation-modal/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CohortService} from '../../../features/cohort-generation/services/cohort.service';
import {FormManagerService} from '../../../features/cohort-generation/services/form-manager.service';
import {MatTooltip} from '@angular/material/tooltip';
import {filter} from 'rxjs';
import {
  opeNotification
} from '../../../features/cohort-generation/components/cohort-generation/notification-modal/notification-modal';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltip,
    MatDivider,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  router = inject(Router);
  configService = inject(ConfigService);
  private dialog: MatDialog = inject(MatDialog);
  cohortService = inject(CohortService);
  formManagerService = inject(FormManagerService);
  domSanitizer = inject(DomSanitizer);
  matIconRegistry = inject(MatIconRegistry);
  constructor() {
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg_icons/github.svg")
    );
  }


  ngOnInit(): void {
    this.trackNavigationToRoot();
    this.setupPageRefreshWarning();
  }


  onReportIssue() {
    // TODO uncomment when we implement a back-end solution
    // openIssueSubmissionModal(this.dialog).subscribe({
    //     next: (data: any) => {
    //       const issueDescription = data.description;
    //       this.submitIssue(issueDescription);
    //
    //     }
    //   }
    // );
    this.submitIssue()
  }

  private submitIssue(description?: string) {
    if(!description) {
      description = "Please provide a brief description to the issue you are experiencing\n";
    }
    const attachment = {
      selectedUseCase: this.cohortService.cohortData()?.selectedUseCase,
      metadata: this.cohortService.cohortData()?.metadata,
      formValue: this.formManagerService?.getFormData(),
      currentStep: this.formManagerService?.getCurrentStep(),
    };

    const attachmentName = `Issue_Report_${new Date()}`;
    const attachmentJson = JSON.stringify(attachment, null, 2);

    const email = this.configService.config.contactEmail;
    const subject = 'CohGenT: Issue Report';
    const body = `${description}\n\n--- Attachment Content (${attachmentName}) ---\n${attachmentJson}`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  }

  sendEmail() {
    // TODO refactor to use a CDC email address
    const email = this.configService.config.contactEmail;
    const subject = 'CohGenT: General Inquiry';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  }

  openGithubRepo() {
    const githubUrl = 'https://github.com/CDCgov/CohGenT-Synthetic-FHIR-Record-Generator-Backend';
    window.open(githubUrl, '_blank');
  }

  onReturnToHome(){
    const currentUrl = this.router.url;
    if (currentUrl !== '/' && currentUrl !== '') {
      this.returnToHome();
    }
  }

  protected returnToHome() {
    openConfirmationDialog(
      this.dialog,
      {
        title: "Warning!",
        content: "You may lose your data, are you sure you want to navigate away from this page?",
        primaryActionBtnTitle: "No, stay on this page",
        secondaryActionBtnTitle: "Yes, return to homepage",
        width: "40em",
        isPrimaryButtonLeft: false
      })
      .subscribe(
        action => {
          if (action == 'primaryAction') {
          } else if (action == 'secondaryAction') {
            this.router.navigate(['/']);
          }
        }
      );
  }

  // The function opens a warning window when the user clicks the Back button on the browser only if the user is not in the root of the app
  // This was implemented at the request of the customer
  private trackNavigationToRoot() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event) => {
        const navEvent = event as NavigationStart;

        if (navEvent.navigationTrigger === 'popstate' &&
          (navEvent.url === '/' || navEvent.url === '') &&
          this.router.url !== '/') {

          // Prevent navigation by navigating back to current URL
          const currentUrl = this.router.url;
          this.router.navigateByUrl(currentUrl).then(() => {
            this.onReturnToHome();
          });
        }
      });
  }

  protected onDocumentation() {
    const githubUrl = 'https://github.com/CDCgov/CohGenT-Synthetic-FHIR-Record-Generator-Backend/blob/main/docs/userguide.md';
    window.open(githubUrl, '_blank');
  }

  // Warn users about potential data loss when they attempt to refresh the page or close the browser
  private setupPageRefreshWarning() {
    window.addEventListener('beforeunload', (event) => {
      const currentUrl = this.router.url;
      // Only show warning if user is not on the root page
      if (currentUrl !== '/' && currentUrl !== '') {
        // Prevent the default behavior to trigger the browser's confirmation dialog
        event.preventDefault();
      }
    });
  }
}

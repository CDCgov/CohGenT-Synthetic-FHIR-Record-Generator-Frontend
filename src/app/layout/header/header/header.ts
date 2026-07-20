/**
 * Application header component providing navigation, help menu, and data loss prevention.
 * Displays the application logo, navigation controls, and a help menu with options for
 * documentation, issue reporting, and contact information. Implements safeguards to prevent
 * accidental data loss when navigating away or refreshing the page.
 */
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
  /** Router service for navigation */
  router = inject(Router);

  /** Configuration service for app settings */
  configService = inject(ConfigService);

  /** Dialog service for confirmation modals */
  private dialog: MatDialog = inject(MatDialog);

  /** Cohort service for accessing cohort data */
  cohortService = inject(CohortService);

  /** Form manager service for accessing form state */
  formManagerService = inject(FormManagerService);

  /** DOM sanitizer for safe resource URLs */
  domSanitizer = inject(DomSanitizer);

  /** Material icon registry for custom SVG icons */
  matIconRegistry = inject(MatIconRegistry);

  /**
   * Constructor that registers custom SVG icons.
   * Registers the GitHub icon for use in the help menu.
   */
  constructor() {
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/svg_icons/github.svg")
    );
  }


  /**
   * Lifecycle hook that initializes navigation tracking and page refresh warnings.
   * Sets up browser back button handling and beforeunload event listener.
   */
  ngOnInit(): void {
    this.trackNavigationToRoot();
    this.setupPageRefreshWarning();
  }


  /**
   * Handles the "Report Issue" menu action.
   * Collects current application state and opens email client with issue details.
   * TODO: Implement backend solution for issue submission.
   */
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

  /**
   * Submits an issue report via email with application state attached.
   * @param description - Optional description of the issue from the user
   */
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

  /**
   * Opens email client for general inquiries.
   * TODO: Refactor to use a CDC email address.
   */
  sendEmail() {
    // TODO refactor to use a CDC email address
    const email = this.configService.config.contactEmail;
    const subject = 'CohGenT: General Inquiry';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink, '_blank');
  }

  /**
   * Opens the GitHub repository in a new tab.
   * Links to the CohGenT backend repository.
   */
  openGithubRepo() {
    const githubUrl = 'https://github.com/CDCgov/CohGenT-Synthetic-FHIR-Record-Generator-Backend';
    window.open(githubUrl, '_blank');
  }

  /**
   * Handles the "Return to Home" button click.
   * Shows confirmation dialog if user is not already on the home page.
   */
  onReturnToHome(){
    const currentUrl = this.router.url;
    if (currentUrl !== '/' && currentUrl !== '') {
      this.returnToHome();
    }
  }

  /**
   * Shows confirmation dialog before navigating to home page.
   * Warns user about potential data loss.
   */
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

  /**
   * Tracks browser back button navigation and shows warning when navigating to root.
   * Prevents accidental data loss by intercepting popstate navigation events.
   * Implemented at customer request.
   */
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

  /**
   * Opens the user documentation in a new tab.
   * Links to the GitHub user guide.
   */
  protected onDocumentation() {
    const githubUrl = 'https://github.com/CDCgov/CohGenT-Synthetic-FHIR-Record-Generator-Backend/blob/main/docs/userguide.md';
    window.open(githubUrl, '_blank');
  }

  /**
   * Sets up warning when user attempts to refresh page or close browser.
   * Prevents accidental data loss by triggering browser's confirmation dialog.
   * Only shows warning when user is not on the root page.
   */
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

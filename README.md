# CohGenT (Cohort Generator Tool) UI/Frontend

## 1. General
   CohGenT user interface (UI) is a single page application (SPA) implemented using Angular and is using Angular Material widgets. 
## 2. Installation and built  
  2.1. To install the app the user needs node and npm. The versions the app was developed with are npm 11.16.0 and node v26.3.0.  
  2.2. To run the application the user should install it using npm install and to run it they should run ng serve. The app should start in localhost port 4200 by default.
  2.3. The application can be build using `ng build` and the built located in `dist/cohort-generation-us/browser`

## 3. Architecture

### 3.1. Overview
CohGenT UI follows a modern Angular 20+ architecture with the following key characteristics:
- **Standalone Components**: All components are standalone, eliminating the need for NgModules
- **Signal-Based State Management**: Uses Angular signals for reactive state management (all components inputs and outputs are signals)
- **Feature-Based Organization**: Code organized by features for better maintainability. Presently the only application feature is Cohort Generation.
- **Reactive Forms**: Form handling using Angular's reactive forms API. While Angular 22+ uses signal forms, at the time of the development angular signal forms were not available in Angular.
- **Dependency Injection**: Services provided at root level using `providedIn: 'root'`

### 3.2. Folder Structure

```
src/
├── app/
│   ├── config/                               # Application configuration
│   │   ├── config.service.ts                 # Configuration service. Used to retrive the API configuration form config.json file. 
│   │   ├── config.ts                         # Configuration model to interface for the config.json file.
│   │   └── environment-handler.service.ts    # Environment handling
│   │
│   ├── constants/                            # Application-wide constants
│   │   ├── app-constants.ts                  # Common App constants (e.g. US States )
│   │   ├── ui-constants.ts                   # String constants used in the html
│   │
│   ├── features/                             # Feature modules
│   │   └── cohort-generation/                # Main cohort generation feature. The application presently has only one module
│   │       ├── components/                   # Feature components
│   │       │   └── cohort-generation/        # Main feature component
│   │       │       ├── additional-data/      # Additional data management
│   │       │       ├── cohort-info/          # Brief Cohort Information 
│   │       │       ├── concept-finder-modal/ # Concept search
│   │       │       ├── custom-form/          # Custom form builder
│   │       │       ├── defaults-summary/     # Summary view of the primitive forms
│   │       │       ├── form-manager/         # Parent form 
│   │       │       ├── form-primitives/      # Reusable form components (building blocks of the parent form)
│   │       │       ├── generate-cohort/      # Cohort generation
│   │       │       ├── medications/          # Medication management
│   │       │       ├── review-cohort/        # Cohort review. Used for the Review step, and it only renders data
│   │       │       └── use-case-selection/   # Use case selection
│   │       │
│   │       ├── models/                  # TypeScript interfaces/types. A notable model is the CohortGenerationRequestBody used to tansform the form data into an HTTP request body object.
│   │       ├── pipes/                   # Custom pipes for data transformation
│   │       └── services/                # Business logic services
│   │           └── form-helpers/        # Resuable (building blocks) forms
│   │
│   ├── layout/                          # Layout components
│   │   ├── header/                      # Application header
│   │   └── footer/                      # Application footer
│   │
│   ├── shared/                          # Shared resources
│   │   ├── components/                  # Reusable components
│   │   ├── functions/                   # Utility functions
│   │   ├── interceptors/                # HTTP interceptors. Presently there is only one intercpetor used to render an error message if an API erroroccurs.
│   │   ├── pipes/                       # Shared pipes
│   │   └── services/                    # Shared services
│   │
│   ├── app.config.ts                    # Application configuration
│   ├── app.routes.ts                    # Route definitions
│   └── app.ts                           # Root component
│
├── public/                              # Static assets
│   └── assets/
│       ├── config/                      # Runtime configuration files
│       └── svg_icons/                   # SVG icon assets
│
└── styles.scss                          # Global styles
```

### 3.3. Architectural Patterns

#### 3.3.1. Form Management Architecture (Core Pattern)
The application uses a hierarchical form management system composed of two main sections:

##### Section 1: Form Manager (Components and Services)
The Form Manager orchestrates the entire cohort generation workflow through a parent form and its supporting service.

**1.1 Form Manager Component** (`form-manager/form-manager.component.ts`)
- Acts as the **parent form** that orchestrates the cohort generation workflow
- Manages the overall form state and navigation between steps
- Coordinates validation across all child forms

**1.2 Form Manager Service** (`services/form-manager.service.ts`)
- **Builds the master/main form** by composing all sub-forms
- Orchestrates the creation of the complete FormGroup structure
- Delegates to form-helper services to construct individual form sections
- Manages form state persistence and restoration, enabling the exporting and importing of forms data (Save Cohort Configuration and Import Cohort from File)

##### Section 2: Form Primitives (Components and Services)
Form Primitives are the reusable building blocks that compose the parent form, supported by helper services that handle their business logic.

**2.1 Form Primitive Components** (`form-primitives/`)
- **Building blocks** used by the Form Manager Component
- Reusable UI components with consistent API
- Each primitive is a self-contained form component that can be composed into larger forms
- Examples:
  - `checkbox-form/` - Checkbox input primitive
  - `concept-form/` - Medical concept selection primitive
  - `location-form/` - Location selection primitive
  - `onset-time-range/` - Time range input primitive
  - `prevalence/` - Prevalence configuration primitive
  - `range-form/` - Numeric range input primitive
  - `weighting-form/` - Weighting configuration primitive

**2.2 Form Helper Services** (`services/form-helpers/`)
- Each helper service is responsible for **building a specific primitive (reusable) form**
- Encapsulate complex form logic, validation rules, and data transformations
- Provide methods to create, validate, and process form data
- Examples:
  - `medication-helper.service.ts` - Builds medication form structures
  - `prevalence-helper.service.ts` - Builds prevalence form structures
  - `onset-time-range-helper.service.ts` - Builds time range form structures
  - `weighting-helper.service.ts` - Builds weighting form structures

**Form Building Flow:**
```
Form Manager Component (Parent Form)
        ↓
Uses Form Manager Service
        ↓
Form Manager Service builds master form
        ↓
Delegates to Form Helper Services
        ↓
Form Helpers build primitive forms
        ↓
Form Primitives render UI
```

**Key Characteristics:**
- **Reactive Forms**: All forms use Angular's FormGroup/FormControl for state management
- **Composition**: Complex forms built by composing simpler form primitives
- **Separation of Concerns**: UI (primitives) separated from business logic (helpers)
- **Reusability**: Form primitives and helpers can be reused across different contexts
- **Type Safety**: Strongly typed form structures throughout
- **Custom Validators**: Domain-specific validation logic in helper services

##### Section 3: Request Body Transformation (Model and Logic)
The Request Body Transformation layer converts the hierarchical form data structure into the API request format required by the backend.

**3.1 CohortGenerationRequestBody Model** (`models/cohort-generation-request-body.ts`)
- TypeScript class that acts as a **data transformation layer** between UI form structure and backend API
- Instantiated in the Form Manager Component's `onSubmit()` method when generating a cohort

**3.2 Transformation Process**
The transformation occurs through the following workflow:

1. **Form Validation** - Form Manager validates the complete form structure
2. **Instantiation** - Creates new `CohortGenerationRequestBody` instance with required parameters
3. **Data Extraction** - Constructor processes form data through private transformation methods:
   - `getCustomFieldsResponses()` - Transforms custom form fields into user responses
   - `getMedicationSets()` - Extracts and structures medication data with weights
   - `getEventSetsData()` - Processes additional data/event sets with timing and entries
4. **API Call** - Transformed request body sent to backend via `CohortService.generateCohort()`


**3.3 Data Flow**

```
User Input (Form Primitives)
        ↓
Form Manager (Hierarchical FormGroup)
        ↓
Form Validation
        ↓
CohortGenerationRequestBody Constructor
        ↓
Private Transformation Methods
  ├─ getCustomFieldsResponses()
  ├─ getMedicationSets()
  └─ getEventSetsData()
        ↓
Structured API Request Body
        ↓
CohortService.generateCohort()
        ↓
Backend API
```

**3.6 Request Body Structure**

The final request body contains:
- `useCaseId` - Identifier for the selected use case
- `count` - Number of patients to generate
- `seed` - Random seed for reproducibility
- `outputFormat` - Desired output format (e.g., "FHIR")
- `eventPeriod` - Time period with start, end, and until dates
- `userResponses` - Array of user-provided values for custom fields
- `medicationSets` - Optional array of medication sets with weights
- `eventSets` - Optional array of event sets with timing and entries

#### 3.3.2. Component Architecture Pattern
The application follows a clear component hierarchy:

- **Smart/Container Components**: Handle business logic and state management
  - Example: `cohort-generation.component.ts` - Main feature orchestrator
  - Responsibilities: Data fetching, state management, business logic coordination
  
- **Presentational Components**: Focus on UI rendering and user interaction
  - Example: Form primitives in `form-primitives/`
  - Responsibilities: Display data, emit user events, reusable UI patterns

- **Form Primitives as Building Blocks**: 
  - Reusable, self-contained form components
  - Consistent API across all primitives
  - Used by the Form Manager Component to compose complex forms

#### 3.3.3. Service Layer Pattern
Services are organized by responsibility and follow the single responsibility principle:

**Core Services** (`src/app/features/cohort-generation/services/`):
- `cohort.service.ts` - Cohort data management and API communication
- `concept-search-service.ts` - Medical concept search functionality
- `form-manager.service.ts` - Form orchestration and validation
- `use-cases.service.ts` - Use case management
- `utils.service.ts` - Utility functions

**Form Helper Services** (`services/form-helpers/`):
- Specialized services for complex form logic
- Each helper manages a specific form type's business logic
- Examples: `medication-helper.service.ts`, `prevalence-helper.service.ts`

**Shared Services** (`src/app/shared/services/`):
- `shared-http-error.service.ts` - Global error handling

**Configuration Services** (`src/app/config/`):
- `config.service.ts` - Application configuration management
- `environment-handler.service.ts` - Environment-specific settings

#### 3.3.4. State Management Pattern
- **Signals**: Primary state management using Angular signals
  - `signal()` for mutable state
  - `computed()` for derived state
  - `effect()` for side effects
- **Reactive Forms**: Form state managed through Angular's FormGroup/FormControl
- **Services**: Singleton services (`providedIn: 'root'`) for shared state across components

#### 3.3.5. Data Flow Pattern

```
User Interaction
      ↓
Component (Signal Updates)
      ↓
Service Layer (Business Logic)
      ↓
HTTP Interceptor (Error Handling)
      ↓
Backend API
      ↓
Response Processing
      ↓
Signal Updates
      ↓
UI Re-render (OnPush)
```

#### 3.3.6. Modal/Dialog Pattern
- Uses Angular Material Dialog for modal interactions
- Dialog data passed via injection tokens
- Examples:
  - `concept-finder-modal/` - Search and select medical concepts
  - `generation-summary-modal/` - Display generation results
  - `notification-modal/` - User notifications
  - `issue-submission-modal/` - Issue reporting

### 3.4. Key Design Decisions

#### 3.4.1. Modern Angular Features
- **No NgModules**: All components are standalone
- **Signal-based reactivity**: Replaces RxJS where appropriate
- **Modern control flow**: Uses `@if`, `@for`, `@switch` instead of structural directives
- **Typed forms**: Strongly typed reactive forms
- **inject() function**: Constructor injection replaced with `inject()`

#### 3.4.2. Performance Optimizations
- **OnPush Change Detection**: All components use OnPush strategy
- **Lazy Loading**: Feature modules loaded on demand
- **Signal-based updates**: Efficient reactivity with minimal re-renders
- **Pure pipes**: All custom pipes are pure for better performance

#### 3.4.3. Code Organization
- **Feature-based structure**: Related code grouped by feature
- **Separation of concerns**: Clear boundaries between components, services, and models
- **Reusable primitives**: Common UI patterns extracted into reusable components
- **Type safety**: Strong TypeScript typing throughout

### 3.5. Configuration Management

The application supports multiple environments through a flexible configuration system:

1. **Runtime Configuration**: JSON files in `public/assets/config/`
   - `config.json` - Production configuration
   - `local-config.json` - Local development overrides

2. **Environment Handler**: `environment-handler.service.ts` loads appropriate config

3. **Config Service**: `config.service.ts` provides typed access to configuration

### 3.6. Styling Architecture

- **Global Styles**: `src/styles.scss` for application-wide styles
- **Component Styles**: Scoped SCSS files per component
- **Angular Material**: Material Design components and theming
- **Responsive Design**: Mobile-first approach with breakpoints


### 3.8. Build and Deployment
Tools and commands for local development.

**1.1 Development Server**
- Command: `ng serve`
- Starts local development server
- Default port: 4200 (http://localhost:4200)
- Features hot-reload for rapid development

**1.2 Development Build**
- Command: `ng build`
- Outputs to: `dist/cohort-generation-us/browser`
- Includes source maps for debugging
- Optimized for development workflow






 

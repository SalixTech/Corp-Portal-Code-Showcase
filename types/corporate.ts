export type CorpRole =
  | "SALIX_CORP"
  | "CORP_MANAGER"
  | "ACCOUNT_MANAGER"
  | "MANAGER"
  | "TESTER"
  | "IT"
  | "SUPPORT";

export type BaseRole =
  | "ACCOUNT_MANAGER"
  | "MANAGER"
  | "TRAINER"
  | "TRAINEE"
  | "DRIVER";

export type OrganizationPermission =
  | "TRIP_MASTER_STANDARD"
  | "USER_VIEW"
  | "USER_EDIT"
  | "USER_DISABLE"
  | "ASSIGN_TRAINERS"
  | "PAY_VIEW"
  | "PAY_EDIT"
  | "TRAINING_ACCESS"
  | "TRAINING_MANAGE_ASSIGNED"
  | "TRAINING_CREATE_RECORDS"
  | "TRAINING_EDIT_RECORDS"
  | "TRAINING_BACKING_LOG"
  | "TRAINING_NOTES"
  | "TRAINING_ADMIN"
  | "PARTNER_TRAINING"
  | "PARTNER_BACKING_LOG"
  | "ORG_VIEW"
  | "ORG_EDIT"
  | "ORG_FEATURE_MANAGE"
  | "AUDIT_VIEW"
  | "CORP_PORTAL_ACCESS";

export type CorpAccessProfile = {
  uid: string;
  organizationId: string;
  organizationName: string;
  baseRoles: BaseRole[];
  corpRoles: CorpRole[];
  permissionGrants: OrganizationPermission[];
  permissionDenials: OrganizationPermission[];
  isActive: boolean;
  role: string;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
};

export type CorpUser = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  employeeNumber: string;
  phone: string;
  profilePhotoUrl: string;
  authDisabled: boolean;
  access: CorpAccessProfile | null;
};


export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  displayName: string;
  employeeNumber: string;
  phone: string;
  email: string;
  profilePhotoUrl: string;
  organizationName: string;
  updatedAt: number;
};

export type SystemStatus = {
  auth: "operational" | "unavailable";
  database: "operational" | "unavailable";
  checkedAt: number;
};


export type OrganizationFeature =
  | "TRIP_MASTER_CORE"
  | "PAY"
  | "TRAILER_HISTORY"
  | "TRAINING_CENTER"
  | "PARTNER_TRAINING"
  | "PARTNER_BACKING_LOG"
  | "CORPORATE_MANAGEMENT";

export type OrganizationTraineeStage = {
  id: string;
  label: string;
};

export type OrganizationTerminology = {
  driverLabel: string;
  trainerLabel: string;
  traineeLabel: string;
  employeeNumberLabel: string;
  tripLabel: string;
  trailerLabel: string;
};

export type OrganizationTrainingRequirement =
  | "OPTIONAL"
  | "REQUIRED"
  | "HIDDEN";

export type OrganizationTrainingDefaults = {
  cdlMode: OrganizationTrainingRequirement;
  backingLogMode: OrganizationTrainingRequirement;
  trainerLockEnabled: boolean;
  terminalEvaluationLocationEnabled: boolean;
};

export type OrganizationProductDefaults = {
  payMode: "CPM" | "HOURLY";
  stopPayEnabled: boolean;
  trailerPayEnabled: boolean;
  stopReportsEnabled: boolean;
  trailerReportsEnabled: boolean;
};

export type OrganizationBranding = {
  shortName: string;
  accentColor: string;
  supportName: string;
};

export type CorpOrganization = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  features: OrganizationFeature[];
  logoUrl?: string;
  terminology?: OrganizationTerminology;
  traineeStages?: OrganizationTraineeStage[];
  trainingDefaults?: OrganizationTrainingDefaults;
  productDefaults?: OrganizationProductDefaults;
  branding?: OrganizationBranding;
  requiredCurriculumSectionIds?: string[];
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
};

export type CorpAssignmentStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "TRANSFERRED"
  | "CANCELLED";

export type CorpAssignment = {
  id: string;
  organizationId: string;
  trainerId: string;
  traineeId: string;
  traineeName?: string;
  traineeEmail?: string;
  traineeEmployeeNumber?: string;
  traineeStageId?: string;
  traineeStageLabel?: string;
  trainerName?: string;
  trainerEmail?: string;
  trainerEmployeeNumber?: string;
  trainingRecordId: string;
  status: CorpAssignmentStatus;
  startDate: number;
  endDate: number | null;
  assignedBy: string;
  createdAt: number;
  updatedAt: number;
};


// Legacy compatibility aliases retained for older Corp Portal modules.
export type TrainerAssignmentStatus = CorpAssignmentStatus;
export type TrainerAssignment = CorpAssignment & {
  trainerName: string;
  traineeName: string;
};

export type AuditAction = string;
export type AuditLogEntry = {
  id: string;
  organizationId: string;
  actorUid: string;
  targetUid: string;
  action: AuditAction;
  summary: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  timestamp: number;
};

export type OrganizationRecord = CorpOrganization;

export type AuditUserSummary = {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  employeeNumber: string;
  phone: string;
  organizationId: string;
  organizationName: string;
  baseRoles: string[];
  corpRoles: string[];
  isActive: boolean | null;
};

export type CorpAuditEntry = {
  id: string;
  organizationId: string;
  actorUid: string;
  targetUid: string;
  action: string;
  summary: string;
  timestamp: number;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  changes: Record<string, { before: unknown; after: unknown }> | null;
  metadata: Record<string, unknown> | null;
  actor: AuditUserSummary | null;
  target: AuditUserSummary | null;
};


export type AuditCaseStatus =
  | "OPEN"
  | "AWAITING_RESPONSE"
  | "RESOLVED"
  | "ESCALATED"
  | "CLOSED";

export type AuditCaseNote = {
  id: string;
  authorUid: string;
  authorName: string;
  text: string;
  createdAt: number;
  isInternal: boolean;
};

export type AuditCaseAttachment = {
  id: string;
  fileName: string;
  contentType: string;
  size: number;
  storagePath: string;
  downloadUrl: string;
  uploadedBy: string;
  uploadedAt: number;
};

export type AuditCase = {
  id: string;
  auditEntryId: string;
  organizationId: string;
  actorUid: string;
  actorName: string;
  actorEmail: string;
  targetUid: string;
  targetName: string;
  action: string;
  auditSummary: string;
  auditTimestamp: number;

  openedByUid: string;
  openedByName: string;
  openedAt: number;

  status: AuditCaseStatus;
  subject: string;
  question: string;

  lastContactAt: number | null;
  lastUpdatedAt: number;

  notes: AuditCaseNote[];
  attachments: AuditCaseAttachment[];
};


export type SupportTicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING_ON_USER"
  | "RESOLVED"
  | "CLOSED";

export type SupportTicketPriority =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "URGENT";

export type SupportTicketMessage = {
  id: string;
  ticketId: string;
  senderType: "STAFF" | "USER" | "SYSTEM";
  senderUid: string;
  senderName: string;
  body: string;
  kind: "MESSAGE" | "IMAGE_REQUEST" | "INTERNAL_NOTE";
  createdAt: number;
  emailSent: boolean;
  source?: string;
  attachments?: Array<{
    id: string;
    fileName: string;
    contentType: string;
    size: number;
    storagePath: string;
    downloadUrl: string;
  }>;
};

export type SupportTicket = {
  id: string;
  /** Optional display identifier; older tickets fall back to the document id. */
  caseId?: string;
  userUid: string;
  userName: string;
  userEmail: string;
  organizationId: string;
  internalTest?: boolean;
  subject: string;
  category: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  assignedToUid: string;
  assignedToName: string;
  createdAt: number;
  updatedAt: number;
  notes: Array<{
    id: string;
    authorUid: string;
    authorName: string;
    text: string;
    createdAt: number;
    internal: boolean;
  }>;
  attachments?: Array<{
    id: string;
    fileName: string;
    contentType: string;
    size: number;
    storagePath: string;
    downloadUrl: string;
    uploadedAt?: number;
  }>;
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  body: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  audience: "ALL" | "ORGANIZATION";
  organizationId: string;
  deliveryPlatforms?: string[];
  isActive: boolean;
  startsAt: number;
  endsAt: number | null;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
};

export type LifecycleUser = {
  uid: string;
  displayName: string;
  email: string;
  organizationId: string;
  state:
    | "ACTIVE"
    | "INVITED"
    | "INACTIVE"
    | "DELETION_DUE";
  traineeCompletedAt: number | null;
  tripMasterInviteSentAt: number | null;
  tripMasterActivatedAt: number | null;
  inactiveAt: number | null;
  deletionEligibleAt: number | null;
};

export type UserRole =
  | "DRIVER"
  | "TRAINEE"
  | "TRAINER"
  | "TRAINER_ADMIN";

export type TrainingStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "ARCHIVED";

export type TrainingOutcome =
  | "COMPLETED"
  | "INCOMPLETE"
  | null;

export type BackingType =
  | "BLINDSIDE"
  | "STRAIGHT"
  | "FORTY_FIVE"
  | "NINETY";

export type NoteCategory =
  | "COACHING"
  | "POSITIVE_OBSERVATION"
  | "SAFETY_CONCERN"
  | "POLICY_CONCERN"
  | "GENERAL";

export type TrainingRecord = {
  id: string;
  trainerId: string;
  traineeId: string;
  trainerName: string;
  traineeName: string;
  traineeEmployeeNumber: string;
  traineeInitials: string;
  leaderNumber: string;
  startDate: number;
  endDate: number | null;
  status: TrainingStatus;
  outcome: TrainingOutcome;
  incompleteReason: string;
  lastActivity: number;
};

export type BackingEntry = {
  id: string;
  trainingRecordId: string;
  traineeId: string;
  backingTypes: BackingType[];
  traineeInitials: string;
  locationName: string;
  streetAddress: string;
  city: string;
  state: string;
  timestamp: number;
  lastUpdated: number;
};

export type TrainingNote = {
  id: string;
  trainingRecordId: string;
  traineeId: string;
  trainerId: string;
  observedAt: number;
  createdAt: number;
  category: NoteCategory;
  title: string;
  note: string;
  locationName: string;
  includeInPacket: boolean;
  lastUpdated: number;
};

export type TrainingPermissions = {
  canViewTraining: boolean;
  canViewOwnTraineeRecord: boolean;
  canManageAssignedTrainees: boolean;
  canCreateTrainingRecords: boolean;
  canEditTrainingRecords: boolean;
  canManageBackingEntries: boolean;
  canManageTrainingNotes: boolean;
  canViewTrainerAdminTools: boolean;
};

export type EvaluationCompletionSection =
  | "PRE_TRIP"
  | "COUPLING_UNCOUPLING"
  | "DRIVING"
  | "BACKING";

export type EvaluationPerformance =
  | "NOT_SELECTED"
  | "SATISFACTORY"
  | "UNSATISFACTORY";

export type TractorTrailerApproval =
  | "NOT_SELECTED"
  | "YES"
  | "NO";

export type LegacyEvaluationItemStatus =
  | "NOT_EVALUATED"
  | "COMPLETE"
  | "IMPROVEMENT";

export type SkillEvaluationNeedsWorkItem = {
  sectionKey: string;
  itemKey: string;
};

export type LegacySkillEvaluationItemResult = {
  sectionKey: string;
  itemKey: string;
  status: LegacyEvaluationItemStatus;
};

export type SkillEvaluation = {
  id: string;
  trainingRecordId: string;
  traineeId: string;
  trainerId: string;
  driverName: string;
  employeeNumber: string;
  evaluationLocation: string;
  evaluationDate: number;
  cdlStateAndNumber: string;
  cdlClass: string;
  restrictions: string;
  cdlExpirationDate: number | null;
  tractorTransmissionType: string;
  trailerType: string;
  needsWorkItems: SkillEvaluationNeedsWorkItem[];
  completedSections: EvaluationCompletionSection[];
  schemaVersion: number;
  itemResults: LegacySkillEvaluationItemResult[];
  observedBehaviors: string;
  performance: EvaluationPerformance;
  approvedForTractorTrailer: TractorTrailerApproval;
  evaluatorName: string;
  createdAt: number;
  lastUpdated: number;
};


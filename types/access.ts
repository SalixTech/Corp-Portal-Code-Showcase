import type {
  BaseRole,
  CorpRole,
} from "@/types/corporate";

export type AppRole =
  | "DRIVER"
  | "TRAINEE"
  | "TRAINER"
  | "TRAINER_ADMIN";

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

export type AccessProfile = {
  uid: string;
  displayName: string;

  // v2 authoritative model
  organizationId: string;
  organizationName: string;
  baseRoles: BaseRole[];
  corpRoles: CorpRole[];

  permissionGrants: OrganizationPermission[];
  permissionDenials: OrganizationPermission[];

  isActive: boolean;

  // legacy compatibility while migration is in progress
  role: AppRole;
  permissions: OrganizationPermission[];
  assignedTrainerIds: string[];
  assignedTraineeIds: string[];

  createdAt: number;
  updatedAt: number;
  updatedBy: string;
};

export type EffectiveAccess = {
  uid: string;
  organizationId: string;
  organizationName: string;

  baseRoles: BaseRole[];
  corpRoles: CorpRole[];

  permissions: OrganizationPermission[];

  isActive: boolean;
  isLegacy: boolean;
};

export const DEFAULT_DRIVER_ACCESS: AccessProfile = {
  uid: "",
  displayName: "",

  organizationId: "",
  organizationName: "",

  baseRoles: ["DRIVER"],
  corpRoles: [],

  permissionGrants: [],
  permissionDenials: [],

  isActive: true,

  role: "DRIVER",
  permissions: ["TRIP_MASTER_STANDARD"],
  assignedTrainerIds: [],
  assignedTraineeIds: [],

  createdAt: 0,
  updatedAt: 0,
  updatedBy: "",
};

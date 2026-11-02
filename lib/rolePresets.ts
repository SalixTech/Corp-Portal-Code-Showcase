import type {
  OrganizationPermission,
} from "@/types/access";
import type {
  BaseRole,
  CorpRole,
} from "@/types/corporate";

export const BASE_ROLE_PERMISSIONS: Record<
  BaseRole,
  OrganizationPermission[]
> = {
  DRIVER: [
    "TRIP_MASTER_STANDARD",
    "PAY_VIEW",
  ],

  TRAINEE: [
    "TRAINING_ACCESS",
  ],

  TRAINER: [
    "TRIP_MASTER_STANDARD",
    "PAY_VIEW",
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "TRAINING_CREATE_RECORDS",
    "TRAINING_EDIT_RECORDS",
    "TRAINING_BACKING_LOG",
    "TRAINING_NOTES",
  ],

  MANAGER: [
    "TRIP_MASTER_STANDARD",
    "USER_VIEW",
    "PAY_VIEW",
    "TRAINING_ACCESS",
  ],

  ACCOUNT_MANAGER: [
    "TRIP_MASTER_STANDARD",
    "USER_VIEW",
    "PAY_VIEW",
    "TRAINING_ACCESS",
  ],
};

export const CORP_ROLE_PERMISSIONS: Record<
  CorpRole,
  OrganizationPermission[]
> = {
  SUPPORT: [
    "CORP_PORTAL_ACCESS",
    "USER_VIEW",
  ],

  IT: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "USER_VIEW",
    "AUDIT_VIEW",
  ],

  TESTER: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "USER_VIEW",
    "PAY_VIEW",
    "TRAINING_ACCESS",
    "AUDIT_VIEW",
  ],

  MANAGER: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "USER_VIEW",
    "USER_EDIT",
    "ASSIGN_TRAINERS",
    "PAY_VIEW",
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "AUDIT_VIEW",
  ],

  ACCOUNT_MANAGER: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "USER_VIEW",
    "USER_EDIT",
    "USER_DISABLE",
    "ASSIGN_TRAINERS",
    "PAY_VIEW",
    "PAY_EDIT",
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "TRAINING_ADMIN",
    "AUDIT_VIEW",
  ],

  CORP_MANAGER: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "ORG_EDIT",
    "USER_VIEW",
    "USER_EDIT",
    "USER_DISABLE",
    "ASSIGN_TRAINERS",
    "PAY_VIEW",
    "PAY_EDIT",
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "TRAINING_CREATE_RECORDS",
    "TRAINING_EDIT_RECORDS",
    "TRAINING_BACKING_LOG",
    "TRAINING_NOTES",
    "TRAINING_ADMIN",
    "ORG_FEATURE_MANAGE",
    "AUDIT_VIEW",
  ],

  SALIX_CORP: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "ORG_EDIT",
    "ORG_FEATURE_MANAGE",
    "USER_VIEW",
    "USER_EDIT",
    "USER_DISABLE",
    "ASSIGN_TRAINERS",
    "PAY_VIEW",
    "PAY_EDIT",
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "TRAINING_CREATE_RECORDS",
    "TRAINING_EDIT_RECORDS",
    "TRAINING_BACKING_LOG",
    "TRAINING_NOTES",
    "TRAINING_ADMIN",
    "PARTNER_TRAINING",
    "PARTNER_BACKING_LOG",
    "AUDIT_VIEW",
  ],
};

export function permissionsForRoles({
  baseRoles,
  corpRoles,
}: {
  baseRoles: BaseRole[];
  corpRoles: CorpRole[];
}) {
  const permissions =
    new Set<OrganizationPermission>();

  baseRoles.forEach((role) => {
    BASE_ROLE_PERMISSIONS[role].forEach(
      (permission) =>
        permissions.add(permission)
    );
  });

  corpRoles.forEach((role) => {
    CORP_ROLE_PERMISSIONS[role].forEach(
      (permission) =>
        permissions.add(permission)
    );
  });

  return [...permissions];
}

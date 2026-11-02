import type {
  OrganizationPermission,
} from "@/types/access";
import type {
  OrganizationFeature,
} from "@/types/corporate";

export const FEATURE_PERMISSIONS: Record<
  OrganizationFeature,
  OrganizationPermission[]
> = {
  TRIP_MASTER_CORE: [
    "TRIP_MASTER_STANDARD",
  ],

  PAY: [
    "PAY_VIEW",
    "PAY_EDIT",
  ],

  TRAILER_HISTORY: [],

  TRAINING_CENTER: [
    "TRAINING_ACCESS",
    "TRAINING_MANAGE_ASSIGNED",
    "TRAINING_CREATE_RECORDS",
    "TRAINING_EDIT_RECORDS",
    "TRAINING_BACKING_LOG",
    "TRAINING_NOTES",
    "TRAINING_ADMIN",
  ],

  PARTNER_TRAINING: [
    "PARTNER_TRAINING",
  ],

  PARTNER_BACKING_LOG: [
    "PARTNER_BACKING_LOG",
  ],

  CORPORATE_MANAGEMENT: [
    "CORP_PORTAL_ACCESS",
    "ORG_VIEW",
    "ORG_EDIT",
    "ORG_FEATURE_MANAGE",
    "USER_VIEW",
    "USER_EDIT",
    "USER_DISABLE",
    "ASSIGN_TRAINERS",
    "AUDIT_VIEW",
  ],
};

export function permissionsAllowedByFeatures(
  features: OrganizationFeature[]
) {
  const permissions =
    new Set<OrganizationPermission>();

  features.forEach((feature) => {
    FEATURE_PERMISSIONS[
      feature
    ].forEach((permission) =>
      permissions.add(permission)
    );
  });

  return permissions;
}

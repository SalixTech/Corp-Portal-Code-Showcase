import type {
  AccessProfile,
  AppRole,
  OrganizationPermission,
} from "@/types/access";
import type {
  TrainingPermissions,
  UserRole,
} from "@/types/training";

export function permissionsForRole(
  role: UserRole
): TrainingPermissions {
  switch (role) {
    case "TRAINER_ADMIN":
      return {
        canViewTraining: true,
        canViewOwnTraineeRecord: true,
        canManageAssignedTrainees: true,
        canCreateTrainingRecords: true,
        canEditTrainingRecords: true,
        canManageBackingEntries: true,
        canManageTrainingNotes: true,
        canViewTrainerAdminTools: true,
      };

    case "TRAINER":
      return {
        canViewTraining: true,
        canViewOwnTraineeRecord: true,
        canManageAssignedTrainees: true,
        canCreateTrainingRecords: true,
        canEditTrainingRecords: true,
        canManageBackingEntries: true,
        canManageTrainingNotes: true,
        canViewTrainerAdminTools: false,
      };

    case "TRAINEE":
      return {
        canViewTraining: true,
        canViewOwnTraineeRecord: true,
        canManageAssignedTrainees: false,
        canCreateTrainingRecords: false,
        canEditTrainingRecords: false,
        canManageBackingEntries: false,
        canManageTrainingNotes: false,
        canViewTrainerAdminTools: false,
      };

    case "DRIVER":
    default:
      return {
        canViewTraining: false,
        canViewOwnTraineeRecord: false,
        canManageAssignedTrainees: false,
        canCreateTrainingRecords: false,
        canEditTrainingRecords: false,
        canManageBackingEntries: false,
        canManageTrainingNotes: false,
        canViewTrainerAdminTools: false,
      };
  }
}

const TRAINING_PERMISSION_MAP: Record<
  OrganizationPermission,
  keyof TrainingPermissions | null
> = {
  TRIP_MASTER_STANDARD: null,
  USER_VIEW: null,
  USER_EDIT: null,
  USER_DISABLE: null,
  ASSIGN_TRAINERS: null,
  PAY_VIEW: null,
  PAY_EDIT: null,
  TRAINING_ACCESS: "canViewTraining",
  TRAINING_MANAGE_ASSIGNED: "canManageAssignedTrainees",
  TRAINING_CREATE_RECORDS: "canCreateTrainingRecords",
  TRAINING_EDIT_RECORDS: "canEditTrainingRecords",
  TRAINING_BACKING_LOG: "canManageBackingEntries",
  TRAINING_NOTES: "canManageTrainingNotes",
  TRAINING_ADMIN: "canViewTrainerAdminTools",
  PARTNER_TRAINING: null,
  PARTNER_BACKING_LOG: null,
  ORG_VIEW: null,
  ORG_EDIT: null,
  ORG_FEATURE_MANAGE: null,
  AUDIT_VIEW: null,
  CORP_PORTAL_ACCESS: null,
};

function roleFromAccessProfile(
  profile: AccessProfile
): UserRole {
  if (
    profile.role === "TRAINER_ADMIN"
  ) {
    return "TRAINER_ADMIN";
  }

  if (
    profile.baseRoles.includes("TRAINER") ||
    profile.role === "TRAINER"
  ) {
    return "TRAINER";
  }

  if (
    profile.baseRoles.includes("TRAINEE") ||
    profile.role === "TRAINEE"
  ) {
    return "TRAINEE";
  }

  return "DRIVER";
}

export function permissionsForAccessProfile(
  profile: AccessProfile
): TrainingPermissions {
  if (!profile.isActive) {
    return permissionsForRole("DRIVER");
  }

  // Corp Portal rule:
  // roles provide normal permissions;
  // Grant/Deny are only overrides.
  const result: TrainingPermissions = {
    ...permissionsForRole(
      roleFromAccessProfile(profile)
    ),
  };

  // Legacy permissions are treated as grants
  // during the access-model migration.
  const grants = new Set([
    ...profile.permissions,
    ...profile.permissionGrants,
  ]);

  grants.forEach((permission) => {
    const key =
      TRAINING_PERMISSION_MAP[permission];

    if (key) {
      result[key] = true;
    }
  });

  // An explicit Corp Portal denial is authoritative
  // and always wins over role defaults or grants.
  profile.permissionDenials.forEach(
    (permission) => {
      const key =
        TRAINING_PERMISSION_MAP[
          permission
        ];

      if (key) {
        result[key] = false;
      }
    }
  );

  // Viewing one's assigned trainee record follows
  // the general Training Access result.
  result.canViewOwnTraineeRecord =
    result.canViewTraining;

  return result;
}

export function inferTrainingRole({
  hasTrainerRecords,
  hasTraineeRecords,
}: {
  hasTrainerRecords: boolean;
  hasTraineeRecords: boolean;
}): UserRole {
  if (hasTrainerRecords) {
    return "TRAINER";
  }

  if (hasTraineeRecords) {
    return "TRAINEE";
  }

  return "DRIVER";
}

export function appRoleToTrainingRole(
  role: AppRole
): UserRole {
  return role;
}

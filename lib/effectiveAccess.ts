import type {
  AccessProfile,
  EffectiveAccess,
  OrganizationPermission,
} from "@/types/access";
import type {
  OrganizationRecord,
} from "@/types/corporate";

import {
  permissionsForRoles,
} from "@/lib/rolePresets";
import {
  permissionsAllowedByFeatures,
} from "@/lib/organizationFeatures";

export function resolveEffectiveAccess({
  profile,
  organization,
}: {
  profile: AccessProfile;
  organization:
    | OrganizationRecord
    | null;
}): EffectiveAccess {
  // Legacy profile:
  // keep old explicit permissions working while
  // the user is migrated to role/feature control.
  const isLegacy =
    profile.baseRoles.length === 0 ||
    (
      profile.baseRoles.length === 1 &&
      profile.baseRoles[0] === "DRIVER" &&
      profile.corpRoles.length === 0 &&
      profile.permissionGrants.length === 0 &&
      profile.permissionDenials.length === 0 &&
      profile.permissions.length > 1
    );

  if (isLegacy) {
    return {
      uid: profile.uid,
      organizationId:
        profile.organizationId,
      organizationName:
        profile.organizationName,
      baseRoles:
        profile.baseRoles,
      corpRoles:
        profile.corpRoles,
      permissions:
        profile.isActive
          ? profile.permissions
          : [],
      isActive:
        profile.isActive,
      isLegacy: true,
    };
  }

  const rolePermissions =
    new Set<OrganizationPermission>(
      permissionsForRoles({
        baseRoles:
          profile.baseRoles,
        corpRoles:
          profile.corpRoles,
      })
    );

  profile.permissionGrants.forEach(
    (permission) =>
      rolePermissions.add(
        permission
      )
  );

  profile.permissionDenials.forEach(
    (permission) =>
      rolePermissions.delete(
        permission
      )
  );

  if (
    !profile.isActive ||
    (organization &&
      !organization.isActive)
  ) {
    return {
      uid: profile.uid,
      organizationId:
        profile.organizationId,
      organizationName:
        organization?.name ??
        profile.organizationName,
      baseRoles:
        profile.baseRoles,
      corpRoles:
        profile.corpRoles,
      permissions: [],
      isActive: false,
      isLegacy: false,
    };
  }

  // No org record yet: allow the user's role-derived
  // permissions during migration.
  if (!organization) {
    return {
      uid: profile.uid,
      organizationId:
        profile.organizationId,
      organizationName:
        profile.organizationName,
      baseRoles:
        profile.baseRoles,
      corpRoles:
        profile.corpRoles,
      permissions:
        [...rolePermissions],
      isActive: true,
      isLegacy: false,
    };
  }

  const featureAllowed =
    permissionsAllowedByFeatures(
      organization.features
    );

  const platformPermissions =
    new Set<OrganizationPermission>([
      "TRIP_MASTER_STANDARD",
    ]);

  const effective =
    [...rolePermissions].filter(
      (permission) =>
        platformPermissions.has(
          permission
        ) ||
        featureAllowed.has(
          permission
        )
    );

  return {
    uid: profile.uid,
    organizationId:
      profile.organizationId,
    organizationName:
      organization.name,
    baseRoles:
      profile.baseRoles,
    corpRoles:
      profile.corpRoles,
    permissions: effective,
    isActive: true,
    isLegacy: false,
  };
}

/** Pure staged contract. No IO, identity creation, email, or Google Play enrollment. */
export const BETA_ADMIN_IMPLEMENTATION_READY = false;
export const BETA_ADMIN_ROLES = ["SALIX_CORP", "CORP_MANAGER"] as const;
export const BETA_DAY_MS = 86_400_000;
export function canManageBeta(roles: readonly string[]): boolean {
  return roles.some(role => BETA_ADMIN_ROLES.some(allowed => allowed === role));
}
export type BetaApprovalInput = {
  status: string; retentionVersion: number; compatibilityQueue: boolean;
  requestedAt: number; expiresAt: number; ageAndroidDeleteAt: number;
  approvedAt?: number; approvalBy?: string;
};
export type BetaApprovalTransition = {
  status: "APPROVED_AWAITING_LINK"; approvedAt: number; approvalBy: string;
  reminder5At: number; reminder10At: number; setupExpiresAt: number;
  expiresAt: number; ageAndroidDeleteAt: number;
  googlePlayEnrollmentStatus: "NOT_ENROLLED";
};
/** Repeated approvals must not restart clocks. Unknown/expired schemas fail closed.
 * Caller must read and apply in ONE transaction, rechecking current actor access,
 * withdrawal/deletion state and mail leases. This contract is not wired to an API.
 */
export function planBetaApproval(record: BetaApprovalInput, actor: { uid: string; corpRoles: string[] }, now: number): BetaApprovalTransition | null {
  if (!canManageBeta(actor.corpRoles) || !actor.uid.trim() || !Number.isSafeInteger(now) ||
      record.status !== "PENDING_REVIEW" || record.retentionVersion !== 2 ||
      typeof record.compatibilityQueue !== "boolean" || record.approvedAt !== undefined || record.approvalBy !== undefined ||
      ![record.requestedAt, record.expiresAt, record.ageAndroidDeleteAt].every(Number.isSafeInteger) ||
      record.requestedAt <= 0 || record.requestedAt > now || record.expiresAt <= now ||
      record.expiresAt !== record.requestedAt + (record.compatibilityQueue ? 90 : 14) * BETA_DAY_MS ||
      record.ageAndroidDeleteAt !== record.requestedAt + 90 * BETA_DAY_MS ||
      !Number.isSafeInteger(now + 30 * BETA_DAY_MS)) return null;
  return { status: "APPROVED_AWAITING_LINK", approvedAt: now, approvalBy: actor.uid,
    reminder5At: now + 5 * BETA_DAY_MS, reminder10At: now + 10 * BETA_DAY_MS,
    setupExpiresAt: now + 15 * BETA_DAY_MS, expiresAt: now + 30 * BETA_DAY_MS,
    ageAndroidDeleteAt: record.ageAndroidDeleteAt, googlePlayEnrollmentStatus: "NOT_ENROLLED" };
}

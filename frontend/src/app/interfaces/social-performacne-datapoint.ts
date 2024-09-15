/**
 * This interface specifies the format to exchange a SocialPerformance object with the backend.
 */
export interface SocialPerformance {
    leadershipCompetence: { actual: number; expected: number };
    opennessToEmployee: { actual: number; expected: number };
    socialBehaviourToEmployee: { actual: number; expected: number };
    attitudeTowardsClients: { actual: number; expected: number };
    communicationSkills: { actual: number; expected: number };
    integrityToCompany: { expected: number; actual: number };
}

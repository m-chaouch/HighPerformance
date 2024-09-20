/**
 * This interface specifies the format to exchange a SocialPerformance object with the backend.
 */
export interface SocialPerformance {
    leadershipCompetence: { actual: number; target: number };
    opennessToEmployee: { actual: number; target: number };
    socialBehaviourToEmployee: { actual: number; target: number };
    attitudeTowardsClients: { actual: number; target: number };
    communicationSkills: { actual: number; target: number };
    integrityToCompany: { actual: number; target: number  };
}

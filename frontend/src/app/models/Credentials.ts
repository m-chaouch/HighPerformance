/**
 * this model specifies the format to exchange credentials with the backend
 */
export class Credentials{
    constructor(
        public username: string,
        public password: string
    )
    {  }
}

/**
 * this model specifies the format to exchange credentials with the backend
 * Specific for the registration
 */
export class CredentialsRegister {
    constructor(
        public username: string,
        public password: string,
        public passwordConfirm: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public jobTitle: string,
        public governmentId: number
    ) { }
}

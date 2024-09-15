/**
 * this model specifies the format to exchange credentials with the frontend
 * @param {string} username
 * @param {string} password
 */
class Credentials{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

/**
 * this model specifies the format to exchange credentials with the frontend
 * Specific for the register process
 */
class RegisterCredentials extends Credentials {
    constructor(username, password, firstname, lastname, email, jobTitle) {
        super(username, password);
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.jobTitle = jobTitle;
    }
}

module.exports = {Credentials, RegisterCredentials};
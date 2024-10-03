/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} jobTitle
 * @param {string} password
 * @param {boolean} isAdmin
 */
class User{
    constructor(username, firstname, lastname, email, jobTitle, governmentId, password, isAdmin) {
        this._id = undefined;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.jobTitle = jobTitle;
        this.governmentId = governmentId;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;
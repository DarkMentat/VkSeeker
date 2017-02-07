export default class AuthUser {

    userId: string;
    userDomain: string;
    firstName: string;
    lastName: string;

    constructor(id: string, domain: string, fname: string, lname: string) {

        this.userId = id;
        this.userDomain = domain;
        this.firstName = fname;
        this.lastName = lname;
    }
}

export default class Person {

    id: number;
    firstName: string;
    lastName: string;
    photoUrl200: string;

    constructor(id: number, firstName: string, lastName: string, photoUrl200: string) {
        this.id        = id;
        this.firstName = firstName;
        this.lastName  = lastName;
        this.photoUrl200 = photoUrl200;
    }
}

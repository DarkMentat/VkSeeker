
export enum Gender { Male, Female, Any }
export enum RelationsStatus { NotMarried, InRelationship, Engaged, Married, Complicated, Searching, InLove, Any }

export default class KeyCriteriaPack {

    country?: string;
    city?: string;
    hometown?: string;
    ageFrom?: number;
    ageTo?: number;
    hasPhoto: boolean;
    gender: Gender;
    relationship: RelationsStatus[];
    religion: string[];
    personalPriority: string[];
    peoplePriority: string[];
    smoking: string[];
    alcohol: string[];


    constructor() {
        this.country = null;
        this.city = null;
        this.hometown = null;
        this.ageFrom = null;
        this.ageTo = null;
        this.hasPhoto = false;
        this.gender = Gender.Any;
        this.relationship = [];
        this.religion = [];
        this.personalPriority = [];
        this.peoplePriority = [];
        this.smoking = [];
        this.alcohol = [];
    }
}

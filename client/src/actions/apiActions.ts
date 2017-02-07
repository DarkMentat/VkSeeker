import {Action} from "./action";
import AuthSession from "../models/AuthSession";
import KeyCriteriaPack from "../models/KeyCriteriaPack";
import {Gender} from "../models/KeyCriteriaPack";
import Person from "../models/Person";


export class SeekHumansAction extends Action {

    static typeOf(action: Action): action is SeekHumansAction{
        return action.type == "SeekHumansAction"
    }

    constructor() {
        super("SeekHumansAction");
    }
}

export class SeekHumansSuccessAction extends Action {

    static typeOf(action: Action): action is SeekHumansSuccessAction{
        return action.type == "SeekHumansSuccessAction"
    }

    people: Person[];

    constructor(peopleResponse: Person[]) {
        super("SeekHumansSuccessAction");
        this.people = peopleResponse;
    }
}

export class SeekHumansFailAction extends Action {

    static typeOf(action: Action): action is SeekHumansFailAction{
        return action.type == "SeekHumansFailAction"
    }

    constructor() {
        super("SeekHumansFailAction");
    }
}

function constructParams(communities: string[], criterias: KeyCriteriaPack) {

    let params = "communityIds=" + communities.join(",");

    if(criterias.gender != Gender.Any)   params += "&gender="   + criterias.gender;
    if(criterias.country != null)        params += "&country="  + criterias.country;
    if(criterias.city != null)           params += "&city="     + criterias.city;
    if(criterias.hometown != null)       params += "&hometown=" + criterias.hometown;

    if(criterias.ageFrom != null)  params += "&ageFrom=" + criterias.ageFrom;
    if(criterias.ageTo != null)    params += "&ageTo="   + criterias.ageTo;

    if(criterias.hasPhoto)  params += "&hasPhoto=1";

    if(criterias.relationship.length != 0)      params += "&relationship="      + criterias.relationship.join(",");
    if(criterias.religion.length != 0)          params += "&religion="          + criterias.religion.join(",");
    if(criterias.personalPriority.length != 0)  params += "&personalPriority=" + criterias.personalPriority.join(",");
    if(criterias.peoplePriority.length != 0)    params += "&peoplePriority="   + criterias.peoplePriority.join(",");
    if(criterias.smoking.length != 0)           params += "&smoking="          + criterias.smoking.join(",");
    if(criterias.alcohol.length != 0)           params += "&alcohol="          + criterias.alcohol.join(",");

    return params
}

export function seekHumans(communities: string[], criterias: KeyCriteriaPack, session: AuthSession) {
    return (dispatch: Function) => {

        dispatch(new SeekHumansAction().plain());

        let request = new XMLHttpRequest();
        request.open("GET", "http://vkseeker-router-vkseeker.44fs.preview.openshiftapps.com/vk/search?"+constructParams(communities, criterias), true);

        request.setRequestHeader("vk-auth-mid", session.mid.toString());
        request.setRequestHeader("vk-auth-expire", session.expire.toString());
        request.setRequestHeader("vk-auth-sid", session.sid);
        request.setRequestHeader("vk-auth-sig", session.sig);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {  //DONE
                if(request.status == 200) { //OK

                    dispatch(new SeekHumansSuccessAction(JSON.parse(request.responseText)).plain())
                }else{

                    dispatch(new SeekHumansFailAction().plain())
                }
            }
        };
        request.send(null);
    }
}

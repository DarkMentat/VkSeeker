import * as React from "react";
import KeyCriteriaPack from "../models/KeyCriteriaPack";
import FormEvent = React.FormEvent;
import {Gender} from "../models/KeyCriteriaPack";
import {RelationsStatus} from "../models/KeyCriteriaPack";


function nullIfEmpty(text: string) {

    return text.length == 0 ? null : text
}

function nullIfNaN(a: number) {

    return isNaN(a) ? null : a
}


export interface InputCommunityProps {

    criterias: KeyCriteriaPack
    onUpdate: (pack: KeyCriteriaPack) => void;
}

export class InputKeyCriterias extends React.Component<InputCommunityProps, undefined> {


    private onUpdate(pack: KeyCriteriaPack) {

        this.props.onUpdate(pack)
    }

    render() {
        return (
            <div>
                <p>
                <input type="text" placeholder="country"  value={this.props.criterias.country == null ? "" :this.props.criterias.country }   onChange={ e => this.onUpdate( {...this.props.criterias, country:  nullIfEmpty(e.currentTarget.value) } )} /><br/>
                <input type="text" placeholder="city"     value={this.props.criterias.city == null ? "" :this.props.criterias.city }         onChange={ e => this.onUpdate( {...this.props.criterias, city:     nullIfEmpty(e.currentTarget.value) } )} /><br/>
                <input type="text" placeholder="hometown" value={this.props.criterias.hometown == null ? "" :this.props.criterias.hometown } onChange={ e => this.onUpdate( {...this.props.criterias, hometown: nullIfEmpty(e.currentTarget.value) } )} /><br/>
                <input type="text" placeholder="ageFrom"  value={this.props.criterias.ageFrom == null ? "" :this.props.criterias.ageFrom }   onChange={ e => this.onUpdate( {...this.props.criterias, ageFrom:  nullIfNaN(+e.currentTarget.value) } )}  /><br/>
                <input type="text" placeholder="ageTo"    value={this.props.criterias.ageTo == null ? "" :this.props.criterias.ageTo }       onChange={ e => this.onUpdate( {...this.props.criterias, ageTo:    nullIfNaN(+e.currentTarget.value) } )}  /><br/>
                </p>

                <p><input type="checkbox" name="hasPhoto" value="hasPhoto" onChange={ e => this.onUpdate( {...this.props.criterias, hasPhoto: e.currentTarget.checked } )} />Has photo <br/></p>

                <p><fieldset>
                    <b>Gender</b><br/>

                    <input type="radio" name="gender" value="any"    onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, gender: Gender.Any } )}}/> Any <br/>
                    <input type="radio" name="gender" value="male"   onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, gender: Gender.Male } )}} /> Male <br/>
                    <input type="radio" name="gender" value="female" onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, gender: Gender.Female } )}}/> Female <br/>
                </fieldset></p>

                <p><fieldset>
                    <b>Relations status</b><br/>
                    <input type="checkbox" name="relationStatus" value="not_married"  onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.NotMarried]) });     else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.NotMarried) } )}}     />Not married<br/>
                    <input type="checkbox" name="relationStatus" value="relationship" onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.InRelationship]) }); else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.InRelationship) } )}} />In a relationship<br/>
                    <input type="checkbox" name="relationStatus" value="engaged"      onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.Engaged]) });        else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.Engaged) } )}}        />Engaged<br/>
                    <input type="checkbox" name="relationStatus" value="married"      onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.Married]) });        else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.Married) } )}}        />Married<br/>
                    <input type="checkbox" name="relationStatus" value="complicated"  onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.Complicated]) });    else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.Complicated) } )}}    />It's complicated<br/>
                    <input type="checkbox" name="relationStatus" value="searching"    onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.Searching]) });      else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.Searching) } )}}      />Actively searching<br/>
                    <input type="checkbox" name="relationStatus" value="love"         onChange={ e => { if(e.currentTarget.checked) this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.concat([RelationsStatus.InLove]) });         else this.onUpdate( {...this.props.criterias, relationship: this.props.criterias.relationship.filter((status) => status != RelationsStatus.InLove) } )}}         />In love<br/>
                </fieldset></p>
                <p>
                <input type="text" placeholder="religion" disabled={true} /><br/>
                <input type="text" placeholder="personalPriority" disabled={true} /><br/>
                <input type="text" placeholder="peoplePriority" disabled={true} /><br/>
                <input type="text" placeholder="smoking" disabled={true} /><br/>
                <input type="text" placeholder="alcohol" disabled={true} /><br/>
                </p>
            </div>
        );
    }
}
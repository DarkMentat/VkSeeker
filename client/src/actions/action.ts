export class Action {

    type: string;

    constructor(type: string){
        this.type = type
    }

    plain(){
        return (<any>Object).assign({}, this);
    }
}
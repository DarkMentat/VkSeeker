export default class AuthSession {

    expire: number;
    mid: number;
    secret: string;
    sid: string;
    sig: string;

    constructor(expire: number, mid: number, secret: string, sid: string, sig: string) {

        this.expire = expire;
        this.mid = mid;
        this.secret = secret;
        this.sid = sid;
        this.sig = sig;
    }
}

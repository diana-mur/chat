import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._users = [
            {id: 1, name: 'diana', email: 'diana@mail.ru', password: '12345', role: 'USER'}
        ]
        this._user = {}
        makeAutoObservable(this) // mobx будет следить за изменениями this
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}
import Cookies from "universal-cookie";

const cookies = new Cookies()

class CookieServies {
    get(name) {
        return cookies.get(name)
    }
    set(name, value, option) {
        return cookies.set(name, value, option)
    }
    remove(name) {
        return cookies.remove(name)
    }
}

export default new CookieServies()
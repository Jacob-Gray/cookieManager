function cookieManager() {
    //checks cookies, is used for internal functions.
    function checkCookie(name) {
        var output;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                if (cookies[i].indexOf(name) !== -1 && cookies[i].split("=")[0].replace(/ /g, "") === name || name === "*") {
                    if (name === "*") {
                        if (typeof output !== "object") output = Array();
                        output.push({
                            name: cookies[i].split("=")[0],
                            value: cookies[i].split("=")[1]
                        });
                    } else {
                        output = cookies[i].split("=")[1];
                    }
                }
            }
        } else console.warn("Cannot get cookie `" + name + "`, no cookies exist!");
        return output;
    }

    //Checks if the user has a certain cookie
    function hasCookie(name) {
        return checkCookie(name) === undefined ? false : true;
    }
    //Creates a cookie
    function setCookie(name, value, expires, location, secure) {
        var builder = "";
        //checks what properties are defined
        if (name !== undefined) builder = name + "=";
        else console.warn("You have to define a cookie name");
        if (value !== undefined) builder += value + ";";
        if (expires !== undefined) builder += "expires=" + expires + ";";
        if (location !== undefined) builder += "path=" + location + ";";
        if (secure !== undefined) builder += "secure=" + secure;
        //sets cookie with defined properties
        document.cookie = builder;
        return this;
    }
    //Gets the value of a certain cookie
    function getCookie(name) {
        return checkCookie(name);
    }
    //Gets the value of all cookies and returns it in an array
    function getAllCookies() {
        return checkCookie("*");
    }
    //Deletes a cookie with a certain name and path
    function deleteCookie(name, path) {
        if (name === "*") {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                deleteCookie(cookies[i].split("=")[0])
            }
        } else {
            var past = new Date();
            if (path !== undefined) path = "path =" + path;
            else path = "";
            past.setDate(past.getDate() - 1);
            document.cookie = name + "=removing;expires=" + past + ";" + path;
        }
        return this;
    }
    //Deletes all cookies
    function deleteAllCookies() {
        deleteCookie("*");
        return this;
    }
    //Checks if cookies are enabled or disabled by the user.
    function cookiesEnabled(fn) {
        setCookie("cookieManager", "check if enabled");
        var output = hasCookie("cookieManager");
        deleteCookie("cookieManager");
        if (fn !== undefined && output) fn();
        return output;
    }
    //sets methods
    this.enabled = cookiesEnabled;
    this.set = setCookie;
    this.get = getCookie;
    this.getAll = getAllCookies;
    this.has = hasCookie;
    this.delete = deleteCookie;
    this.deleteAll = deleteAllCookies;
    //returns cookieManager object
    return this;
}
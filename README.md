#cookieManager.js
A small js lib to make managing browsers cookies less of a pain. 

#How to use
To start, simply create a `cookieManager` object like:
```javascript
var cookies = cookieManager();
```
You can now manage the cookies with this `cookies` object.
```javascript
var cookies = cookieManager();
cookies.set("Name","Value","Expiration date with a Date() (leave blank for session variable)","custom path","secure");
```
Or, a real world example:
```javascript
cookies.set("user","Jim","","","true");
```
The above would create a cookie called `user`, with the value `Jim`. It would be a session variable, with the current document path, and would only be sent over a secure(`HTTPS`) connection.

#Methods
There are 7 different methods in cookieManager.

| Method  	| Use 	| Parameters 	| Notes 	|
|---------------	|-------------------------------	|-----------------------------------	|--------------------------------------------------------------------------------	|
| `set()` 	| Set or update a cookie 	| Name,Value,Expiration,Path,Secure 	| Can have other methods chained to it eg `c.set(...).getAll()` 	|
| `get()` 	| Get the value of a cookie 	| Name 	| If the Name parameter is set to `*`, it will return an array with all cookies. 	|
| `getAll()` 	| Get the value of all cookies 	|  	| Is the same as `get("*")` 	|
| `has()` 	| Checks if a cookie exists 	| Name 	| Returns `true/false` 	|
| `delete()` 	| Deletes a cookie 	| Name 	| Can be chained. If name is `*` will delete all. 	|
| `deleteAll()` 	| Deletes all cookies. 	|  	| Is the same as `delete("*")` 	|
| `enabled()` 	| Checks if cookies are enabled 	| Function 	| Returns `true/false`. If a function is inputted, it runs if true. 	|

#Example:
Set and get the value of a cookie:
```javascript
var cookies = cookieManager();
cookies.set("opinion","This is cool!");
var results = cookies.get("opinion");
```
Update cookie:
```javascript
var cookies = cookieManager();
cookies.set("opinion","This is cool!");
var results1 = cookies.get("opinion");
cookies.set("opinion","Even cooler!");
var results2 = cookies.get("opinion");
```
Get all cookies:
```javascript
var cookies = cookieManager();
var results1 = cookies.get("*");
var results2 = cookies.getAll();
```
Delete cookie:
```javascript
var cookies = cookieManager();
var results1 = cookies.delete("myCookie");
```
Delete all cookies:
```javascript
var cookies = cookieManager();
cookies.delete("*");
cookies.deleteAll("*");
```
Has cookie:
```javascript
var cookies = cookieManager();
if(cookies.has("myCookie") alert("We found the cookie!");
```
Cookies enabled:
```javascript
var cookies = cookieManager();
cookies.enabled(function(){
  //Cookies are enabled
});
if(cookies.enabled()) ;//cookies are enabled
else ;//cookies are not enabled
```
Set cookie with custom path(Note that if you set a cookie with a custom path, you won't be able to get it's value unless you are at the path or one of it's children):
```javascript
var cookies = cookieManager();
cookies.set("test","custom path!","","/customPath");
```
Delete cookie with custom path:
```javascript
var cookies = cookieManager();
cookies.delete("test","/customPath");
```
`deleteAll()` will not delete custom path cookies.

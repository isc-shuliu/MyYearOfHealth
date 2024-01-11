Class REST.UserMethods Extends %CSP.REST [ System = 3 ]
{

Parameter HandleCorsRequest As Integer = 1;

Parameter CHARSET = "UTF-8";

Parameter UseSession As BOOLEAN = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
<Route Url="/_ping" Method="GET" Call="Ping"/>
</Routes>
}

ClassMethod Response(pResponse = "", pSC = 1) As %Status
{
 set %response.ContentType = "application/json"
 if $$$ISERR(pSC) {
        set %response.Status = 500
  do $SYSTEM.OBJ.DisplayError(pSC)
  return $$$OK
 }
    if $isobject(pResponse) {
        if pResponse.%IsA("%DynamicAbstractObject") {
            do pResponse.%ToJSON()
        } else {
            write pResponse
        }
    } else {
       write pResponse 
    }
 return $$$OK
}

ClassMethod Ping() As %Status
{
    set pong = {
    "message": "pong"
  }
  return ..Response(pong)
}

}

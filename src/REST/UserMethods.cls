Class REST.UserMethods Extends %CSP.REST [ System = 3 ]
{

Parameter HandleCorsRequest As Integer = 1;

Parameter CHARSET = "UTF-8";

Parameter UseSession As BOOLEAN = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
<Route Url="/_ping" Method="GET" Call="Ping"/>
<Route Url="/observation" Method="POST" Call="SaveObservation"/>
<Route Url="/care-plan" Method="POST" Call="SaveCarePlan"/>
<Route Url="/goal" Method="POST" Call="SaveGoal"/>
<Route Url="/daily-goal" Method="POST" Call="SaveDailyGoal"/>
<Route Url="/observation" Method="GET" Call="GetObservation"/>
<Route Url="/care-plan/:userId" Method="GET" Call="GetCarePlan" Cors="true"/>
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

ClassMethod SaveObservation()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.observations.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set Observation = ##class(Model.UserObservation).%New()
        set Observation.UserId = json.UserId
        set Observation.Observation = value
        do Observation.%Save()
    }
    set response = {}

    return ..Response(response)
}

ClassMethod SaveCarePlan()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.careplans.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set CarePlan = ##class(Model.UserCarePlan).%New()
        set CarePlan.UserId = json.UserId
        set CarePlan.CarePlan = value
        do CarePlan.%Save()
    }
    set response = {}

    return ..Response(response)
}

ClassMethod GetCarePlan(userId As %String)
{
    set response = []
    set sql = "select * from Model.UserCarePlan where UserId = ?"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute(1)
    return ..Response(tcStatus)
	while tcResult.%Next() {
        
        set UserCarePlan = {}
        set UserCarePlan.userId = tcResult.UserId
        set UserCarePlan.carePlan = tcResult.CarePlan
        do response.%Push(UserCarePlan)
    }

    return ..Response(response)
}

// list of goals for user

ClassMethod SaveGoal()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.goals.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set Goal = ##class(Model.Goal).%New()
        set Goal.UserId = json.UserId
        set Goal.Goal = value
        do Goal.%Save()
    }
    set response = {}

    return ..Response(response)
}

// daily progress

ClassMethod SaveDailyGoal()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.goals.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set Goal = ##class(Model.Goal).%New()
        set Goal.UserId = json.userId
        set Goal.Date = json.date
        set Goal.Goal = value
        do Goal.%Save()
    }
    set response = {}

    return ..Response(response)
}

}

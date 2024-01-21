Class REST.UserMethods Extends %CSP.REST [ System = 3 ]
{

Parameter HandleCorsRequest As Integer = 1;

Parameter CHARSET = "UTF-8";

Parameter UseSession As BOOLEAN = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
<Route Url="/_ping" Method="GET" Call="Ping"/>

<Route Url="/user/:userId" Method="GET" Call="GetUserInfo"/>

<Route Url="/observation" Method="POST" Call="SaveObservation"/>
<Route Url="/observation/:userId" Method="GET" Call="GetObservation"/>

<Route Url="/care-plan" Method="POST" Call="SaveCarePlan"/>
<Route Url="/care-plan/:userId" Method="GET" Call="GetCarePlan"/>

<Route Url="/goal" Method="POST" Call="SaveGoal"/>
<Route Url="/goal/:userId" Method="GET" Call="GetGoal"/>
<Route Url="/goal" Method="PATCH" Call="EditGoal"/>

<Route Url="/daily-goal" Method="POST" Call="SaveDailyGoal"/>
<Route Url="/daily-goal/:userId" Method="GET" Call="GetDailyGoal"/>
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
        set Observation.UserId = json.userId
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
        set CarePlan.UserId = json.userId
        set CarePlan.CarePlan = value
        do CarePlan.%Save()
    }
    set response = {}

    return ..Response(response)
}

ClassMethod GetUserInfo(userId As %String) As %Status
{
    SET ns="FHIRSERVER"
    ZNSPACE ns
    set response = {}
    set response.observations = []
    set sql = "select * from HarbourFHIR.Observation where SubjectReference = ? group by CodeCodingCode"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute("Patient/"_userId)
	while tcResult.%Next() {
        set UserObservation = {}
        set UserObservation.code = tcResult.CodeCodingCode
        set UserObservation.observation = tcResult.CodeText
        do response.observations.%Push(UserObservation)
    }
    set response.carePlans = []
    set sql = "select * from HarbourFHIR.CarePlan where SubjectReference = ? group by CategoryCodingDisplay"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute("Patient/"_userId)
	while tcResult.%Next() {
        set UserObservation = {}
        set UserObservation.code = tcResult.CategoryCodingCode
        set UserObservation.careplan = tcResult.CategoryCodingDisplay
        do response.carePlans.%Push(UserObservation)
    }
    &sql(select Gender, Name, Status, Surname, Telecom, BirthDate into :gender, :name, :status, :surname, :telecom, :birthDate from HarbourFHIR.Patient where ID = :userId)
    set User = {}
    set User.gender = gender
    set User.hame = name
    set User.status = status
    set User.surname = surname
    set User.telecom = telecom
    set User.birthDate = birthDate
    set response.user = User
    
    return ..Response(response)
}

ClassMethod GetCarePlan(userId As %String)
{
    set response = []
    set sql = "select * from Model.UserCarePlan where UserId = ?"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute(userId)
    while tcResult.%Next() {
        set UserCarePlan = {}
        set UserCarePlan.userId = tcResult.UserId
        set UserCarePlan.carePlan = tcResult.CarePlan
        do response.%Push(UserCarePlan)
    }

    return ..Response(response)
}

ClassMethod GetObservation(userId As %String)
{
    SET ns="FHIRSERVER"
    ZNSPACE ns
    set response = []
    set sql = "select * from HarbourFHIR.Observation where SubjectReference = ? group by CodeCodingCode"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute("Patient/"_userId)
	while tcResult.%Next() {
        set UserObservation = {}
        set UserObservation.code = tcResult.CodeCodingCode
        set UserObservation.observation = tcResult.CodeText
        do response.%Push(UserObservation)
    }
    return ..Response(response)
}

// list of goals for user

ClassMethod GetGoal(userId As %String)
{
    set response = []
    set isActive = %request.Get("isActive")
    set sql = "select * from Model.Goal where UserId = ?"
    if (isActive '= "") {
        set sql = sql_" and IsActive = 1"
    }
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute(userId)
   
	while tcResult.%Next() {
        set Goal = {}
        set Goal.userId = tcResult.UserId
        set Goal.name = tcResult.Name
        set Goal.isActive = tcResult.IsActive
        do response.%Push(Goal)
    }

    return ..Response(response)
}

ClassMethod SaveGoal()
{
    set json = {}.%FromJSON(%request.Content)
    set Goal = ##class(Model.Goal).%New()
    set Goal.UserId = json.userId
    set Goal.Name = json.name
    set Goal.IsActive = json.isActive
    do Goal.%Save()
    return ..Response({})
}

ClassMethod EditGoal()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set Goal = ##class(Model.Goal).%OpenId(value.goalId)
        set Goal.Name = value.name
        set Goal.IsActive = value.isActive
        do Goal.%Save()
    }
    return ..Response()
}

// daily progress

ClassMethod SaveDailyGoal()
{
    set json = {}.%FromJSON(%request.Content)
    set iterator = json.goals.%GetIterator()
    while iterator.%GetNext(.key,.value) {
        set Goal = ##class(Model.Goal).%OpenId(value)
        set DateGoal = ##class(Model.DateGoal).%New()
        set DateGoal.UserId = json.userId
        set DateGoal.DateTime = json.date
        set DateGoal.Goal = Goal
        do DateGoal.%Save()
    }

    return ..Response({})
}

ClassMethod GetDailyGoal(userId As %String)
{
    set response = []
    set dateFrom = %request.Get("dateFrom")
    set dateTo = %request.Get("dateTo")
    set sql = "SELECT DAY(DateTime) AS DayOfMonth, COUNT(*) AS CompletedGoals, (SELECT COUNT(DISTINCT ID) FROM Model.Goal WHERE UserId = ? AND IsActive = 1) AS TotalActiveGoals FROM Model.DateGoal WHERE UserId = ? AND DateTime BETWEEN ? AND ? GROUP BY DAY(DateTime) ORDER BY DAY(DateTime)"
    set tcStatement = ##class(%SQL.Statement).%New()
    set tcStatus = tcStatement.%Prepare(sql)
    set tcResult = tcStatement.%Execute(userId, userId, dateFrom, dateTo)
	while tcResult.%Next() {
        set DayOfMonth = {}
        set DayOfMonth.dayOfMonth = tcResult.DayOfMonth
        set DayOfMonth.completedGoals = tcResult.CompletedGoals
        set DayOfMonth.totalActiveGoals = tcResult.TotalActiveGoals
        do response.%Push(DayOfMonth)
    }

    return ..Response(response)
}

}

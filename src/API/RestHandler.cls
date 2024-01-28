Class API.RestHandler Extends %CSP.REST [ System = 3 ]
{

Parameter HandleCorsRequest As Integer = 1;

Parameter CHARSET = "UTF-8";

Parameter UseSession As BOOLEAN = 1;

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
<Route Url="/user" Method="POST" Call="GetUserId"/>
<Route Url="/user/:userId" Method="GET" Call="GetUserInfo"/>

<Route Url="/observation" Method="POST" Call="SaveObservation"/>
<Route Url="/observation/:userId" Method="GET" Call="GetObservations"/>

<Route Url="/care-plan" Method="POST" Call="SaveCarePlan"/>
<Route Url="/care-plan/:userId" Method="GET" Call="GetCarePlans"/>

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

ClassMethod GetUserId(phone As %String) As %Status
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        new $NAMESPACE
        set $NAMESPACE = "FHIRSERVER"
        set response = {}
        &sql(select ID into :userId from HarbourFHIR.Patient where Telecom = :json.phone)
        set response.userId = userId
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod SaveObservation()
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        set iterator = json.observations.%GetIterator()
        set response = {}
        set response.observation = []
        &sql(delete from Model.UserObservation where UserId = :json.userId)
        while iterator.%GetNext(.key,.value) {
            set Observation = ##class(Model.UserObservation).%New()
            set Observation.UserId = json.userId
            set Observation.Observation = value
            do Observation.%Save()
            set response.userId = Observation.UserId
            do response.observation.%Push(value)
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod SaveCarePlan()
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        set iterator = json.careplans.%GetIterator()
        set response = {}
        set response.carePlan = []
        &sql(delete from Model.UserCarePlan where UserId = :json.userId)
        while iterator.%GetNext(.key,.value) {
            set CarePlan = ##class(Model.UserCarePlan).%New()
            set CarePlan.UserId = json.userId
            set CarePlan.CarePlan = value
            do CarePlan.%Save()
            set response.userId = CarePlan.UserId
            do response.carePlan.%Push(value)
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod GetUserInfo(userId As %String) As %Status
{
    try{
        set responseSC = $$$OK
        new $NAMESPACE
        set $NAMESPACE = "FHIRSERVER"
        set response = {}
        set response.observations = []
        set sql = "select CodeCodingCode, CodeText from HarbourFHIR.Observation where SubjectReference = ? group by CodeCodingCode"
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
        set sql = "select CategoryCodingCode, CategoryCodingDisplay from HarbourFHIR.CarePlan where SubjectReference = ? and Status = 'active' group by CategoryCodingDisplay"
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
        set User.name = name
        set User.status = status
        set User.surname = surname
        set User.telecom = telecom
        set User.birthDate = birthDate
        set response.user = User
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod GetObservations(userId As %String)
{
    try{
        set responseSC = $$$OK
        set sql = "select Observation from Model.UserObservation where UserId = ?"
        set tcStatement = ##class(%SQL.Statement).%New()
        set tcStatus = tcStatement.%Prepare(sql)
        set tcResult = tcStatement.%Execute(userId)
        set ObservationCode = ""
        while tcResult.%Next() {
            if (ObservationCode '= "") {
                set ObservationCode = ObservationCode_", '"_tcResult.Observation_"'"
            } else {
                set ObservationCode = "'"_tcResult.Observation_"'"
            }
        }
        new $NAMESPACE
        set $NAMESPACE = "FHIRSERVER"
        set response = []
        set sql = "select CodeText, CodeCodingCode, ValueQuantityValue, ValueQuantityUnit, Issued from HarbourFHIR.Observation where SubjectReference = ? and CodeCodingCode In("_ObservationCode_") and ValueQuantityValue is not null group by CodeCodingCode order by Issued DESC"
        set tcStatement = ##class(%SQL.Statement).%New()
        set tcStatus = tcStatement.%Prepare(sql)
        set tcResult = tcStatement.%Execute("Patient/"_userId)
        while tcResult.%Next() {
            set UserObservation = {}
            set UserObservation.name = tcResult.CodeText
            set UserObservation.code = tcResult.CodeCodingCode
            set UserObservation.value = tcResult.ValueQuantityValue_" "_tcResult.ValueQuantityUnit
            set UserObservation.date = tcResult.Issued
            do response.%Push(UserObservation)
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod GetCarePlans(userId As %String)
{
    try{
        set responseSC = $$$OK
        set sql = "select CarePlan from Model.UserCarePlan where UserId = ?"
        set tcStatement = ##class(%SQL.Statement).%New()
        set tcStatus = tcStatement.%Prepare(sql)
        set tcResult = tcStatement.%Execute(userId)
        set CarePlanCode = ""
        while tcResult.%Next() {
            if (CarePlanCode '= "") {
                set CarePlanCode = CarePlanCode_", '"_tcResult.CarePlan_"'"
            } else {
                set CarePlanCode = "'"_tcResult.CarePlan_"'"
            }
        }
        new $NAMESPACE
        set $NAMESPACE = "FHIRSERVER"
        set response = []
        set sql = "select CategoryCodingCode, ActivityDetailCodeCodingDisplay, CategoryCodingDisplay, PeriodStart, DescriptionText from HarbourFHIR.CarePlan cp left join HarbourFHIR.Goal g on cp.GoalReference = g.Key where cp.SubjectReference = ? and cp.CategoryCodingCode In("_CarePlanCode_") and cp.Status = 'active'"
        set tcStatement = ##class(%SQL.Statement).%New()
        set tcStatus = tcStatement.%Prepare(sql)
        set tcResult = tcStatement.%Execute("Patient/"_userId)
        while tcResult.%Next() {
            set UserObservation = {}
            set UserObservation.code = tcResult.CategoryCodingCode
            set UserObservation.activity = tcResult.ActivityDetailCodeCodingDisplay
            set UserObservation.carePlan = tcResult.CategoryCodingDisplay
            set UserObservation.start = tcResult.PeriodStart
            set UserObservation.goal = tcResult.DescriptionText
            do response.%Push(UserObservation)
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

// list of goals for user

ClassMethod GetGoal(userId As %String)
{
    try{
        set responseSC = $$$OK
        set response = []
        set isActive = $get(%request.Data("isActive",1))
        set sql = "select ID, UserId, Name, IsActive from Model.Goal where UserId = ?"
        if (isActive '= "") {
            set sql = sql_" and IsActive = 1"
        }
        set tcStatement = ##class(%SQL.Statement).%New()
        set tcStatus = tcStatement.%Prepare(sql)
        set tcResult = tcStatement.%Execute(userId)
    
        while tcResult.%Next() {
            set Goal = {}
            set Goal.id = tcResult.ID
            set Goal.userId = tcResult.UserId
            set Goal.name = tcResult.Name
            set Goal.isActive = tcResult.IsActive
            do response.%Push(Goal)
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod SaveGoal()
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        &sql(select ID from Model.Goal where Name = :json.name and UserId = :json.userId)
        if SQLCODE = 0 {
            set description = "This Goal is exist!"
            set %response.Status = ..#HTTP409CONFLICT
            return ..Response(description)
        }
        set Goal = ##class(Model.Goal).%New()
        set Goal.UserId = json.userId
        set Goal.Name = json.name
        set Goal.IsActive = json.isActive
        do Goal.%Save()

        set response = {}
        set response.userId = Goal.UserId
        set response.name = Goal.Name
        set response.isActive = Goal.IsActive
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod EditGoal()
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        set iterator = json.%GetIterator()
        while iterator.%GetNext(.key,.value) {
            set Goal = ##class(Model.Goal).%OpenId(value.goalId)
            set Goal.Name = value.name
            set Goal.IsActive = value.isActive
            do Goal.%Save()
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response({}, responseSC)
}

// daily progress

ClassMethod SaveDailyGoal()
{
    try{
        set responseSC = $$$OK
        set json = {}.%FromJSON(%request.Content)
        set iterator = json.goals.%GetIterator()
        set response = {}
        set response.goal = []
        while iterator.%GetNext(.key,.value) {
            set Goal = ##class(Model.Goal).%OpenId(value)
            &sql(select ID from Model.DateGoal where UserId = :json.userId and TO_CHAR(DateTime, 'yyyy-MM-dd') = :json.date and Goal = :value)
            if (SQLCODE = 100) && (Goal.UserId = json.userId) {
                set DateGoal = ##class(Model.DateGoal).%New()
                set DateGoal.UserId = json.userId
                set DateGoal.DateTime = json.date
                set DateGoal.Goal = Goal
                do DateGoal.%Save()
                do response.goal.%Push(Goal.Name)
                set response.userId = DateGoal.UserId
                set response.date = DateGoal.DateTime
            } 
        }
    }
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

ClassMethod GetDailyGoal(userId As %String)
{
    try{
        set responseSC = $$$OK
        set response = []
        set dateFrom = $get(%request.Data("dateFrom",1))
        set dateTo = $get(%request.Data("dateTo",1))
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
    } 
    catch(ex) {
        set responseSC = ex.AsStatus()
    }
    return ..Response(response, responseSC)
}

}

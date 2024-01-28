Class Model.UserCarePlan Extends %Persistent
{

Property UserId As %String(MAXLEN = 15) [ Required ];

Index UserIdIndex On UserId;

Property CarePlan As %String(MAXLEN = 100) [ Required ];

Storage Default
{
<Data name="UserCarePlanDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>UserId</Value>
</Value>
<Value name="3">
<Value>CarePlan</Value>
</Value>
</Data>
<DataLocation>^Model.UserCarePlanD</DataLocation>
<DefaultData>UserCarePlanDefaultData</DefaultData>
<IdLocation>^Model.UserCarePlanD</IdLocation>
<IndexLocation>^Model.UserCarePlanI</IndexLocation>
<StreamLocation>^Model.UserCarePlanS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}

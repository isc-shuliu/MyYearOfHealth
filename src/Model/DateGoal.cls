Class Model.DateGoal Extends %Persistent
{

Property UserId As %String(MAXLEN = 15) [ Required ];

Index UserIdIndex On UserId;

Property DateTime As %DateTime [ Required ];

Index DateTimeIndex On DateTime;

Relationship Goal As Model.Goal [ Cardinality = one, Inverse = Goal ];

Storage Default
{
<Data name="DateGoalDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>UserId</Value>
</Value>
<Value name="3">
<Value>DateTime</Value>
</Value>
<Value name="4">
<Value>Goal</Value>
</Value>
</Data>
<DataLocation>^Model.DateGoalD</DataLocation>
<DefaultData>DateGoalDefaultData</DefaultData>
<IdLocation>^Model.DateGoalD</IdLocation>
<IndexLocation>^Model.DateGoalI</IndexLocation>
<StreamLocation>^Model.DateGoalS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}

Class Model.DateGoal Extends %Persistent
{

Property UserId As %String;

Property Date As %DateTime;

Relationship Goal As Model.Goal [ Cardinality = one, Inverse = Goal ];

Storage Default
{
<Data name="DateGoalDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Date</Value>
</Value>
<Value name="3">
<Value>Goal</Value>
</Value>
<Value name="4">
<Value>UserId</Value>
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

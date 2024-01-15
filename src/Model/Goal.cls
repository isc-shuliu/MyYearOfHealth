Class Model.Goal Extends %Persistent
{

Property UserId As %String;

Relationship Goal As Model.DateGoal [ Cardinality = many, Inverse = Goal ];

Storage Default
{
<Data name="GoalDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>UserId</Value>
</Value>
</Data>
<DataLocation>^Model.GoalD</DataLocation>
<DefaultData>GoalDefaultData</DefaultData>
<IdLocation>^Model.GoalD</IdLocation>
<IndexLocation>^Model.GoalI</IndexLocation>
<StreamLocation>^Model.GoalS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}

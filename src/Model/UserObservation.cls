Class Model.UserObservation Extends %Persistent
{

Property UserId As %String;

Property Observation As %String;

Storage Default
{
<Data name="UserObservationDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>UserId</Value>
</Value>
<Value name="3">
<Value>Observation</Value>
</Value>
</Data>
<DataLocation>^Model.UserObservationD</DataLocation>
<DefaultData>UserObservationDefaultData</DefaultData>
<IdLocation>^Model.UserObservationD</IdLocation>
<IndexLocation>^Model.UserObservationI</IndexLocation>
<StreamLocation>^Model.UserObservationS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}

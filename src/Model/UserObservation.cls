Class Model.UserObservation Extends %Persistent
{

Property UserId As %String(MAXLEN = 15) [ Required ];

Index UserIdIndex On UserId;

Property Observation As %String(MAXLEN = 100) [ Required ];

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

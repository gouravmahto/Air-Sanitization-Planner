

function switchUser(userId)
{
    alert(userId);
}

metadata = {
    "user": "cppxaxa",
    "plan": "Plan001",
    "key": "Key001"
}

function getEstimate()
{
    $.post("estimate", metadata).done(function( data ) {
        console.log(data);
        $("#cost").html(data["cost"]);
        $("#remainingTime").html(data["time"]);
        $("#chargePerc").html(data["charge"]);
        $("#progress").val(data["progress"]);

        console.log($("#progress"));
    });
}

function setKeyId(keyId)
{
    metadata["key"] = keyId;
    loadIframe("mapreviewif2", "mapreview.html" + getMetadata());
    $("#apikey").val(keyId);
}

function resetKeyId(keyId)
{
    metadata["key"] = keyId;

    $.post("resetRun", metadata).done(function( data ) {
        // $( ".result" ).html( data );
        // alert("JobStarted");
        loadIframe("mapreviewif2", "mapreview.html" + getMetadata());
    });
}

function getMetadata()
{
    ans = "?";
    for (el in metadata)
    {
        ans += el + "=" + metadata[el] + "&";
    }
    return ans;
}

$(document).ready(function() {
    // setInterval(getEstimate, 2000);

    setKeyGenerationView();

    $(".userIdButton").click(function() {
        var clientName = $(this).html().split("<")[0].split("@")[1];
        switchUser(clientName);
    });

    $.get("getKeys", function( data ) {
        // $( ".result" ).html( data );
        // alert(data);
        showKeyTable(data);
    });

    $("#addKey").click(function() {
        $.get("addKey", function( data ) {
            // $( ".result" ).html( data );
            // alert(data);
            showKeyTable(data);
        });
    });

    $.get("getPlans", function( data ) {
        // $( ".result" ).html( data );
        // alert(data);
        showPlanTable(data);
    });

    $("#addPlan").click(function() {
        alert("AddPlan");
        $.get("addPlan", function( data ) {
            // $( ".result" ).html( data );
            // alert(data);
            showPlanTable(data);
        });
    });

    $("#runJobButton").click(function() {
        // alert("RunJob");
        console.log(metadata);
        $.post("triggerRun", metadata).done(function( data ) {
            // $( ".result" ).html( data );
            // alert("JobStarted");
        });
    });
});

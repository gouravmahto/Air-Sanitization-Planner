function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);    // here you can change src
        return false;
    }
    return true;
}

function setViewTitle(title)
{
    // alert(title);
    $("#viewtitle").html(title);
}

function showKeyTable(arr)
{
    $("#keyTable tbody").html("");

    i = 1;
    for (el of arr)
    {
    html = '<tr class="pure-table-odd">\
    <td>'+i+'</td>\
    <td>' + el + '</td>\
    <td>New</td>\
    <td><button class="pure-button" onClick="setKeyId(\'' + el + '\')" tag="Honda"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i></button> &nbsp;&nbsp; <button onClick="resetKeyId(\'' + el + '\')" class="pure-button" tag="Honda"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">highlight_off</i></button></td>\
</tr>';
    $("#keyTable tbody").append(html);
    i++;
    }
}


function showPlanTable(arr)
{
    $("#planTable tbody").html("");

    for (el of arr)
    {
    html = '<tr class="pure-table-odd">\
    <td>1</td>\
    <td>' + el + '</td>\
    <td>New</td>\
    <td><button class="pure-button" tag="Honda"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i></button> &nbsp;&nbsp; <button class="pure-button" tag="Honda"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">highlight_off</i></button></td>\
</tr>';
    $("#planTable tbody").append(html);
    }
}

function setKeyGenerationView()
{
    setViewTitle("Key Generation");
    $("#keyGenerationCard").slideDown();
    $("#keyGenerationCard2").slideDown("slow", function() {
        loadIframe("mapreviewif2", "mapreview.html" + getMetadata());
    });
    $("#plansCard").slideUp();
    $("#buildMapCard").slideUp();
    $("#algorithmsCard").slideUp();
    $("#reviewCard").slideUp();
    $("#reviewCard2").slideUp();

    $("#addKey").show();
    $("#addPlan").hide();
}

function setPlansView()
{
    setViewTitle("Browse Plans");
    $("#keyGenerationCard").slideUp();
    $("#keyGenerationCard2").slideUp();
    $("#plansCard").slideDown();
    $("#buildMapCard").slideUp();
    $("#algorithmsCard").slideUp();
    $("#reviewCard").slideUp();
    $("#reviewCard2").slideUp();

    $("#addKey").hide();
    $("#addPlan").show();
}

function setBuildMapView()
{
    setViewTitle("Macro Mapping");
    $("#keyGenerationCard").slideUp();
    $("#keyGenerationCard2").slideUp();
    $("#plansCard").slideUp();
    $("#buildMapCard").slideDown("slow", function() {
        loadIframe("painterif", "painter.html" + getMetadata());
    });
    $("#algorithmsCard").slideUp();
    $("#reviewCard").slideUp();
    $("#reviewCard2").slideUp();

    $("#addKey").hide();
    $("#addPlan").hide();
}

function setAlgorithmsView()
{
    setViewTitle("Algorithms Selection");
    $("#keyGenerationCard").slideUp();
    $("#keyGenerationCard2").slideUp();
    $("#plansCard").slideUp();
    $("#buildMapCard").slideUp();
    $("#algorithmsCard").slideDown();
    $("#reviewCard").slideUp();
    $("#reviewCard2").slideUp();

    $("#addKey").hide();
    $("#addPlan").hide();
}

function setReviewView()
{
    setViewTitle("Review Plan");
    $("#keyGenerationCard2").slideUp();
    $("#keyGenerationCard").slideUp();
    $("#plansCard").slideUp();
    $("#buildMapCard").slideUp();
    $("#algorithmsCard").slideUp();
    $("#reviewCard").slideDown();
    $("#reviewCard2").slideDown("slow", function() {
        loadIframe("mapreviewif", "mapreview.html" + getMetadata());
    });
    
    $("#addKey").hide();
    $("#addPlan").hide();

    getEstimate();
}



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", appendJavascript, false);

function appendJavascript() {
    console.log("Reporting in");

    //hajimeCheckBoxes();

    //Populate CompareList Checkboxes with current Models
    function hajimeCheckBoxes() {
        $("#comp-images > div").each(function() {
            var checkBoxId = $(this).attr("class").split(" ", 1);

            $("#" + checkBoxId).attr('checked', true);
        });
    }

    $('#comp-images').on('click', '.clear-button', function() {
        console.log("Remove Reporting");
        removeModel($(this));
        fillPaddingVehicles();
    });

    //Functions begin... here there be monsters
    function removeModel(modelId) {
        //get the common class stored in the close ID by splitting it
        var targetId = modelId.attr("id").split("-", 1);
        console.log("TargetId: " + targetId);

        //Using the ID... have each element containing the class eliminate itself
        $("div.content ." + targetId).each(function() {
            console.log("Found: " + $(this).parent());
            $(this).remove();
        });
        //Uncheck the Compare List checkbox
        $("#" + targetId).attr('checked', false);
    }

    //Checkbox is Clicked

    $(".getModel").click(function() {
        //Check the number of models doesn't exceed Max
        //Remove message when the 4th vehicle has been unselected
        if (!$(this).is(':checked')) {
            $("#moreThan4Id").remove();
        }else{
            //Remove all Padding vehicles - add here to ensure the below tests are accurate
            removeAllPaddingVehicles();
            
            if (checkModelCount() >= 4) {
                $(this).attr('checked', false);
                //Display error message                                

                //Remove old error messages first
                if ($("#moreThan4Id").length !== 0) {
                    $("#moreThan4Id").remove();
                }
                //Build error Span Tag
                var newSpan = document.createElement('span');
                newSpan.id = "moreThan4Id";
                newSpan.className = 'Morethan4Span';
                newSpan.innerHTML = 'Maximum of 4 Models';
                //Append Error Span Tag
                $(this).parent().append(newSpan);
            } else {
                //A Vehicle can be added                                
                //Add $this model
                addModel($(this).attr('value'));
            }
            //After vehicles are appended fill the blanks with padding vehicles
            fillPaddingVehicles();
        }
        if (!$(this).is(':checked')) {
            //Vehicle has been unchecked from the Compare List
            //Remove the model
            removeModel($(this));
            //Fill empty spaces with Padding Vehicles
            fillPaddingVehicles();
        }

    });

    function checkModelCount() {
        var numberOfChecked = 0;
        //Count how many vehicles are currently displaying on the screen
        $("#comp-images > div").each(function() {
            //if ($(this).is(':checked')) {
            numberOfChecked++;
            //}
        });
        console.log("Model Count: " + numberOfChecked);
        return numberOfChecked;
    }

    function addModel(modelId) {
        //get model From array
        var theModel = getModelData(modelId);

        //Create the Image Div
        var newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column';
        newDiv.innerHTML = '<a id="' + theModel.modelId + '-Close"  class="clear-button remodal-close" href="#"></a>' +
            '<img alt="First Vehicle Module" src="' + theModel.imageURL + '">';

        document.getElementById("comp-images").appendChild(newDiv);

        //Create Image Text
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column';
        console.log("Second Round Classname: " + newDiv.className);
        newDiv.innerHTML = '<h2>' + theModel.imageText + '</h2>' +
            '<p>' + theModel.variantType + ' (Base Model)</p>';

        document.getElementById("comp-modelname").appendChild(newDiv);

        //Create Buyers Guide Link
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<a href="#">Download Buyers Guide</a>';

        document.getElementById("comp-buyersguide").appendChild(newDiv);

        //Create Price
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelPrice +
            '<span><a href="' + theModel.modelEnquiry + '">Enquire Now ></a></span></p>';

        document.getElementById("comp-price").appendChild(newDiv);

        //Create Transmission
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelTransmission + '</p>';

        document.getElementById("comp-trans").appendChild(newDiv);

        //Create Engine
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelEngine + '</p>';

        document.getElementById("comp-engine").appendChild(newDiv);

        //Create Power
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelPower + '</p>';

        document.getElementById("comp-power").appendChild(newDiv);

        //Create Torque
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelTorque + '</p>';

        document.getElementById("comp-torque").appendChild(newDiv);

        //Create Fuel
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelFuel + '</p>';

        document.getElementById("comp-fuel-type").appendChild(newDiv);

        //Create Econo
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column hide-mobile';
        newDiv.innerHTML = '<p>' + theModel.modelEcono + '</p>';

        document.getElementById("comp-fueleconomy").appendChild(newDiv);

        //Create Colour - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 small-6 column colour-range';
        newDiv.innerHTML = '<span class="show-color"> </span>' +
            theModel.modelColour;

        document.getElementById("comp-colours").appendChild(newDiv);

        //Create Alloy - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelAlloy + '</p>';

        document.getElementById("comp-alloy").appendChild(newDiv);

        //Create Sunroof - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelSunroof + '</p>';

        document.getElementById("comp-sunroof").appendChild(newDiv);

        //Create Running Lights - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelRunningLights + '</p>';

        document.getElementById("comp-running-lights").appendChild(newDiv);

        //Create Roof Rails - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelRoofRails + '</p>';

        document.getElementById("comp-roof-rails").appendChild(newDiv);

        //Create Auto Wipers - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelAutoWipers + '</p>';

        document.getElementById("comp-wipers").appendChild(newDiv);

        //Create Keyless - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelKeyless + '</p>';

        document.getElementById("comp-keyless").appendChild(newDiv);

        //Create Voice Command - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelUconnect + '</p>';

        document.getElementById("comp-uconnect").appendChild(newDiv);

        //Create Voice Command - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelVoiceCommand + '</p>';

        document.getElementById("comp-voice-command").appendChild(newDiv);

        //Create GPS - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelGPS + '</p>';

        document.getElementById("comp-gps").appendChild(newDiv);

        //Create Steering Wheel Controls - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelSWControls + '</p>';

        document.getElementById("comp-sw-controls").appendChild(newDiv);

        //Create Heated Seats - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelHeatedSeats + '</p>';

        document.getElementById("comp-heated-seats").appendChild(newDiv);

        //Create Leather Seats - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelLeather + '</p>';

        document.getElementById("comp-leather").appendChild(newDiv);

        //Create Heated Seats - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelParkAssist + '</p>';

        document.getElementById("comp-park-assist").appendChild(newDiv);

        //Create Reverse Camera - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelANCAP + '</p>';

        document.getElementById("comp-ancap").appendChild(newDiv);

        //Create Reverse Camera - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelReverseCam + '</p>';

        document.getElementById("comp-reverse-camera").appendChild(newDiv);

        //Create Cruise Control - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelCruiseControl + '</p>';

        document.getElementById("comp-cruise-control").appendChild(newDiv);

        //Create Front Airbags - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelFrontAirbag + '</p>';

        document.getElementById("comp-front-airbag").appendChild(newDiv);

        //Create Side Airbag - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelSideAirbag + '</p>';

        document.getElementById("comp-side-airbag").appendChild(newDiv);

        //Create Traction - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelTraction + '</p>';

        document.getElementById("comp-traction").appendChild(newDiv);

        //Create ABS - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelABS + '</p>';

        document.getElementById("comp-abs").appendChild(newDiv);

        //Create Heated Seats - When populated just add the JSON Ref to innerHTML
        newDiv = document.createElement('div');
        newDiv.className = theModel.modelId + ' medium-3 column';
        newDiv.innerHTML = '<p>' + theModel.modelESC + '</p>';

        document.getElementById("comp-esc").appendChild(newDiv);


    }

    function getModelData(modelId) {
        var selectedModel = modelId;
        //define a var to hold the model when found
        var theModel;
        //for each array in the array test if mod_data == the modelId parameter
        $.each(mod_Data, function(i, v) {
            if (v.modelId === selectedModel) {
                //if it does send it to theModel
                theModel = v;
            }
        });
        return theModel;
    }

    hajimeCheckBoxes();
    
    function addPaddingVehicle(){
        addModel("mod_Blank");
    }
    
    function countPaddingVehicles(){
        var numberOfChecked = 0;
        //Count how many vehicles are currently displaying on the screen
        $("#comp-images > .mod_Blank").each(function() {
            //if ($(this).is(':checked')) {
            numberOfChecked++;
            //}
        });
        console.log("Model Count: " + numberOfChecked);
        return numberOfChecked;
    }
    
    function removeAllPaddingVehicles(){
        $("div.content .mod_Blank").each(function() {            
            $(this).remove();
        });
    }
    
    function fillPaddingVehicles(){
        while(checkModelCount() < 4){
            addPaddingVehicle();
        }
    }
}
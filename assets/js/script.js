$(document).ready(function() {

    $("#searchMember").css({ "border-style": "solid", "border-color": "white" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "none" });

});

 

// View event handlers

$("#searchMember").on("click", function() {

    $("#viewSearchMember").show();

    $("#viewSearchProvider").hide();

    $("#viewAddMember").hide();

    $("#viewAddProvider").hide();

    $("#viewDeleteMember").hide();

    $("#viewDeleteProvider").hide();

 

    $("#searchMember").css({ "border-style": "solid", "border-color": "white" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "none" });

 

});

 

$("#searchProvider").on("click", function() {

    $("#viewSearchMember").hide();

    $("#viewSearchProvider").show();

    $("#viewAddMember").hide();

    $("#viewAddProvider").hide();

    $("#viewDeleteMember").hide();

    $("#viewDeleteProvider").hide();

 

    $("#searchMember").css({ "border-style": "none" });

    $("#searchProvider").css({ "border-style": "solid", "border-color": "white" });

    $("#addMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "none" });

});

 

$("#addMember").on("click", function() {

    $("#viewSearchMember").hide();

    $("#viewSearchProvider").hide();

    $("#viewAddMember").show();

    $("#viewAddProvider").hide();

    $("#viewDeleteMember").hide();

    $("#viewDeleteProvider").hide();

 

    $("#searchMember").css({ "border-style": "none" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "solid", "border-color": "white" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "none" });

});

 

$("#addProvider").on("click", function() {

    $("#viewSearchMember").hide();

    $("#viewSearchProvider").hide();

    $("#viewAddMember").hide();

    $("#viewDeleteMember").hide();

    $("#viewDeleteProvider").hide();

    $("#viewAddProvider").show();

 

    $("#searchMember").css({ "border-style": "none" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "solid", "border-color": "white" });

});

 

$("#deleteMember").on("click", function() {

    $("#viewSearchMember").hide();

    $("#viewSearchProvider").hide();

    $("#viewAddMember").hide();

    $("#viewAddProvider").hide();

    $("#viewDeleteMember").show();

    $("#viewDeleteProvider").hide();

    $("#deleteMemberResponse").empty();

 

    $("#searchMember").css({ "border-style": "none" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "none" });

    $("#deleteMember").css({ "border-style": "solid", "border-color": "white" });

});

 

$("#deleteProvider").on("click", function() {

    $("#viewSearchMember").hide();

    $("#viewSearchProvider").hide();

    $("#viewAddMember").hide();

    $("#viewAddProvider").hide();

    $("#viewDeleteMember").hide();

    $("#viewDeleteProvider").show();

    $("#deleteProviderResponse").empty();

 

 

    $("#searchMember").css({ "border-style": "none" });

    $("#searchProvider").css({ "border-style": "none" });

    $("#addMember").css({ "border-style": "none" });

    $("#addProvider").css({ "border-style": "none" });

    $("#deleteProvider").css({ "border-style": "solid", "border-color": "white" });

    $("#deleteMember").css({ "border-style": "none" });

});

 

$("#addMemberBtn").on("click", function() {

 

    const loc = document.location;

    const success = `<p class="has-text-centered has-text-white">Successfully Added Member<p>`;

    const error = `<p class="has-text-centered has-text-white">Error Adding Member<p>`;

    $("#addMemberResponse").empty();

 

    const memberID = $("#addMemberID").val();

    const memberUname = $("#addMemberUN").val();

    const memberPrefix = $("#addMemberPrefix").val();

    const memberFname = $("#addMemberFN").val();

    const memberMname = $("#addMemberMN").val();

    const memberLname = $("#addMemberLN").val();

    const memberSuffix = $("#addMemberSuffix").val();

   const memberAddSname = $("#addMemberSingleName").is(':checked');

    const memberSSN = $("#addMemberSSN").val();

    const memberDOB = $("#addMemberDOB").val();

    const memberAddr1 = $("#addMemberAddr1").val();

    const memberAddr2 = $("#addMemberAddr2").val();

    const memberCity = $("#addMemberCity").val();

    const memberState = $("#addMemberState").val();

    const memberZip = $("#addMemberZip").val();

    const memberStartDate = $("#addMemberStartDate").val();

    const memberEndDate = $("#addMemberEndDate").val();

 

    const data = {

        memberID: memberID,

        memberUname: memberUname,

        memberPrefix: memberPrefix,

        memberFname: memberFname,

        memberMname: memberMname,

        memberLname: memberLname,

        memberSuffix: memberSuffix,

        memberAddSname: memberAddSname,

        memberSSN: memberSSN,

        memberDOB: memberDOB,

        memberAddr1: memberAddr1,

        memberAddr2: memberAddr2,

        memberCity: memberCity,

        memberState: memberState,

        memberZip: memberZip,

        memberStartDate: memberStartDate,

        memberEndDate: memberEndDate

 

    };

    // console.log(data);

    fetch(`${loc.origin}/api/addMember`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify(data),

        })

        .then((response) => {

            if (response.status === 200) $("#addMemberResponse").append(success);

            else $("#addMemberResponse").append(error);

        });

 

});

 

$("#addProviderBtn").on("click", function() {

 

    const loc = document.location;

    const success = `<p class="has-text-centered has-text-white">Successfully Added Provider<p>`;

    const error = `<p class="has-text-centered has-text-white">Error Adding Provider<p>`;

    $("#addProviderResponse").empty();

 

    const providerID = $("#addProviderID").val();

    const providerBname = $("#addProviderBN").val();

    const providerTitle = $("#addProviderTitle").val();

    const providerFname = $("#addProviderFN").val();

    const providerMinitial = $("#addProviderMI").val();

    const providerLname = $("#addProviderLN").val();

    const providerSuffix = $("#addProviderSuffix").val();

    const providerEmail = $("#addProviderEmail").val();

    const providerSSN = $("#addProviderSSN").val();

    const providerDOB = $("#addProviderDOB").val();

    const providerAddr1 = $("#addProviderAddr1").val();

    const providerAddr2 = $("#addProviderAddr2").val();

    const providerCity = $("#addProviderCity").val();

    const providerState = $("#addProviderState").val();

    const providerZip = $("#addProviderZip").val();

    const providerTel = $("#addProviderTel").val();

    const providerEffDate = $("#addProviderEffDate").val();

 

    const data = {

        providerID: providerID,

        providerBname: providerBname,

        providerTitle: providerTitle,

        providerFname: providerFname,

        providerMinitial: providerMinitial,

        providerLname: providerLname,

        providerSuffix: providerSuffix,

        providerEmail: providerEmail,

        providerSSN: providerSSN,

        providerDOB: providerDOB,

        providerAddr1: providerAddr1,

        providerAddr2: providerAddr2,

        providerCity: providerCity,

        providerState: providerState,

        providerZip: providerZip,

        providerTel: providerTel,

        providerEffDate: providerEffDate

 

    };

    // console.log(data);

    fetch(`${loc.origin}/api/addProvider`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify(data),

        })

        .then((response) => {

            if (response.status === 200) $("#addProviderResponse").append(success);

            else $("#addProviderResponse").append(error);

        });

 

});

 

 

$("#searchMemberBtn").on("click", function() {

    const loc = document.location;

 

    let memberID = $("#searchMemberID").val();

    let memberFN = $("#searchMemberFN").val();

    let memberLN = $("#searchMemberLN").val();

    let memberDOB = $("#searchMemberDOB").val();

 

    if (Number.isNaN(parseInt(memberID))) memberID = -1;

    else memberID = parseInt(memberID);

 

    const data = {

        memberID: memberID,

        memberFN: memberFN,

        memberLN: memberLN,

        memberDOB: memberDOB

    };

 

    fetch(`${loc.origin}/api/allMemberSearch`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify(data),

        })

        .then((response) => response.json())

        .then((data) => {

 

            $("#memberTableBody").empty();

            for (const element of data.list) {

                let rowHTML = `<tr>

                <td>${element.member_id}</td>

                <td>${element.user_name}</td>

                <td>${element.first_name}</td>

                <td>${element.last_name}</td>

                <td>${element.dob}</td>

                <td>${element.address_line1}</td>

                <td>${element.city}</td>

                <td>${element.state_code}</td>

                <td>${element.zip_code}</td>

                </tr>`;

                $("#memberTableBody").append(rowHTML);

            }

        });

});

 

$("#searchProviderBtn").on("click", function() {

    const loc = document.location;

 

    let providerID = $("#searchProviderID").val();

    let providerBN = $("#searchProviderBN").val();

    let providerFN = $("#searchProviderFN").val();

    let providerLN = $("#searchProviderLN").val();

 

    if (Number.isNaN(parseInt(providerID))) providerID = -1;

    else providerID = parseInt(providerID);

 

    const data = {

        providerID: providerID,

        providerBN: providerBN,

        providerFN: providerFN,

        providerLN: providerLN

    };

 

    fetch(`${loc.origin}/api/allProviderSearch`, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify(data),

        })

        .then((response) => response.json())

        .then((data) => {

 

            $("#providerTableBody").empty();

            for (const element of data.list) {

                let rowHTML = `<tr>

                <td>${element.provider_id}</td>

                <td>${element.business_name}</td>

                <td>${element.first_name}</td>

                <td>${element.last_name}</td>

                <td>${element.birth_date}</td>

                <td>${element.address_line1}</td>

                <td>${element.city}</td>

                <td>${element.state_code}</td>

                <td>${element.zip_code}</td>

                </tr>`;

                $("#providerTableBody").append(rowHTML);

            }

        });

});

 

$("#deleteMemberBtn").on("click", function() {

    const loc = document.location;

    const success = `<p class="has-text-centered has-text-white">Successfully Deleted Member<p>`;

    const error = `<p class="has-text-centered has-text-white">Error Deleting Member<p>`;

    $("#deleteMemberResponse").empty();

    let memberID = $("#deleteMemberID").val();

 

    if (Number.isNaN(parseInt(memberID))) $("#deleteMemberResponse").append(error);

    else {

        memberID = parseInt(memberID);

        const data = {

            memberID: memberID

        };

 

        fetch(`${loc.origin}/api/deleteMember`, {

                method: 'DELETE',

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(data),

            })

            .then((response) => {

 

 

                if (response.status === 200) $("#deleteMemberResponse").append(success);

                else $("#deleteMemberResponse").append(error);

            });

 

    }

});

 

$("#deleteProviderBtn").on("click", function() {

    const loc = document.location;

    const success = `<p class="has-text-centered has-text-white">Successfully Deleted Provider<p>`;

    const error = `<p class="has-text-centered has-text-white">Error Deleting Provider<p>`;

    $("#deleteProviderResponse").empty();

    let providerID = $("#deleteProviderID").val();

 

    if (Number.isNaN(parseInt(providerID))) $("#deleteProviderResponse").append(error);

    else {

        memberID = parseInt(providerID);

        const data = {

            providerID: providerID

        };

 

        fetch(`${loc.origin}/api/deleteProvider`, {

                method: 'DELETE',

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify(data),

            })

            .then((response) => {

 

 

                if (response.status === 200) $("#deleteProviderResponse").append(success);

                else $("#deleteProviderResponse").append(error);

            });

 

    }

})
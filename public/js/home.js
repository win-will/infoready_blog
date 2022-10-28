
$(".viewPostBtn").on("click", async function() {


  const loc = document.location;

  $("#leaveCommentModalTitle").empty();
  $("#leaveCommentModalBy").empty();
  $("#leaveCommentPostMsg").empty();
  $("#leaveCommentList").empty();
  $("#leaveCommentInput").val("");
  
  await fetch(`${loc.origin}/api/blog/${this.dataset.id}`)
    .then(res => res.json())
    .then(res => {

        console.log(res);

        $("#leaveCommentModalTitle").append(res.title);
        $("#leaveCommentModalBy").append(`Posted By ${res.user.username} On ${res.updatedAt.split('T')[0]}`);
        $("#leaveCommentPostMsg").append(res.content);
        
        for (let i = 0; i < res.comments.length;i++){

            $("#leaveCommentList").append(`
            <div class="block is-size-7">
                <strong>${res.comments[i].user.username} On ${res.comments[i].createdAt.split('T')[0]}:</strong>
                ${res.comments[i].comment}
            </div>
            `); 
        }
    });
  
    $("#leaveCommentModal").addClass('is-active');
    $("#leaveCommentModal").attr('data-set', `${this.dataset.id}`);

  });

  $("#leaveCommentCloseBtn").on("click", function() {
    $("#leaveCommentModal").removeClass('is-active');
  });

  $("#leaveCommentAddBtn").on("click", async function() {
    $("#homeMsg").empty();
    const comment = $("#leaveCommentInput").val();

    if (comment) {
      const loc = document.location;
    
    const postid = $("#leaveCommentModal").attr('data-set');
  
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    var currentDate = yyyy+"-"+mm+"-"+dd;
  
    const data = {
        comment: comment,
        createdAt: currentDate,
        postId: postid
    };
    
    //console.log(data);
    await fetch(`${loc.origin}/home`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
  
            // if (response.status === 200) $("#addMemberResponse").append(success);
            // else $("#addMemberResponse").append(error);
            console.log(response.status);
        });

    } else {

      $("#homeMsg").append("Error adding comment");
    }
    
  
    $("#leaveCommentModal").removeClass('is-active');
  });
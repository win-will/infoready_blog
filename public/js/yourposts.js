
$(".updatePostBtn").on("click", async function() {
  // console.log(this.dataset.id);
  const loc = document.location;
  // console.log(this.dataset.id);

  $("#updatePostModalTitle").empty();
  $("#updatePostModalContent").empty();
  
  await fetch(`${loc.origin}/api/blog/${this.dataset.id}`)
    .then(res => res.json())
    .then(res => {

        $("#updatePostModalTitle").val(res.title);
        $("#updatePostModalContent").append(res.content);
    });

  $("#updatePostModal").addClass('is-active');
  $("#updatePostModal").attr('data-set', `${this.dataset.id}`);
  // console.log($("#updatePostModal").attr('data-set'));
});

$("#updatePostCancelBtn").on("click", function() {
  $("#updatePostModal").removeClass('is-active');
});

$("#createPostBtn").on("click", function() {
  $("#createPostModal").addClass('is-active');
});

$("#createPostCancelBtn").on("click", function() {
  $("#createPostModal").removeClass('is-active');
});

$("#createPostSaveBtn").on("click", async function() {

  const loc = document.location;
  const title = $("#createPostTitle").val();
  const content = $("#createPostContent").val();

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  var currentDate = yyyy+"-"+mm+"-"+dd;

  const data = {
      title: title,
      content: content,
      createdAt: currentDate,
      updatedAt: currentDate
  };
  
  //console.log(data);
  await fetch(`${loc.origin}/yourposts`, {
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

  $("#createPostModal").removeClass('is-active');
  loc.reload();
});

$("#updatePostSaveBtn").on("click", async function() {

  const loc = document.location;
  const id = $("#updatePostModal").attr('data-set');
  const title = $("#updatePostModalTitle").val();
  const content = $("#updatePostModalContent").val();

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  var currentDate = yyyy+"-"+mm+"-"+dd;

  const data = {
      title: title,
      content: content,
      createdAt: currentDate,
      updatedAt: currentDate
  };
  
  //console.log(data);
  await fetch(`${loc.origin}/yourposts/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then((response) => {

          // if (response.status === 200) $("#addMemberResponse").append(success);
          // else $("#addMemberResponse").append(error);
          console.log(response.status)
      });

  $("#updatePostModal").removeClass('is-active');
  loc.reload();
});

$("#updatePostDeleteBtn").on("click", async function() {

  const loc = document.location;
  const id = $("#updatePostModal").attr('data-set');
  
  //console.log(data);
  await fetch(`${loc.origin}/yourposts/${id}`, {
          method: 'DELETE',
      })
      .then((response) => {

          // if (response.status === 200) $("#addMemberResponse").append(success);
          // else $("#addMemberResponse").append(error);
          console.log(response.status)
      });

  $("#updatePostModal").removeClass('is-active');
  loc.reload();
});
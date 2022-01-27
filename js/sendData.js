// Global Variables declaration
var washroom_id = 3;
var rest_address = "http://52.43.115.202:8080/SmartWashroomRestAPI/";

function sendRating(rating) {
  refresh = "false";
  $.ajax({
    type: "POST",
    url: rest_address + "/washroom-rating",
    data: { washroom_id: washroom_id, rating: rating },
    success: function (data) {
      if (data === true) {
        // do something with response.message or whatever other data on success
        swal({
          title: "Thank you!",
          text: "Thank you for your valuable time !",
          icon: "success",
          button: false,
          timer: 1200
        });
      } else {
        // do something with response.message or whatever other data on error
        swal({
          title: "Sorry !",
          text: "Unable to saved ratingd, try again ...",
          icon: "error",
          button: false,
          timer: 1500
        });
      }
    },
    error: function (textStatus, errorThrown) {
      if (textStatus.status == 500) {
        swal({
          title: "Sorry !",
          text: "Some error occure at Server.. !",
          icon: "error",
          button: false,
          timer: 1500
        });
      } else {
        swal({
          title: "Sorry !",
          text: "Could not send rating, try agin later...",
          icon: "error",
          button: false,
          timer: 1500
        });
      }
    }
  });
}

function validateData() {
  // check feedback category selected or not
  if ($("input[name=feedbackType]:checked").length == 0) {
    alert("Please select feedback category !");
    return false;
  }

  // check have some text inside comments('desc')
  var comment = $("#desc")
    .val()
    .trim();
  if (comment == "") {
    alert("Please write some comments !");
    return false;
  }

  return true;
}

/* attach a submit handler to the form */
$("#feedbackForm").submit(function (event) {
  /* stop form from submitting normally */
  event.preventDefault();

  if (validateData()) {
    $.ajax({
      type: "POST",
      url: rest_address + "/submit-feedback",
      data: {
        washroom_id: washroom_id,
        feedbackType: $("input[type=radio]").val(),
        desc: $("#desc").val()
      },
      success: function (data) {
        if (data === true) {
          // do something with response.message or whatever other data on success
          swal({
            title: "Thank you!",
            text: "Thank you for your valuable time !",
            icon: "success",
            button: false,
            timer: 1200
          });
        } else {
          // do something with response.message or whatever other data on error
          swal({
            title: "Sorry !",
            text: "Some error occure at Server.. !",
            icon: "error",
            button: false,
            timer: 1500
          });
        }
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      error: function (textStatus, errorThrown) {
        if (textStatus.status == 500) {
          swal({
            title: "Sorry !",
            text: "Some error occure at Server.. !",
            icon: "error",
            button: false,
            timer: 1500
          });
          setTimeout(function () {
            window.location.reload();
          }, 10000);
        } else {
          swal({
            title: "Sorry !",
            text: "Could not send feedback, try agin later...",
            icon: "error",
            button: false,
            timer: 1500
          });
          setTimeout(function () {
            window.location.reload();
          }, 10000);
        }
      }
    });
  }
});

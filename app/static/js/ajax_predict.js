function uploadData() {
var formData = new FormData($('#upload-form')[0]);
    $.ajax({
        type: "POST",
        url: "/predict",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            $('#prediction-result').html('Prediction from upload: ' + response);
        },
        error: function(error) {
            $('#prediction-result').html('Error: ' + error.responseText);
        }
    });
}

function predictData() {
    $.ajax({
        type: "POST",
        url: "/predict_manual",
        data: $('#manual-form').serialize(),
        success: function(response) {
            $('#prediction-result').html('Prediction from manual data: ' + response);
        },
        error: function(error) {
            $('#prediction-result').html('Error: ' + error.responseText);
        }
    });
}
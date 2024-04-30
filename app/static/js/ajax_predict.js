
function jsonToCSV(json) {
    const items = JSON.parse(json); // parse JSON string into objects
    const replacer = (key, value) => value === null ? '' : value; 
    const header = Object.keys(items[0]);
    let csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ];
    csv = csv.join('\r\n');
    return csv;
}

function displayCSV(csv) {
    var pre = document.createElement('pre');
    pre.textContent = csv;
    document.body.appendChild(pre);
}

function downloadCSV(csv, filename) {
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function uploadData() {
    var formData = new FormData($('#upload-form')[0]);
    $.ajax({
        type: "POST",
        url: "/predict",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            csv = jsonToCSV(response)
            downloadCSV(csv, 'predictions.csv')
            $('#prediction-result-upload').html('<strong>predictions.csv</strong> Downloaded successfully');
            $('.prediction-result-container').css({
                display: 'block',
                height: 'auto',
                opacity: 0       
            });
            var naturalHeight = $('.prediction-result-container').height(); 

            
            $('.prediction-result-container').height(0).animate({
                height: naturalHeight,
                opacity: 1
            }, 1000); 
        },
        error: function(error) {
            $('#prediction-result-upload').html('Error: ' + error.responseText);
        }
    });
}

function predictData() {
    // alert('test')
    $.ajax({
        type: "POST",
        url: "/predict_manual",
        data: $('#manual-form').serialize(),
        success: function(response) {
            $('#prediction-result-form').html('Prediction from form data: <strong>' + response + '$</strong>');

            $('.prediction-result-form-container').css({
                display: 'block',
                height: 'auto',
                opacity: 0       
            });
            var naturalHeight = $('.prediction-result-form-container').height(); 

            
            $('.prediction-result-form-container').height(0).animate({
                height: naturalHeight,
                opacity: 1
            }, 1000); 
        },
        error: function(error) {
            $('#prediction-result-form').html('Error: ' + error.responseText);
            
        }
    });
}
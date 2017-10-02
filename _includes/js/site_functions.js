$(document).ready(function() {
    var tagsJSON = "tags.json";
    var tagRow;
    var tagName;
    var tagItem;
    $.ajax({
        url: tagsJSON,
        method: "GET",
        format: 'json',
        success: function(data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                tagName = data[i].name;
                //Populate Results Grid
                tagRow = "<div class='row tag-row active' data-tag='"+tagName.toLowerCase()+"'>"+
                            "<div class='col-12 col-md-1'>"+data[i].id+"</div>"+
                            "<div class='col-12 col-md-2'>"+data[i].path+"</div>"+
                            "<div class='col-12 col-md-2 tag-name'>"+tagName+"</div>"+
                            "<div class='col-12 col-md-2'>"+data[i].owner+"</div>"+
                            "<div class='col-12 col-md-1'>"+data[i].created+"</div>"+
                            "<div class='col-12 col-md-1'>"+data[i].date+"</div>"+
                            "<div class='col-12 col-md-2'>"+data[i].description+"</div>"+
                        "</div>";
                $('.results-grid').append(tagRow);
                //Populate Tag Filter
                tagItem = "<div class='filter-item active'>"+tagName+"</div>";
                $('.tag-list').append(tagItem);

            }
            $('.filter-item').click(function(){

                var tagInput = $(this).text();
                $('.tag-input').val(tagInput);
                $('.tag-list').removeClass('active');
            });
        },
        error: function(data){
            console.log('didnt get the data');

        }
    });

    //Tag input autofill
    $('.tag-input').focusin(function() {
        $('.tag-list').addClass('active');
    });
    var blurItem;
    $(document).mousedown(function(e) {
        // The latest element clicked
        blurItem = $(e.target);
    });
    $('.tag-input').blur(function(e) {
        if (!$(blurItem).hasClass('filter-item')) {
            $('.tag-list').removeClass('active');
        } 
    });
    $('.tag-input').keyup(function(){
        var tagInput = $('.tag-input').val();
        var filterTag = tagInput.toLowerCase();
        $('.tag-list').addClass('active');
        var filterItem;
        $('.filter-item').each(function(e) {
            filterItem = $(this).text();
            if (filterItem.toLowerCase().indexOf(filterTag) > -1) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });
    //Filter submit
    $('.filter-form').submit(function(e){
        e.preventDefault();
        var tagInput = $('.tag-input').val();
        var filterTag = tagInput.toLowerCase();
        $('.tag-list').removeClass('active');
        $('.tag-row').each(function() {
            var tagRow = $(this).data('tag');
            if (tagRow === filterTag) {
                $(this).addClass('active');
            } else if (filterTag === "") {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        $('body,html').animate({
            scrollTop: $('#results').offest().top
        },'700');
        if ($('.tag-row.active').length > -1) {
            $('.no-results').slideUp();
        } else {
            $('.no-results').slideDown();
        }

    });





});

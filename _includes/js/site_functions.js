$(document).ready(function() {
    var tagsJSON = "tags.json";
    var tagRow;
    var tagName;
    var tagItem;
    var tagDescription;
    //Get Tags
    $.ajax({
        url: tagsJSON,
        method: "GET",
        format: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                tagName = data[i].name;
                if (data[i].description !== "") {
                    tagDescription = data[i].description.substring(0, 50) + '...';
                } else {
                    tagDescription = data[i].description;
                }
                //Populate Results Grid
                tagRow = "<div class='row tag-row active' data-tag='"+tagName.toLowerCase().replace("\'","")+"'>"+
                            "<div class='col-12 col-md-1'><span class='col-label'>ID: </span>"+data[i].id+"</div>"+
                            "<div class='col-12 col-md-2'><span class='col-label'>Path: </span>"+data[i].path+"</div>"+
                            "<div class='col-12 col-md-2 tag-name'><span class='col-label'>Name: </span>"+tagName+"</div>"+
                            "<div class='col-12 col-md-2'><span class='col-label'>Owner Committee: </span>"+data[i].owner+"</div>"+
                            "<div class='col-12 col-md-1'><span class='col-label'>Created By: </span>"+data[i].created+"</div>"+
                            "<div class='col-12 col-md-1'><span class='col-label'>Date Created: </span>"+data[i].date+"</div>"+
                            "<div class='col-12 col-md-3'><span class='col-label'>Description: </span>"+tagDescription+"</div>"+
                        "</div>";
                $('.results-grid').append(tagRow);
                //Populate Tag Filter
                tagItem = "<div class='filter-item active'>"+tagName+"</div>";
                $('.tag-list').append(tagItem);

            }
            //Filter list click functions
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
        var filterTag = tagInput.toLowerCase().replace("'","");
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
        //no results
        if ($('.tag-row.active').length > 0) {
            $('.no-results').slideUp();
        } else {
            $('.no-results').slideDown();
        }
        $('body,html').animate({
            scrollTop: $('#results').offset().top
        },'700');


    });
    //close no results
    $('.close-no-results').click(function() {
        $('.no-results').slideUp();
        $('.tag-input').val('');
        $('body,html').animate({
            scrollTop: $('#filters').offset().top
        },'700');
        $('.tag-row').each(function() {
            $(this).addClass('active');
        });
    });
    //add required fields
    if ($('#main').hasClass('add-new')) {
        $('input,select,textarea').each(function() {
            if ($(this).attr('required')) {
                $(this).prev().append('<span class="required"> *</span>');
            }
        });
    }
});

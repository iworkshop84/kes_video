$(document).ready(function (e) {
    $('li.has__children > a').click(function(event) {
        event.stopPropagation();
        if($(this).parent().hasClass('has__children')){
            $($(event.target).next('ul')).toggleClass('active__menu');
        }
    })
});


$(document).ready(function () {
    $('.header__burger').click(function (enent) {
        $('.header__burger, .header__menu').toggleClass('active__menu');
        $('body').toggleClass('lock');
        $('.mobile_wrapper').toggleClass('active');
    });
});

$(document).ready(function () {
    $('.mobile_wrapper').click(function (enent) {
        $('.header__burger, .header__menu').toggleClass('active__menu');
        // $('.single__page .header__single_burger,.single__page .single__menu_block').toggleClass('active__menu');
        $('body').toggleClass('lock');
        $('.mobile_wrapper').toggleClass('active');
    });
});


$(document).ready(function () {
    $('.slider__wrapper').slick({
        arrows: true,
        slidesToShow: 1,
        nextArrow: '<div class="slick-prev"><i class="fas fa-angle-double-left"></i></div>',
        prevArrow: '<div class="slick-next"><i class="fas fa-angle-double-right"></i></div>',
        autoplay:true,
        autoplaySpeed:3000,
        infinite: true,
        pauseOnFocus: false,
        pauseOnHover: false,
    });
});



jQuery(function ($){
    var $el = $('#FileBrowser');

    $el.on('click', '.js-browse-btn', function (evt){
        evt.preventDefault();
        $el.find(':file').click();
    });

    $el.on('change', function (evt){
        $el.find('.js-file').text(evt.target.value);
        $el.find('.js-upload-btn').show();
    });
});


// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("upload-container")

if( dropArea ) { // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    })

    // Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false)
}

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files

    handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    if( !progressBar ) { console.log( 'ProgressBar not found' ); return; }

    progressBar.value = 0
    uploadProgress = []

    for(let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

function updateProgress(fileNumber, percent) {
    if( !progressBar ) { console.log( 'ProgressBar not found' ); return; }

    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    progressBar.value = total
}

function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(uploadFile)
    files.forEach(previewFile)
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        document.getElementById('gallery').appendChild(img)
    }
}

function uploadFile(file, i) {
    console.log('Upload');

    let url =  '/cabinet/upload'
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function(e) {
        updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    })

    xhr.addEventListener('readystatechange', function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            updateProgress(i, 100) // <- Add this
            alert('Upload complete');
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            // Error. Inform the user
            console.log(xhr);
        }
    })

    xhr.onload = function() {
      console.log( this.responseText );
    }

    xhr.onerror = function() {
      console.log( 'Error:' + this.status );
    }


    var formData = new FormData()
    formData.append('file', file)
    xhr.send(formData);
}


// LOGIN POPUP BLOCK START

$(document).ready(function() {
    $('a.myLinkModal').click( function(event){
        event.preventDefault();
        $('#myOverlay').fadeIn(297, function(){
            $('#loginPopupBlock')
                .css('display', 'block')
                .animate({opacity: 1}, 198);
        });
    });

    $('#myModal__close, #myOverlay').click( function(){
        $('#loginPopupBlock').animate({opacity: 0}, 198, function(){
            $(this).css('display', 'none');
            $('#myOverlay').fadeOut(297);
        });
    });
});

// LOGIN POPUP BLOCK END


$(document).ready(function () {
    $('.single__page .header__single_burger').click(function (enent) {
        $('.single__page .header__single_burger,.single__page .single__menu_block').toggleClass('active__menu');
        $('.single__page .mobile_wrapper').toggleClass('active');
    });
});


$(document).ready(function () {
    $('.single__page .mobile_wrapper').click(function (enent) {
        $('.header__single_burger, .single__menu_block').toggleClass('active__menu');
    });
});

$(document).ready(function () {
    $('.single__page .video__full_desc_more').click(function (enent) {
        $('.video__full_desc').toggleClass('active').animate('max-height', 5);
    });
});

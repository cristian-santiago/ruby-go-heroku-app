tinymce.init({
    selector: 'textarea',
    plugins: 'advcode charmap casechange export formatpainter image editimage linkchecker autolink lists checklist media preview fullscreen mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker visualblocks',
    toolbar: 'addcomment bold italic showcomments casechange fonts checklist export alignleft aligncenter alignright alignjustify forecolor backcolorpicker formatpainter media image pageembed permanentpen table preview',
    toolbar_mode: 'floating',
    theme_advanced_buttons1: "forecolor",
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    
    
    
    media_url_resolver: function (data, resolve/*, reject*/) {
            if (data.url.indexOf('YOUR_SPECIAL_VIDEO_URL') !== -1) {
                var embedHtml = '<iframe src="' + data.url +
                '" width="400" height="400" ></iframe>';
                resolve({html: embedHtml});
            } else {
                resolve({html: ''});
            }
            },

    image_title: true,
    /* enable automatic uploads of images represented by blob or data URIs*/
    automatic_uploads: true,
    /*
        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
        images_upload_url: 'postAcceptor.php',
        here we add custom filepicker only to Image dialog
    */
    file_picker_types: 'image',
    /* and here's our custom image picker*/
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        /*
        Note: In modern browsers input[type="file"] is functional without
        even adding it to the DOM, but that might not be the case in some older
        or quirky browsers like IE, so you might want to add it to the DOM
        just in case, and visually hide it. And do not forget do remove it
        once you do not need it anymore.
        */

        input.onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function () {
            /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
            */
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
        };

        input.click();
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    

});



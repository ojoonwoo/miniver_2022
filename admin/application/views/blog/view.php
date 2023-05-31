<?php
require_once _VIEW_DIR . 'head.php';
require_once _VIEW_DIR . 'container_top.php';
// echo $action;

// 생성, 조회, 수정 화면 공통 사용하는 뷰

if ($action === 'modify') {
    $readonly = "";
    $submit_text = "수정";
    $form_action = _ROOT_URL . "blog/itemEdit/" . $blog_data['idx'];
    // print_r($blog_data['blog_title']);
    // print_r($blog_data['blog_json']);
} else if ($action === 'add') {
    $readonly = "";
    $submit_text = "등록";
    $form_action = _ROOT_URL . "blog/itemInsert";
} else {
    $readonly = "readonly";
}
?>
<style>
    .editor-wrap {
        background-color: #fff;
        /* border-radius: 20px; */
        /* box-shadow: 0 -3px 29px -5px rgba(34, 39, 47, .14); */
        /* margin: 60px auto; */
        /* max-width: 840px; */
        min-height: 400px;
        padding-top: 2rem;
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        position: relative;
    }

    .cdx-notifies {
        z-index: 200;
    }
</style>
<div class="page-title pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2" style="text-transform: uppercase;"><?= $page_title ?></h1>
</div>
<div class="container-fluid">
    <div class="mb-3">
        <label for="blog-title" class="form-label">제목</label>
        <input type="text" class="form-control" id="blog-title" name="blog_title" <?= $readonly ?> value="<?= $blog_data['blog_title'] ?>">
    </div>
    <div class="mb-3">
        <label for="blog-writer" class="form-label">작성자</label>
        <input type="text" class="form-control" id="blog-writer" name="blog_writer" <?= $readonly ?> value="<?= $blog_data['blog_writer'] ?>">
    </div>
    <div class="editor-wrap">
        <div id="editorjs"></div>
    </div>
    <?php
    if ($action !== 'add') {
    ?>
        <div class="mb-3 mt-3">
            <label for="blog-visible" class="form-label">노출 여부</label>
            <input type="checkbox" id="blog-visible" name="blog_visible" <?= $readonly ?> value="노출" <?= $blog_data['blog_visible'] === '1' ? 'checked' : '' ?>>
        </div>
    <?php
    }
    ?>
    <button class="btn btn-lg btn-primary" onClick="save()"><?=$submit_text?></button>
</div>
<script>
    var editor = new EditorJS({
        holder: 'editorjs',
        autofocus: false,
        placeholder: 'Typing Here.',
        tools: {
            header: {
                class: Header,
                config: {
                    placeholder: 'Enter a header',
                            levels: [2, 3, 4, 5],
                            defaultLevel: 3
                }
            },
            // paragraph: {
            //     class: Paragraph,
            //     inlineToolbar: true,
            // },

            // ! blob 형태
            // ! blob으로 할시에 save 전에 blob to base64로 서버로 전송해서 이미지 저장하는 로직 필요해보임
            image: SimpleImage
            // ! 서버 저장 형태
            // ! 서버에 저장 및 불러오는거라 문제 없지만 메모리 사용이 많이 되기에 재작성시 어떻게 효율적으로 할지 고민 필요
            // image: {
            //     class: ImageTool,
            //     config: {
            //         // endpoints: {
            //         //     byFile: 'http://localhost:4000/upload', // Express.js 서버의 엔드포인트입니다.
            //         //     // ...
            //         // }
            //         uploader: {
            //             uploadByFile(file) {
            //                 return uploadImage(file).then((resultUrl) => {
            //                     // console.log(resultUrl);
            //                     return {
            //                         success: 1,
            //                          file: {
            //                             url: resultUrl
            //                         }
            //                     };
            //                 });
            //             }
            //         },
            //     }
            // }
        },
        data: {
            "blocks": [{
                    type: 'image',
                    data: {
                        stretched: true
                    }
                },
                {
                    type: 'header',
                    data: {
                        text: '',
                        level: 2
                    }
                }
            ]
        }
    });

    console.log(editor);

    var pageAction = '<?= $action ?>';
    if (pageAction === 'modify') {
        editor.isReady
            .then(() => {
                editor.render(<?= $blog_data['blog_json'] ?>); // 이 부분에 JSON 데이터를 넣어주세요.
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    function save() {

        var titleVal = $('#blog-title').val(),
            writerVal = $('#blog-writer').val();

        if ($.trim(titleVal).length < 1) {
            alert('제목을 입력해주세요');
            return false;
        }
        if ($.trim(writerVal).length < 1) {
            alert('작성자를 입력해주세요');
            return false;
        }
        // editor.save().then((data) => {
        //     console.log(data);
        //     console.log(_root_url + '/blog/itemInsert');
        //     $.ajax({
        //         url: _root_url + '/blog/itemInsert',
        //         type: 'POST',
        //         contentType: 'application/json',
        //         data: JSON.stringify(data),
        //         success: function(response) {
        //             // success logic here
        //             console.log(response);
        //         },
        //         error: function(error) {
        //             // error handling here
        //             console.log(error);
        //         }
        //     });
        // });
        editor.save().then(function(editorData) {

            // console.log($('#blog-title').val());

            var additionalData = {
                title: titleVal,
                writer: writerVal,
                visible: $('#blog-visible').is(':checked') ? 1 : 0
            };
            var editorData = editorData;
            var imageData = editorData.blocks.filter(item => item.type === 'image');

            // TODO: blob형태 이미지 base64로 변환
            var fetchPromises = imageData.map(element => {
                var imgBlobUrl = element.data.url;
                if (imgBlobUrl.startsWith('blob:')) {
                    return fetch(imgBlobUrl)
                        .then(res => res.blob())
                        .then(blob => {
                            return new Promise((resolve, reject) => {
                                blobToDataUrl(blob, function(dataUrl) {
                                    element.data.url = dataUrl;
                                    resolve(element);
                                });
                            });
                        });
                } else {
                    return Promise.resolve(element);
                }
            });
            // TODO: base64로 변환된 이미지 url imageData 배열내 url 자리에 삽입
            Promise.all(fetchPromises)
                .then(results => {
                    // console.log(results); // 이제 results 배열에는 업데이트된 imageData 객체들이 들어있습니다.
                    var dataToSend = {
                        editorData: editorData,
                        imageData: results,
                        additionalData: additionalData
                    };

                    // console.log(dataToSend);

                    var jsonDataToSend = JSON.stringify(dataToSend);

                    $.ajax({
                        // url: _root_url + '/blog/itemInsert',
                        url: '<?= $form_action ?>',
                        type: 'POST',
                        data: jsonDataToSend,
                        contentType: 'application/json',
                        success: function(response) {
                            console.log(response);
                            switch (response) {
                                case 'insert success':
                                    alert('등록 완료');
                                    location.replace(_root_url + '/blog/');
                                    break;
                                case 'insert fail':
                                    alert('등록 실패');
                                    location.replace(_root_url + '/blog/add');
                                    break;
                                case 'update success':
                                    alert('수정 완료');
                                    location.replace(_root_url + '/blog/');
                                    break;
                                case 'update success':
                                    alert('수정 실패');
                                    location.replace(_root_url + '/blog/edit/<?= $blog_data['idx'] ?>');
                                    break;

                                default:
                                    break;
                            }
                        },
                        error: function(error) {
                            // error handling here
                            console.log(error);
                        }
                    });
                })
                .catch(error => console.error(error));
        });
    }

    // function uploadImage(file) {
    //     let form_data = new FormData();
    //     form_data.append('file', file);
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             data: form_data,
    //             type: "POST",
    //             // url: '/api/imageUpload',
    //             url: _root_url + 'blog/imageUpload',
    //             cache: false,
    //             contentType: false,
    //             enctype: 'multipart/form-data',
    //             processData: false,
    //             success: function(url) {
    //                 // console.log(url);
    //                 resolve(url);
    //             },
    //         });
    //     })
    // }

    function blobToDataUrl(blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            // console.log(dataUrl);
            // var base64 = dataUrl.split(',')[1];
            callback(dataUrl);
        };
        reader.readAsDataURL(blob);
    }
</script>
<!-- end container -->
<?php
require_once _VIEW_DIR . 'container_bottom.php';
require_once _VIEW_DIR . 'tail.php';
?>
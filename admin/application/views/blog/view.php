<?php
require_once _VIEW_DIR . 'head.php';
require_once _VIEW_DIR . 'container_top.php';
// echo $action;

// 생성, 조회, 수정 화면 공통 사용하는 뷰

if ($action === 'modify') {
    $readonly = "";
    $submit_text = "수정";
    $form_action = _ROOT_URL . "press/itemEdit/" . $press_data['idx'];
} else if ($action === 'add') {
    $readonly = "";
    $submit_text = "등록";
    $form_action = _ROOT_URL . "press/itemInsert";
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
    }
</style>
<div class="page-title pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2" style="text-transform: uppercase;"><?= $page_title ?></h1>
</div>
<div class="container-fluid">
    <div class="mb-3">
        <label for="blog-title" class="form-label">제목</label>
        <input type="text" class="form-control" id="blog-title" name="blog_title" <?= $readonly ?> value="">
    </div>
    <div class="editor-wrap">
        <div id="editorjs"></div>
    </div>
    <button onClick="save()">Save</button>
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
                    //         levels: [2, 3, 4],
                    //         defaultLevel: 3
                }
            },
        },
    });

    // async function save() {
    //     const data = await editor.save();
    //     const json = JSON.stringify(data);

    //     fetch('/blog/add', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: json,
    //     });
    // }

    function save() {
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

            console.log($('#blog-title').val());

            var additionalData = {
                title: $('#blog-title').val()
            }

            var dataToSend = {
                editorData: editorData,
                additionalData: additionalData
            };

            var jsonDataToSend = JSON.stringify(dataToSend);

            $.ajax({
                url: _root_url + '/blog/itemInsert',
                type: 'POST',
                data: jsonDataToSend,
                contentType: 'application/json',
                success: function(response) {
                    console.log(response);
                },
                error: function(error) {
                    // error handling here
                    console.log(error);
                }
            });
        });
    }
</script>
<!-- end container -->
<?php
require_once _VIEW_DIR . 'container_bottom.php';
require_once _VIEW_DIR . 'tail.php';
?>
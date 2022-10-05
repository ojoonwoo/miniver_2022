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
<script>
     $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
    $(function() {
        // $("#press-date").datepicker({dateFormat: 'yy-mm-dd'});
        $("#press-date").datepicker();
    });
</script>
<style>
    .form-label {
        font-weight: 700;
    }
</style>
<div class="page-title pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2" style="text-transform: uppercase;"><?= $page_title ?></h1>
</div>
<div class="container-fluid">
    <form action="<?= $form_action ?>" onsubmit="return formCheck(this, '<?= $action ?>');" method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="press-title" class="form-label">기사 제목</label>
            <input type="text" class="form-control" id="press-title" name="press_title" <?= $readonly ?> value="<?= $press_data['press_title'] ?>">
        </div>
        <div class="mb-3">
            <div class="row">
                <!-- <div class="col">
                    <label for="thumb-rectangle" class="form-label">썸네일 직사각형</label>
                    <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="thumb-rectangle" name="thumb_rectangle[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?= $readonly ?>>
                        <?php
                        $file = _PRESS_UPLOAD_URL . $press_data['idx'] . '/thumb_rectangle/' . $press_data['thumb_rectangle'];
                        if ($action !== 'add') {
                        ?>
                            <img src="<?= $file ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div> -->
                <div class="col">
                    <label for="press-thumb" class="form-label">썸네일</label>
                    <div class="badge bg-danger" style="width: auto;">630 x 630</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="press-thumb" name="press_thumb[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?= $readonly ?>>
                        <?php
                        $file = _PRESS_UPLOAD_URL . $press_data['idx'] . '/press_thumb/' . $press_data['press_thumb'];
                        if ($action !== 'add') {
                        ?>
                            <img src="<?= $file ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="press-link" class="form-label">기사 링크</label>
            <input type="text" class="form-control" id="press-link" name="press_link" <?= $readonly ?> value="<?= $press_data['press_link'] ?>">
        </div>
        <div class="mb-3">
            <label for="press-date" class="form-label">기사 날짜</label>
            <input type="text" class="form-control" id="press-date" name="press_date" <?= $readonly ?> value="<?= $press_data['press_date'] ?>" autocomplete='off'>
        </div>
        <?php
            if($action !== 'add') {
        ?>
        <div class="mb-3">
            <label for="press-visible" class="form-label">노출 여부</label>
            <input type="checkbox" id="press-visible" name="press_visible" <?= $readonly ?> value="노출" <?= $press_data['press_visible'] === '1' ? 'checked' : '' ?>>
        </div>
        <?php
            }
        ?>
        <?php
        if ($action === 'modify' || $action === 'add') {
        ?>
            <div class="d-flex justify-content-end">
                <button type="submit" class="mt-3 btn btn-lg btn-primary"><?= $submit_text ?></button>
            </div>
        <?php
        }
        ?>
    </form>
    <script>
        function formCheck(form, action) {
            if ($.trim(form.press_title.value).length < 1) {
                alert('기사 제목을 입력해주세요');
                return false;
            }
            if (action === 'add') {
                if (document.getElementsByName('press_thumb[]')[0].files.length < 1) {
                    alert('정사각형 썸네일 이미지를 올려주세요');
                    return false;
                }
            }
            if (form.press_link.value.length < 1) {
                alert('기사 링크를 입력해주세요');
                return false;
            }
            if (form.press_date.value.length < 1) {
                alert('기사 날짜를 입력해주세요');
                return false;
            }
            // return false
            return true;
        }
    </script>
</div>
<!-- end container -->
<?php
require_once _VIEW_DIR . 'container_bottom.php';
require_once _VIEW_DIR . 'tail.php';
?>
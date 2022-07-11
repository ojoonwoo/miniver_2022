<?php
require_once _VIEW_DIR.'head.php';
require_once _VIEW_DIR.'container_top.php';
// echo $action;

// 생성, 조회, 수정 화면 공통 사용하는 뷰

if($action === 'modify') {
    $readonly = "";
    $submit_text = "수정";
    $form_action = _ROOT_URL."work/itemEdit/".$work_data['idx'];
} else if($action === 'add') {
    $readonly = "";
    $submit_text = "등록";
    $form_action = _ROOT_URL."work/itemInsert";
} else {
    $readonly = "readonly";
}

$this_categories = explode(', ', $work_data['work_categories']);

?>
<style>
    .form-label {
        font-weight: 700;
    }
</style>
<div class="page-title pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><?=$page_title?></h1>
</div>
<div class="container-fluid">
    <form action="<?=$form_action?>" onsubmit="return formCheck(this, '<?=$action?>');" method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="work-title" class="form-label">프로젝트 제목</label>
            <input type="text" class="form-control" id="work-title" name="work_title" <?=$readonly?> value="<?=$work_data['work_title']?>">
        </div>
        <div class="mb-3">
            <label for="work-category" class="form-label">카테고리 (다중선택 가능)</label>
            <div class="form-text badge bg-danger">다중선택 시 Cmd+클릭 또는 Shift+클릭</div>
            <select class="form-select" name="work_categories[]" size="3" multiple>
                <?php
                foreach($this->category_list as $category) {
                ?>
                <option value="<?=$category['idx']?>" <?= in_array($category['idx'], $this_categories) ? "selected" :  ""; ?>><?=$category['category_name']?></option>
                <?php
                }
                ?>
            </select>
        </div>
        <div class="mb-3">
            <label for="client-name" class="form-label">클라이언트 이름</label>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-2">
                        <span class="input-group-text">영어</span>
                        <input type="text" class="form-control" id="client-name" name="client_name" <?=$readonly?> value="<?=$work_data['client_name']?>">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <span class="input-group-text">한국어</span>
                        <input type="text" class="form-control" id="client-name-kor" name="client_name_kor" <?=$readonly?> value="<?=$work_data['client_name_kor']?>">
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="work-overview" class="form-label">프로젝트 요약</label>
            <textarea class="form-control" id="work-overview" name="work_overview" <?=$readonly?> cols="30" rows="5" <?=$readonly?>><?=$work_data['work_overview']?></textarea>
        </div>
        <div class="mb-3">
            <label for="logo-img" class="form-label">로고 이미지</label>
            <div class="badge bg-danger" style="width: auto;">576x576 / .png</div>
            <div class="input-group">
                <input class="form-control" type="file" id="logo-img" name="logo_img[]" accept="image/png" <?=$readonly?>>
                <?php
                $file = _WORK_UPLOAD_URL.$work_data['idx'].'/logo_img/'.$work_data['logo_img'];
                if($action !== 'add') {
                ?>
                <img src="<?=$file?>" alt="" style="background: #000; max-width: 12rem" class="img-thumbnail rounded">
                <?php
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <div class="row">
                <div class="col">
                    <label for="thumb-rectangle" class="form-label">썸네일 직사각형</label>
                    <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="thumb-rectangle" name="thumb_rectangle[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?=$readonly?>>
                        <?php
                        $file = _WORK_UPLOAD_URL.$work_data['idx'].'/thumb_rectangle/'.$work_data['thumb_rectangle'];
                        if($action !== 'add') {
                        ?>
                        <img src="<?=$file?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div>
                <div class="col">
                    <label for="thumb-square" class="form-label">썸네일 정사각형</label>
                    <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="thumb-square" name="thumb_square[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?=$readonly?>>
                        <?php
                        $file = _WORK_UPLOAD_URL.$work_data['idx'].'/thumb_square/'.$work_data['thumb_square'];
                        if($action !== 'add') {
                        ?>
                        <img src="<?=$file?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="hero-source" class="form-label">상세페이지 메인 이미지 또는 영상</label>
            <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
            <div class="input-group">
                <input class="form-control" type="file" id="hero-source" name="hero_source[]" <?=$readonly?>>
                <?php
                $file = _WORK_UPLOAD_URL.$work_data['idx'].'/hero_source/'.$work_data['hero_source'];
                if($action !== 'add') {
                ?>
                <img src="<?=$file?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <label for="detail-sources1" class="form-label">상세 주요 이미지 (5개까지 가능)</label>
            <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
            <div class="input-group">
                <input class="form-control" type="file" id="detail-sources1" name="detail_sources1[]" multiple="multiple" accept="image/jpg, image/jpeg, image/png, image/gif, video/mp4" <?=$readonly?>>
                <?php
                if($action !== 'add') {
                    $source_array = explode(', ', $work_data['detail_sources1']);
                    foreach($source_array as $source_name) {
                        $source = _WORK_UPLOAD_URL.$work_data['idx'].'/detail_sources1/'.$source_name;
                ?>
                <img src="<?=$source?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                    }
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <label for="detail-sources2" class="form-label">상세 주요 이미지2 (2개까지 가능)</label>
            <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
            <div class="input-group">
                <input class="form-control" type="file" id="detail-sources2" name="detail_sources2[]" multiple="multiple" accept="image/jpg, image/jpeg, image/png, image/gif, video/mp4" <?=$readonly?>>
                <?php
                if($action !== 'add') {
                    $source_array = explode(', ', $work_data['detail_sources2']);
                    foreach($source_array as $source_name) {
                        $source = _WORK_UPLOAD_URL.$work_data['idx'].'/detail_sources2/'.$source_name;
                ?>
                <img src="<?=$source?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                    }
                }
                ?>
            </div>
        </div>
        <?php
        if($action === 'modify' || $action === 'add') {
        ?>
        <div class="d-flex justify-content-end">
            <button type="submit" class="mt-3 btn btn-lg btn-primary"><?=$submit_text?></button>
        </div>
        <?php
        }
        ?>
    </form>
    <script>
        function formCheck(form, action) {
            if($.trim(form.work_title.value).length<1) {
                alert('프로젝트 제목을 입력해주세요');
                return false;
            }
            if(document.getElementsByName('work_categories[]')[0].value.length<1) {
                alert('프로젝트 카테고리를 선택해주세요');
                return false;
            }
            if($.trim(form.client_name.value).length<1 || $.trim(form.client_name_kor.value).length<1) {
                alert('클라이언트 이름을 입력해주세요');
                return false;
            }
            if(form.work_overview.value.length<1) {
                alert('프로젝트 요약을 입력해주세요');
                return false;
            }
            if(action === 'add') {
                if(document.getElementsByName('logo_img[]')[0].files.length<1) {
                    alert('로고 이미지를 올려주세요');
                    return false;
                }
                if(document.getElementsByName('thumb_square[]')[0].files.length<1) {
                    alert('정사각형 썸네일 이미지를 올려주세요');
                    return false;
                }
                if(document.getElementsByName('thumb_rectangle[]')[0].files.length<1) {
                    alert('직사각형 썸네일 이미지를 올려주세요');
                    return false;
                }
                if(document.getElementsByName('hero_source[]')[0].files.length<1) {
                    alert('메인 이미지 또는 영상을 올려주세요');
                    return false;
                }
                
                if(document.getElementsByName('detail_sources1[]')[0].files.length<1) {
                    alert('상세 주요 이미지1 을 올려주세요');
                    return false;
                }
                if(document.getElementsByName('detail_sources2[]')[0].files.length<1) {
                    alert('상세 주요 이미지2 를 올려주세요');
                    return false;
                }
            }
            // return false
            return true;
        }
    </script>
</div>
<!-- end container -->
<?php
require_once _VIEW_DIR.'container_bottom.php';
require_once _VIEW_DIR.'tail.php';
?>

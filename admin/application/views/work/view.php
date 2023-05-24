<?php
require_once _VIEW_DIR . 'head.php';
require_once _VIEW_DIR . 'container_top.php';
// echo $action;

// 생성, 조회, 수정 화면 공통 사용하는 뷰

if ($action === 'modify') {
    $readonly = "";
    $submit_text = "수정";
    $form_action = _ROOT_URL . "work/itemEdit/" . $work_data['idx'];
} else if ($action === 'add') {
    $readonly = "";
    $submit_text = "등록";
    $form_action = _ROOT_URL . "work/itemInsert";
} else {
    $readonly = "readonly";
    $pointerNone = "style='pointer-events: none;'";
}

$this_categories = explode(', ', $work_data['work_categories']);
$related_work = explode(', ', $work_data['related_work']);
?>
<style>
    .form-label {
        font-weight: 700;
    }
</style>
<div class="page-title pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2"><?= $page_title ?></h1>
</div>
<div class="container-fluid">
    <form action="<?= $form_action ?>" onsubmit="return formCheck(this, '<?= $action ?>');" method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="work-title" class="form-label">프로젝트 제목</label>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-2">
                        <span class="input-group-text">영어</span>
                        <input type="text" class="form-control" id="work-title" name="work_title" <?= $readonly ?> value="<?= $work_data['work_title'] ?>">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <span class="input-group-text">한국어</span>
                        <input type="text" class="form-control" id="work-title-kor" name="work_title_kor" <?= $readonly ?> value="<?= $work_data['work_title_kor'] ?>">
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="work-category" class="form-label">카테고리 (다중선택 가능)</label>
            <div class="form-text badge bg-danger">다중선택 시 Cmd+클릭 또는 Shift+클릭</div>
            <select class="form-select" name="work_categories[]" size="3" multiple>
                <?php
                foreach ($this->category_list as $category) {
                ?>
                    <option value="<?= $category['idx'] ?>" <?= in_array($category['idx'], $this_categories) ? "selected" :  ""; ?>><?= $category['category_name'] ?></option>
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
                        <input type="text" class="form-control" id="client-name" name="client_name" <?= $readonly ?> value="<?= $work_data['client_name'] ?>">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <span class="input-group-text">한국어</span>
                        <input type="text" class="form-control" id="client-name-kor" name="client_name_kor" <?= $readonly ?> value="<?= $work_data['client_name_kor'] ?>">
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="work-overview" class="form-label">프로젝트 요약</label>
            <textarea class="form-control" id="work-overview" name="work_overview" cols="30" rows="5" <?= $readonly ?>><?= $work_data['work_overview'] ?></textarea>
        </div>
        <div class="mb-3">
            <label for="work-site-url" class="form-label">프로젝트 URL</label>
            <input type="text" class="form-control" id="work-site-url" name="work_site_url" <?= $readonly ?> value="<?= $work_data['work_site_url'] ?>">
        </div>
        <div class="mb-3">
            <label for="logo-img" class="form-label">로고 이미지</label>
            <div class="badge bg-danger" style="width: auto;">800 x 400 / .png</div>
            <div class="input-group">
                <input class="form-control" type="file" id="logo-img" name="logo_img[]" accept="image/png" <?= $readonly ?>>
                <?php
                $file = _WORK_UPLOAD_URL . $work_data['idx'] . '/logo_img/' . $work_data['logo_img'];
                if ($action !== 'add') {
                ?>
                    <img src="<?= $file ?>" alt="" style="background: #000; max-width: 12rem" class="img-thumbnail rounded">
                <?php
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <div class="row">
                <div class="col">
                    <label for="thumb-rectangle" class="form-label">썸네일 직사각형</label>
                    <div class="badge bg-danger" style="width: auto;">800 x 400</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="thumb-rectangle" name="thumb_rectangle[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?= $readonly ?>>
                        <?php
                        $file = _WORK_UPLOAD_URL . $work_data['idx'] . '/thumb_rectangle/' . $work_data['thumb_rectangle'];
                        if ($action !== 'add') {
                        ?>
                            <img src="<?= $file ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div>
                <!-- <div class="col">
                    <label for="thumb-square" class="form-label">썸네일 정사각형</label>
                    <div class="badge bg-danger" style="width: auto;">사이즈x가이드</div>
                    <div class="input-group">
                        <input class="form-control" type="file" id="thumb-square" name="thumb_square[]" accept="image/jpg, image/jpeg, image/png, image/gif" <?= $readonly ?>>
                        <?php
                        $file = _WORK_UPLOAD_URL . $work_data['idx'] . '/thumb_square/' . $work_data['thumb_square'];
                        if ($action !== 'add') {
                        ?>
                        <img src="<?= $file ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                        <?php
                        }
                        ?>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="mb-3">
            <label for="hero-source" class="form-label">상세페이지 메인 이미지 또는 영상</label>
            <div class="badge bg-danger" style="width: auto;">1920 x 800</div>
            <div class="input-group">
                <input class="form-control" type="file" id="hero-source" name="hero_source[]" <?= $readonly ?>>
                <?php
                $file = _WORK_UPLOAD_URL . $work_data['idx'] . '/hero_source/' . $work_data['hero_source'];
                if ($action !== 'add') {
                ?>
                    <img src="<?= $file ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <label for="hero_color" class="form-label">(선택) 상세페이지 메인 영역 컬러</label>
            <div class="badge bg-danger" style="width: auto;">HEX CODE / #ffffff</div>
            <input type="text" class="form-control" id="hero-color" name="hero_color" <?= $readonly ?> value="<?= $work_data['hero_color'] ?>">
        </div>
        <div class="mb-3">
            <label for="detail-sources1" class="form-label">상세 주요 이미지 (5개까지 가능)</label>
            <div class="badge bg-danger" style="width: auto;">730 x 730 또는 1210 x 730</div>
            <div class="input-group">
                <input class="form-control" type="file" id="detail-sources1" name="detail_sources1[]" multiple="multiple" accept="image/jpg, image/jpeg, image/png, image/gif, video/mp4" <?= $readonly ?>>
                <?php
                if ($action !== 'add') {
                    $source_array = explode(', ', $work_data['detail_sources1']);
                    foreach ($source_array as $source_name) {
                        $source = _WORK_UPLOAD_URL . $work_data['idx'] . '/detail_sources1/' . $source_name;
                ?>
                        <img src="<?= $source ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                    }
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <label for="detail-sources2" class="form-label">하단 목업 이미지</label>
            <div class="badge bg-danger" style="width: auto;">1620 x 880</div>
            <div class="input-group">
                <input class="form-control" type="file" id="detail-sources2" name="detail_sources2[]" accept="image/jpg, image/jpeg, image/png, image/gif, video/mp4" <?= $readonly ?>>
                <?php
                if ($action !== 'add') {
                    $source_array = explode(', ', $work_data['detail_sources2']);
                    foreach ($source_array as $source_name) {
                        $source = _WORK_UPLOAD_URL . $work_data['idx'] . '/detail_sources2/' . $source_name;
                ?>
                        <img src="<?= $source ?>" alt="" style="max-width: 12rem" class="img-thumbnail rounded">
                <?php
                    }
                }
                ?>
            </div>
        </div>
        <div class="mb-3">
            <label for="related-works" class="form-label">연관 프로젝트</label>
            <!-- 연관 프로젝트 카테고리 -->
            <div class="related-work-cate mb-2">
                <?
                if (count($list) > 0) {
                ?>
                    <button type="button" class="btn btn-dark cate-sort active" <?= $pointerNone ?>>ALL</button>
                    <?
                    foreach ($this->category_list as $category) {
                    ?>
                        <button type="button" class="btn btn-light cate-sort" <?= $pointerNone ?> data-cate=<?= $category['idx'] ?>><?php echo $category['category_name'] ?></button>
                <?php
                    }
                } else {
                    echo "<p class='empty-para'>등록된 아이템이 없습니다.</p>";
                }
                ?>
            </div>
            <div class="related-work-list mb-2">
                <div class="card">
                    <div class="list-group list-group-flush" style="max-height: 20rem; overflow-y:scroll;">
                        <!-- 기본 워크 리스트 출력 -->
                        <!-- 검색, 또는 필터에 따라 리스트 변경 -->
                        <!-- 연관 프로젝트 리스트 -->
                        <!-- <label class="list-group-item">
                            <input class="form-check-input me-1" type="checkbox" value="로얄캐닌">
                            로얄캐닌
                        </label> -->
                    </div>
                </div>
            </div>
            <!-- 검색 기능 -->
        </div>
        <div class="mb-3">
            <div class="selected-related-work-list">
                <label class="form-label">선택된 프로젝트</label>
                <div class="input-group">
                    <!-- <span class="input-group-text">영어</span> -->
                    <div class="badge-group fs-5">
                        <!-- <span class="badge rounded-pill bg-dark">로얄캐닌</span> -->
                        <!-- <span class="badge rounded-pill bg-dark">스타벅스앳홈</span>
                        <span class="badge rounded-pill bg-dark">씨에라</span>
                        <span class="badge rounded-pill bg-dark">런드리고</span> -->
                    </div>
                    <input type="hidden" id="selected-related-work" name="selected_related_work" value="">
                </div>
            </div>
        </div>
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
        // * 오리진 배열
        var originListArr = <? echo json_encode($list) ?>;
        // * 선택된 프로젝트 리스트 배열
        var selectListArr = new Array();

        // * Edit의 경우
        <?php
        if ($action === 'modify' || $action === 'read') {
        ?>
            originListArr = originListArr.filter(function(element) {
                return element.idx !== "<?= $work_data['idx'] ?>"
            });
            selectListArr = <? echo json_encode($related_work) ?>;
            selectListArr = selectListArr.filter(i => i.length !== 0);
        <?php
        }
        ?>
        console.log(selectListArr);
        // * 프린트용 배열 : 오리진 배열 깊은 복사
        var printListArr = JSON.parse(JSON.stringify(originListArr));

        // console.log(selectListArr);
        $(document).ready(function() {
            var relatedWorkList = $('.related-work-list .list-group');
            var relatedWorkBadgeList = $('.selected-related-work-list .badge-group');
            var listItem;
            <?php
            $uploadUrl = _WORK_UPLOAD_URL
            ?>
            printListArr.forEach(function(element, index) {
                listItem = "<label class='list-group-item d-flex align-items-center' <?= $pointerNone ?>>"
                // * 셀렉트 배열에 프로젝트 idx 값이 있다면 sort된 새로운 프린트 배열을 뿌려줄때 checked 상태로 뿌림.
                if (selectListArr.length > 0 && selectListArr.indexOf(element.idx) !== -1) {
                    listItem += "<input class='form-check-input me-3' type='checkbox' checked data-idx='" + element.idx + "' value='" + element.idx + "'>"
                } else {
                    listItem += "<input class='form-check-input me-3' type='checkbox' data-idx='" + element.idx + "' value='" + element.idx + "'>"
                }
                listItem += "<div class='d-flex align-items-center'>"
                listItem += "<img class='me-3' style='width: 12rem' src='<?= $uploadUrl ?>" + element.idx + "/hero_source/" + element.hero_source + "' alt=''>"
                listItem += "<span>" + element.work_title + "</span>"
                listItem += "</div>"
                listItem += "</label>"

                relatedWorkList.append(listItem);
            });
            if (selectListArr.length > 0) {
                selectListArr.forEach(function(element, index) {
                    console.log(element);
                    var badge = "<span class='badge rounded-pill bg-dark me-1' data-idx=" + element + " <?= $pointerNone ?>><span class='me-2 align-middle'>" + relatedWorkList.find('.form-check-input[data-idx="' + element + '"]').closest('label').text() + "</span><svg class='badge-close align-middle' style='cursor:pointer;' width='1rem' height='1.1rem' viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M8.5 17.5C13.1944 17.5 17 13.6943 17 9C17 4.30566 13.1944 0.5 8.5 0.5C3.80557 0.5 0 4.30566 0 9C0 13.6943 3.80557 17.5 8.5 17.5ZM12.2657 5.23438C12.5781 5.54663 12.5781 6.05322 12.2657 6.36572L9.63138 9L12.2657 11.6343C12.5781 11.9468 12.5781 12.4534 12.2657 12.7656C11.9533 13.0781 11.4467 13.0781 11.1343 12.7656L8.5 10.1313L5.86569 12.7656C5.55328 13.0781 5.04675 13.0781 4.73431 12.7656C4.42191 12.4534 4.42191 11.9468 4.73431 11.6343L7.36862 9L4.73431 6.36572C4.42191 6.05322 4.42191 5.54663 4.73431 5.23438C5.04672 4.92188 5.55325 4.92188 5.86569 5.23438L8.5 7.86865L11.1343 5.23438C11.4467 4.92188 11.9533 4.92188 12.2657 5.23438Z' fill='white'/></svg></span>";
                    relatedWorkBadgeList.append(badge);
                });
            }
        })

        // * 연관 프로젝트 체크시 선택된 프로젝트 뱃지 세팅
        $(document).on('click', '.related-work-list .form-check-input', function() {
            var $this = $(this);
            var target = $('.selected-related-work-list .badge-group');
            var badge = '<span class="badge rounded-pill bg-dark me-1" data-idx=' + $this.val() + '><span class="me-2 align-middle">' + $this.closest('label').text() + '</span><svg class="badge-close align-middle" style="cursor:pointer;" width="1rem" height="1.1rem" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17.5C13.1944 17.5 17 13.6943 17 9C17 4.30566 13.1944 0.5 8.5 0.5C3.80557 0.5 0 4.30566 0 9C0 13.6943 3.80557 17.5 8.5 17.5ZM12.2657 5.23438C12.5781 5.54663 12.5781 6.05322 12.2657 6.36572L9.63138 9L12.2657 11.6343C12.5781 11.9468 12.5781 12.4534 12.2657 12.7656C11.9533 13.0781 11.4467 13.0781 11.1343 12.7656L8.5 10.1313L5.86569 12.7656C5.55328 13.0781 5.04675 13.0781 4.73431 12.7656C4.42191 12.4534 4.42191 11.9468 4.73431 11.6343L7.36862 9L4.73431 6.36572C4.42191 6.05322 4.42191 5.54663 4.73431 5.23438C5.04672 4.92188 5.55325 4.92188 5.86569 5.23438L8.5 7.86865L11.1343 5.23438C11.4467 4.92188 11.9533 4.92188 12.2657 5.23438Z" fill="white"/></svg></span>';
            if ($this.is(':checked')) {
                console.log('체크');
                // * 셀렉트 배열에 체크한 프로젝트가 없다면 선택된 프로젝트 뱃지 추가, 셀렉트 배열에 추가
                if (selectListArr.indexOf($this.val()) === -1) {
                    target.append(badge);
                    selectListArr.push($this.val());
                }
                console.log('선택된 프로젝트 배열:', selectListArr);
            } else {
                if (target.children('[data-idx="' + $this.val() + '"]')) {
                    console.log('체크해제');
                    // console.log($this.val());
                    target.children('[data-idx="' + $this.val() + '"]').remove();
                    selectListArr = selectListArr.filter(function(element) {
                        return element !== $this.val()
                    });
                    console.log('선택된 프로젝트 배열:', selectListArr);
                } else {
                    console.log('에러');
                }
            }
        });

        // * 뱃지 close버튼 클릭시
        $(document).on('click', '.selected-related-work-list .badge-group .badge-close', function() {
            var badge = $(this).closest('.badge');
            var checkList = $('.related-work-list .list-group');
            var badgeIdx = badge.data('idx');
            // * 1. 뱃지 제거
            badge.remove();
            // * 2. 체크리스트 체크 해제
            checkList.find('.form-check-input[data-idx="' +badgeIdx+ '"]').prop("checked", false);
            // * 3. 셀렉트 배열에서 제거
            selectListArr = selectListArr.filter(function(element) {
                return element !== String(badgeIdx);
            });
            console.log('닫기, 아이디값:', badgeIdx, '셀렉트 배열:',selectListArr);
        });

        // * 연관 프로젝트 카테고리 클릭시 세팅
        $(document).on('click', '.related-work-cate .cate-sort', function() {
            var $this = $(this);
            var target = $('.related-work-list .list-group');
            if ($this.data('cate')) {
                printListArr = originListArr.filter(function(element) {
                    // console.log(element.work_categories.includes($this.data('cate')));
                    if (element.work_categories.indexOf($this.data('cate')) !== -1) {
                        return element;
                    }
                })
            } else {
                printListArr = JSON.parse(JSON.stringify(originListArr));
            }
            $this.siblings('.cate-sort').removeClass('active').removeClass('btn-dark');
            $this.removeClass('btn-light').addClass('active').addClass('btn-dark');
            target.empty();

            if (printListArr.length !== 0) {
                <?php
                $uploadUrl = _WORK_UPLOAD_URL
                ?>
                printListArr.forEach(function(element, index) {
                    listItem = "<label class='list-group-item d-flex align-items-center'>"
                    // * 셀렉트 배열에 프로젝트 idx 값이 있다면 sort된 새로운 프린트 배열을 뿌려줄때 checked 상태로 뿌림.
                    if (selectListArr.indexOf(element.idx) !== -1) {
                        listItem += "<input class='form-check-input me-3' type='checkbox' checked data-idx='" + element.idx + "' value='" + element.idx + "'>"
                    } else {
                        listItem += "<input class='form-check-input me-3' type='checkbox' data-idx='" + element.idx + "' value='" + element.idx + "'>"
                    }
                    listItem += "<div class='d-flex align-items-center'>"
                    listItem += "<img class='me-3' style='width: 12rem' src='<?= $uploadUrl ?>" + element.idx + "/hero_source/" + element.hero_source + "' alt=''>"
                    listItem += "<span>" + element.work_title + "</span>"
                    listItem += "</div>"
                    listItem += "</label>"
                    target.append(listItem);
                });
            } else {
                listItem = "<span class='list-group-item'>등록된 프로젝트가 없습니다.</span>"
                target.append(listItem);
            }
        });
        // $(document).on('click', '#detail-source-add', function() {

        // });

        function formCheck(form, action) {
            if ($.trim(form.work_title.value).length < 1 || $.trim(form.work_title_kor.value).length < 1) {
                alert('프로젝트 제목을 입력해주세요');
                return false;
            }
            if (document.getElementsByName('work_categories[]')[0].value.length < 1) {
                alert('프로젝트 카테고리를 선택해주세요');
                return false;
            }
            if ($.trim(form.client_name.value).length < 1 || $.trim(form.client_name_kor.value).length < 1) {
                alert('클라이언트 이름을 입력해주세요');
                return false;
            }
            if (form.work_overview.value.length < 1) {
                alert('프로젝트 요약을 입력해주세요');
                return false;
            }
            if (action === 'add') {
                if (document.getElementsByName('logo_img[]')[0].files.length < 1) {
                    alert('로고 이미지를 올려주세요');
                    return false;
                }
                // if(document.getElementsByName('thumb_square[]')[0].files.length<1) {
                //     alert('정사각형 썸네일 이미지를 올려주세요');
                //     return false;
                // }
                if (document.getElementsByName('thumb_rectangle[]')[0].files.length < 1) {
                    alert('직사각형 썸네일 이미지를 올려주세요');
                    return false;
                }
                if (document.getElementsByName('hero_source[]')[0].files.length < 1) {
                    alert('메인 이미지 또는 영상을 올려주세요');
                    return false;
                }

                if (document.getElementsByName('detail_sources1[]')[0].files.length < 1) {
                    alert('상세 주요 이미지1 을 올려주세요');
                    return false;
                }
                // if (document.getElementsByName('detail_sources2[]')[0].files.length < 1) {
                //     alert('상세 주요 이미지2 를 올려주세요');
                //     return false;
                // }
            }
            if (form.hero_color.value.length > 0) {
                if (form.hero_color.value.length !== 7) {
                    alert('HEX CODE의 길이가 맞지않습니다.');
                    return false;
                }
                var regType = /^[A-Za-z0-9]+$/;
                if (!regType.test(form.hero_color.value.substr(1, form.hero_color.value.length))) {
                    alert('정확한 HEX CODE를 입력해주세요');
                    return false;
                }
                if (form.hero_color.value.charAt(0) !== '#') {
                    alert('맨 앞에 #을 붙여주세요');
                    return false;
                }
            }

            // * 밸류 배열 인풋 밸류에 세팅
            if (selectListArr.length > 0) {
                var selectList = selectListArr.join(', ');
                console.log(selectList);
                $('#selected-related-work').val(selectList);
                // console.log("hi", form.selected_work.value);
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
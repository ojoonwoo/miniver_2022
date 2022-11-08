<?php
require_once _VIEW_DIR.'head.php';
require_once _VIEW_DIR.'container_top.php';
?>
<div class="page-title pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between">
    <h1 class="h2">CONTACT LIST</h1>
    <!-- <div class="btn-wrap">
        <a href="<?=_ROOT_URL?>work/add/" role="button" class="btn btn-outline-primary btn-lg">추가</a>
        <a href="javascript:;" role="button" class="btn btn-outline-secondary btn-lg" id="sortable-trigger">순서 변경</a>
    </div> -->
</div>
<div class="container-fluid">
<?php
if(count($list) > 0) {
?>
    <table class="table">
        <thead>
            <tr>
                <th scope="col" style="width: 30px;">id</th>
                <!-- <th scope="col">출력 순서</th> -->
                <th scope="col">카테고리</th>
                <th scope="col">회사명</th>
                <th scope="col">담당자명</th>
                <th scope="col" style="width: 350px">내용</th>
                <th scope="col">전화번호</th>
                <th scope="col">이메일 주소</th>
                <th scope="col" style="width: 200px">프로젝트 기간</th>
                <th scope="col">문의 일시</th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($list as $val) {
    $description = str_replace(array("\r\n", "\n"), "<br>", $val['project_description']);
?>
            <tr>
                <td>
                    <?=$val['idx']?>
                </td>
                <td><?=$val['contact_category_names']?></td>
                <td><?=$val['company_name']?></td>
                <td><?=$val['manager_name']?></td>
                <td><?=$description?></td>
                <td><?=$val['manager_phone']?></td>
                <td><?=$val['manager_email']?></td>
                <td><?=$val['project_start_date'] . ' ~ ' . $val['project_end_date']?></td>
                <td><?=$val['contact_reg_date']?></td>
                <!-- <td>
                    <a href="<?=_ROOT_URL?>work/view/<?=$val['idx']?>" class="btn btn-dark" role="button">보기</a>
                    <a href="<?=_ROOT_URL?>work/edit/<?=$val['idx']?>" class="btn btn-danger" role="button">수정</a>
                </td> -->
            </tr>
<?php
    } // end foreach
?>
        </tbody>
    </table>
<?php
    // if end 게시물 
} else {
    echo "<p>등록된 아이템이 없습니다.</p>";
}
?>
</div>
<!-- end container -->
<script>
</script>
<?php
require_once _VIEW_DIR.'container_bottom.php';
require_once _VIEW_DIR.'tail.php';
?>

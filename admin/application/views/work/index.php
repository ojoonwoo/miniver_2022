<?php
require_once _VIEW_DIR.'head.php';
require_once _VIEW_DIR.'container_top.php';
?>
<div class="page-title pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between">
    <h1 class="h2">WORK LIST</h1>
    <div class="btn-wrap">
        <a href="<?=_ROOT_URL?>work/add/" role="button" class="btn btn-outline-primary btn-lg">추가</a>
        <a href="javascript:;" role="button" class="btn btn-outline-secondary btn-lg" id="sortable-trigger">순서 변경</a>
    </div>
</div>
<div class="container-fluid">
<?php
if(count($list) > 0) {
?>
    <div class="category-wrap">
        <a class="cate-sort" href="<?=_ROOT_URL?>work/">ALL</a>
        <?
        foreach($this->category_list as $val) {
        ?>
        <a class="cate-sort" href="<?=_ROOT_URL?>work/?cate=<?=$val['idx']?>"><?php echo $val['category_name']?></a>
        <?php
        }
        ?>
    </div>
<?php
?>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">id</th>
                <!-- <th scope="col">출력 순서</th> -->
                <th scope="col">클라이언트</th>
                <th scope="col">타이틀</th>
                <th scope="col">카테고리</th>
                <th scope="col">썸네일</th>
                <th scope="col">노출여부</th>
                <th scope="col"></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($list as $val) {
?>
            <tr data-idx-num="<?=$val['idx']?>" class="draggable-item">
                <td>
                    <?=$val['idx']?>
                    <input type="hidden" name="work_idx" class="work-idx" value="<?=$val['idx']?>">
                </td>
                <!-- <td>
                    <span><?=$val['work_order']?></span>
                    <input type="hidden" name="work_order" class="work-order" value="<?=$val['work_order']?>">
                </td> -->
                <td><?=$val['client_name']?></td>
                <td><?=$val['work_title']?></td>
                <td><?=$val['work_category_names']?></td>
                <td><img src="<?=_WORK_UPLOAD_URL.$val['idx'].'/thumb_rectangle/'.$val['thumb_rectangle']?>" style="width: 6rem;"></td>
                <td><?=$val['work_visible'] ? "노출" : "비노출" ?></td>
                <td>
                    <a href="<?=_ROOT_URL?>work/view/<?=$val['idx']?>" class="btn btn-dark" role="button">보기</a>
                    <a href="<?=_ROOT_URL?>work/edit/<?=$val['idx']?>" class="btn btn-danger" role="button">수정</a>
                </td>
                <td class="drag-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </td>
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
<script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.11/lib/sortable.js"></script>
<script>
    var originArr = [];
    $(document).ready(function() {
        $('table tbody tr').each(function(idx, row) {
            originArr[idx] = {
                'idx': $(row).find('.work-idx').val(),
                // 'order': idx+1
                'order': $(row).find('.work-order').val()
            }
        });
        console.log(originArr);
    })
    var sortable = new Sortable.default(document.querySelectorAll('tbody'), {
        draggable: 'tr',
        delay: 200,
        classes: {
            'draggable:over': ['draggable--over'],
        },
        // mirror: {
        //     appendTo: 'table tbody',
        //     constrainDimensions: true,
        // },
    });
    

    $(document).on('click', '#sortable-trigger', function() {
        if(confirm('현재 정렬된 순서로 업데이트 하시겠습니까?')) {

            // update callback
            updateOrder();
        }
        

        // workSortStatus.enbaled = !workSortStatus.enbaled;
    });


    function updateOrder() {
        var newArr = [];
        $('table tbody tr').each(function(idx, row) {
            newArr[idx] = {
                'idx': $(row).find('.work-idx').val(),
                'order': idx+1
                // 'order': originArr[idx]['order']
            }
        });

        $.ajax({
            type: 'POST',
            url: _root_url+'work/workOrderUpdate',
            cache: false,
            dataType: 'json',
            data: {
                'list': newArr
            },
            beforeSend: function () {
                // $('#goDraw').attr('disabled', true);
            },
            success: function (response) {
                console.log(response);
                if(response.result === true) {
                    alert('변경 완료');
                } else {
                    alert('에러입니다 개발팀에 문의해주세요');
                }

                location.reload();
                
            },
            error: function (jqXHR, errMsg) {
                // Handle error
                alert(errMsg);
                console.log(jqXHR);
            },
        })
    }
</script>
<?php
require_once _VIEW_DIR.'container_bottom.php';
require_once _VIEW_DIR.'tail.php';
?>

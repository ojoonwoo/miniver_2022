<?php
require_once _VIEW_DIR . 'head.php';
require_once _VIEW_DIR . 'container_top.php';
?>
<div class="page-title pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between">
    <h1 class="h2">BLOG LIST</h1>
    <a href="<?= _ROOT_URL ?>blog/add/" role="button" class="btn btn-outline-primary btn-lg">추가</a>
</div>
<div class="container-fluid">
    <?php
    if (count($list) > 0) {
    ?>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">타이틀</th>
                    <th scope="col">작성자</th>
                    <th scope="col">작성 일시</th>
                    <th scope="col">노출여부</th>
                    <th scope="col">관리</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($list as $val) {
                ?>
                    <tr>
                        <td><?= $val['idx'] ?></td>
                        <td><?= $val['blog_title'] ?></td>
                        <td><?= $val['blog_writer'] ?></td>
                        <td><?= $val['blog_register_date'] ?></td>
                        <td><?= $val['blog_visible'] ? "노출" : "비노출" ?></td>
                        <td>
                            <a href="<?= _ROOT_URL ?>blog/edit/<?= $val['idx'] ?>" class="btn btn-danger" role="button">수정</a>
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
<?php
require_once _VIEW_DIR . 'container_bottom.php';
require_once _VIEW_DIR . 'tail.php';
?>
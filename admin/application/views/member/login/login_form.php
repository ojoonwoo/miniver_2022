<?php
require_once _VIEW_DIR.'head.php';
?>
    <body>
        <div class="sign-wrapper text-center">
            <div class="form-signin w-100 m-auto">
                <form action="<?=_ROOT_URL?>member/loginCheck" method="POST" onsubmit="return loginCheck(this);">
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput1" name="mb_id" placeholder="아이디">
                        <label for="floatingInput1">아이디</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingInput2" name="mb_pw" placeholder="비밀번호">
                        <label for="floatingInput2">비밀번호</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </body>
    <script>
        function loginCheck(form) {
            var memberID = form.mb_id.value,
                memberPW = form.mb_pw.value;


            // return false;
            return true;
        }
    </script>
    <!-- <script>
        $(document).ready(function() {
            $.ajax({
                url: '../isLogin',
                type: 'GET',
                dataType: "json",
                success: function(response) {
                    console.log(response);
                },
                error: function(jqXHR, errMsg) {
                    // Handle error
                    alert(errMsg);
                    console.log(jqXHR);
                }
            })
        });
    </script> -->
<?php
require_once _VIEW_DIR.'tail.php';
?>

<div id="app">
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a href="<?=_ROOT_URL?>" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-8">MINIVERTISING</a>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
            <?php
            if($_SESSION['mb_id'] == 'administrator') {
            ?>
                <a class="nav-link px-3" href="<?=_ROOT_URL?>member/logout/">Logout</a>
            <?php
            } else {
            ?>
                <a class="nav-link px-3" href="<?=_ROOT_URL?>member/login/">Login</a>
            <?php
            }
            ?>
            </div>
        </div>
    </header>
    <div class="container-fluid">
        <div class="row">
            <nav class="sidebar col-md-3 col-lg-2 d-md-block bg-light">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="<?=_ROOT_URL?>work/">
                                Worklist
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="<?=_ROOT_URL?>press/">
                                Presslist
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 contents-wrap">

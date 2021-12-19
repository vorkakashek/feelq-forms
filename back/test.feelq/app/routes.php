<?php

use App\Controllers\MainController;

$app->get('/', [MainController::class, 'getHome'])->setName('get.home');
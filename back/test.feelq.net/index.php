<?php

declare(strict_types=1);

define('ROOT_PATH', __DIR__);

require implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'bootstrap', 'app.php']);

$app->run();
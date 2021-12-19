<?php

declare(strict_types=1);

use App\Validation\Validator;
use DI\Bridge\Slim\Bridge;
use DI\Container;
use Illuminate\Database\Capsule\Manager;
use Middlewares\TrailingSlash;
use Respect\Validation\Factory;
use Slim\Flash\Messages;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;
use Twig\TwigFunction;

session_start();

require implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'config', 'config.php']);
require implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'vendor', 'autoload.php']);

$container = new Container;

$app = Bridge::create($container);

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$capsule = new Manager;
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => DB_HOST,
    'database' => DB_DATABASE,
    'username' => DB_USERNAME,
    'password' => DB_PASSWORD,
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix' => ''
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();
Manager::statement('SET lc_time_names = "ru_RU"');

$container->set('view', function () use ($container) {
    $view = Twig::create(implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'app', 'Views']), [
        'cache' => false
    ]);
    $environment = $view->getEnvironment();
    $environment->addGlobal('application', [
        'title' => APPLICATION_TITLE
    ]);
    $environment->addGlobal('flash', $container->get('flash'));
    $environment->addFunction(new TwigFunction('include', function ($path, $includeRootUrl = false) {
        $rootUrl = '';
        if (isset($includeRootUrl) && boolval($includeRootUrl)) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' || $_SERVER['SERVER_PORT'] == 443) ? 'https' : 'http';
            $rootUrl = $protocol . '://' . $_SERVER['HTTP_HOST'];
        }
        return $rootUrl . '/' . $path . '?v=' . filemtime(ROOT_PATH . '/' . $path);
    }));
    return $view;
});

$container->set('flash', function () {
    return new Messages;
});

$container->set('validator', function () {
    return new Validator;
});

$app->add(TwigMiddleware::createFromContainer($app));
$app->add(new TrailingSlash);

Factory::setDefaultInstance(
    (new Factory)
        ->withRuleNamespace('App\\Validation\\Rules')
        ->withExceptionNamespace('App\\Validation\\Exceptions')
);

require implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'app', 'routes.php']);
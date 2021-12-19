<?php

declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface;
use Slim\Http\Response;

final class MainController extends Controller
{
    public function getHome(Response $response): ResponseInterface
    {
        return $this->view->render($response, 'home.twig');
    }
}
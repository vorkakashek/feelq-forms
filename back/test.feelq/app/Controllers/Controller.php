<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Validation\Validator;
use DI\Container;
use Slim\Flash\Messages;
use Slim\Views\Twig;

/**
 * Class Controller
 * @package App\Controllers
 * @property Twig view
 * @property Messages flash
 * @property Validator validator
 */
abstract class Controller
{
    protected Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function __get($property)
    {
        if ($this->container->get($property)) {
            return $this->container->get($property);
        }
        return null;
    }
}
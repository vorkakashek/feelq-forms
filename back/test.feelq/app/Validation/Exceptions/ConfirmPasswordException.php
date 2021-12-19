<?php

declare(strict_types=1);

namespace App\Validation\Exceptions;

use Respect\Validation\Exceptions\ValidationException;

final class ConfirmPasswordException extends ValidationException
{
    protected $defaultTemplates = array(
        self::MODE_DEFAULT => [
            self::STANDARD => 'Пароли не совпадают.'
        ]
    );
}
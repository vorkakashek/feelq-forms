<?php

declare(strict_types=1);

namespace App\Validation\Exceptions;

use Respect\Validation\Exceptions\ValidationException;

final class EmailAvailableException extends ValidationException
{
    protected $defaultTemplates = array(
        self::MODE_DEFAULT => array(
            self::STANDARD => 'Такой E-Mail уже используется другим пользователем.'
        )
    );
}
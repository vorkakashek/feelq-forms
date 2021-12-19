<?php

declare(strict_types=1);

namespace App\Validation\Rules;

use Respect\Validation\Rules\AbstractRule;

final class ConfirmPassword extends AbstractRule
{
    protected string $password;

    public function __construct(string $password)
    {
        $this->password = $password;
    }

    public function validate($input): bool
    {
        return $input === $this->password;
    }
}
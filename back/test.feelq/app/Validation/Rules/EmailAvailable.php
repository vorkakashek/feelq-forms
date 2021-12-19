<?php

declare(strict_types=1);

namespace App\Validation\Rules;

use App\Models\User;
use Respect\Validation\Rules\AbstractRule;

final class EmailAvailable extends AbstractRule
{
    public function validate($input): bool
    {
        return (new User)->where('email', $input)->count() === 0;
    }
}
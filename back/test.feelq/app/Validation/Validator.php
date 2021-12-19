<?php

declare(strict_types=1);

namespace App\Validation;

use Respect\Validation\Exceptions\NestedValidationException;
use Slim\Http\ServerRequest;

final class Validator
{
    private array $errors = [];

    public function validate(ServerRequest $request, array $rules, array $customMessages = []): Validator
    {
        $params = $request->getParams();
        foreach ($rules as $field => $rule) {
            try {
                $rule->assert($params[$field]);
            } catch (NestedValidationException $e) {
                if (!empty($customMessages) && isset($customMessages[$field])) {
                    if (is_string($customMessages[$field])) {
                        $this->errors[$field] = [$customMessages[$field]];
                    } else {
                        $this->errors[$field] = array_filter($e->getMessages($customMessages[$field]));
                    }
                } else {
                    $this->errors[$field] = $e->getMessages();
                }
            }
        }
        return $this;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function failed(): bool
    {
        return !empty($this->errors);
    }
}
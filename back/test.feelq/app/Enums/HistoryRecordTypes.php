<?php

declare(strict_types=1);

namespace App\Enums;

final class HistoryRecordTypes
{
    public const CREATE = 1;
    public const UPDATE = 2;
    public const DELETE = 3;
    public const RESTORE = 4;
}
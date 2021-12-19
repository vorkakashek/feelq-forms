<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin Builder
 * Class HistoryRecord
 * @package App\Models
 * @property int id
 * @property string table
 * @property int record_id
 * @property int type
 * @property string data
 * @property int creator
 * @property string creator_name
 * @property Carbon created_at
 * @property Carbon updated_at
 * @property Carbon deleted_at
 */
final class HistoryRecord extends Model
{
    public static function getTableName(): string
    {
        return (new self)->getTable();
    }

    use SoftDeletes;

    protected $table = 'history_records';

    protected $fillable = [
        'table',
        'record_id',
        'type',
        'data',
        'creator'
    ];

    protected $appends = [
        'creator_name'
    ];

    public function getCreatorNameAttribute(): string
    {
        if ($this->creator == 0) {
            return 'SYSTEM';
        }
        $user = (new User)->find($this->creator);
        if ($user == null) {
            return 'Неизвестно';
        }
        return $this->implode((string)array_filter([$user->surname, $user->name, $user->patronymic]), ' ');
    }
}
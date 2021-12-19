<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Auth\Auth;
use App\Enums\HistoryRecordTypes;

/**
 * Class HistoryTrackingModel
 * @package App\Models
 */
abstract class HistoryTrackingModel extends Model
{
    use SoftDeletes;

    protected static function boot()
    {
        parent::boot();
        self::created(function (HistoryTrackingModel $model) {
            $data = $model->toArray();
            foreach ($model->appends as $append) {
                unset($data[$append]);
            }
            (new HistoryRecord)->create([
                'table' => $model->table,
                'record_id' => $model->getAttribute('id'),
                'type' => HistoryRecordTypes::CREATE,
                'data' => json_encode($data),
                'creator' => Auth::check() ? Auth::user()->id : 0
            ]);
        });
        self::updated(function (HistoryTrackingModel $model) {
            $oldData = [];
            $originalData = $model->getOriginal();
            $newData = $model->getDirty();
            foreach ($newData as $key => $value) {
                if (in_array($key, [self::CREATED_AT, self::UPDATED_AT, $model->getDeletedAtColumn()])) {
                    $newData[$key] = $value != null ? Carbon::createFromTimeString($value) : null;
                }
                $oldData[$key] = $originalData[$key];
            }
            if (!empty(array_diff(array_keys($oldData), [self::UPDATED_AT, $model->getDeletedAtColumn()]))) {
                (new HistoryRecord)->create([
                    'table' => $model->table,
                    'record_id' => $model->getAttribute('id'),
                    'type' => HistoryRecordTypes::UPDATE,
                    'data' => json_encode(['old' => $oldData, 'new' => $newData]),
                    'creator' => Auth::check() ? Auth::user()->id : 0
                ]);
            }
        });
        self::deleted(function (HistoryTrackingModel $model) {
            (new HistoryRecord)->create([
                'table' => $model->table,
                'record_id' => $model->getAttribute('id'),
                'type' => HistoryRecordTypes::DELETE,
                'creator' => Auth::check() ? Auth::user()->id : 0
            ]);
        });
        self::restored(function (HistoryTrackingModel $model) {
            (new HistoryRecord)->create([
                'table' => $model->table,
                'record_id' => $model->getAttribute('id'),
                'type' => HistoryRecordTypes::RESTORE,
                'creator' => Auth::check() ? Auth::user()->id : 0
            ]);
        });
    }
}
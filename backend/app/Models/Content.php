<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'label',
        'content',
        'image',
        'video',
        'langs_id',
        'ma_estatus_id'
    ];

    public function lang()
    {
       return $this->hasOne(Lang::class, 'id' ,'langs_id')->select(["id","label","symbol"]);
    }

    public function status()
    {
       return $this->hasOne(MasterTable::class, 'id' ,'ma_estatus_id')->select(["id","label"]);
    }


}

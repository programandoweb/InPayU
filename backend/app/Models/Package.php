<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use App\Models\Prices;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'parent_id',
        'contents_id',
        'prices_id',
        'ma_estatus_id',
        'langs_id',
    ];

    public function parent()
    {
       return $this->hasMany(Package::class, 'parent_id' ,'id');
    }

    public function content()
    {
       return $this->hasOne(Content::class, 'id' ,'contents_id')->select(['id','label','content','image']);
    }

    public function price()
    {
       return $this->hasOne(Price::class, 'id' ,'prices_id')->select(['id','price','offer']);
    }
}

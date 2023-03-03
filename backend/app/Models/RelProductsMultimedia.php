<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelProductsMultimedia extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'label',
        'summary',
        'products_id',
        'multimedia_id',
        'order',
        'status'
    ];

    public function multimedia()
    {
       return $this->hasMany(Multimedia::class, 'id' ,'multimedia_id')->select("*")->selectRaw(fullpath());
    }
}

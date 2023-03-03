<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scrapping extends Model
{
    use HasFactory;
    protected $fillable = [
        'url',
        'status',
        'response',
        'scrapear',
        'response_scrapear',
    ];
}

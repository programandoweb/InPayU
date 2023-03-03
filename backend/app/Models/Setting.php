<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'logo',
        'description',
        'domain',
        'email',
        'phone',

        'payu_merchantId',
        'payu_accountId',
        'payu_description',
        'payu_referenceCode',
        'payu_amount',
        'payu_currency',
        'payu_signature',
        'payu_test',
        'payu_buyerEmail',
        
    ];
}

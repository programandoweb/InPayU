<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
     
    protected $fillable = [
        'user_id',
        'usuario_id',
        'nombres',
        'apellidos',
        'fecha_nacimiento',
        'ma_genero_id',
        'razon_social',
        'ma_tipo_identificacion_id',
        'nro_identificacion',
        'nombre_representante_legal',
        'ma_tipo_identificacion_representante_id',
        'nro_identificacion_representante_legal',
        'lugar_expedicion',
        'fecha_expedicion',
        'pregunta_seguridad',
        'respuesta_seguridad'
    ];

}

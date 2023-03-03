<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles    =   [
                        "Super Admin",
                        "Admin",
                        "Subadmin",
                        "Webmaster",
                        "Cliente",
                        "SubCliente",
                        "Genérico",
                        "Visitante",
                    ];


        $permissions = [
            'user_create',
            'user_list',
            'user_edit',
            'user_destroy',
            'content_create',
            'content_list',
            'content_edit',
            'content_destroy',
            'contentcategory_create',
            'contentcategory_list',
            'contentcategory_edit',
            'contentcategory_destroy',
            'multimedia_create',
            'multimedia_list',
            'multimedia_edit',
            'multimedia_destroy',
            'multimedia_upload',
         ];

        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        foreach($permissions as $value){
            Permission::create(['name' => $value , 'guard_name' => "web"]);
        }


        foreach($roles as $value){
            Role::create(['name' => $value , 'guard_name' => "web"])->givePermissionTo($permissions);
        }

        // $super = Role::create([
        //     'name' => 'super-admin',
        //     'guard_name' => 'web'
        // ]);
        //
        // $permissions = Permission::pluck('id', 'id')->all();
        // $super->syncPermissions($permissions);
        //
        // $admin = Role::create([
        //     'name' => 'admin',
        //     'guard_name' => 'web'
        // ]);
        //
        // $adminPermission = Permission::pluck('id', 'id')->all();
        // $admin->syncPermissions($adminPermission);
        // $admin->revokePermissionTo('user-create');
    }
}

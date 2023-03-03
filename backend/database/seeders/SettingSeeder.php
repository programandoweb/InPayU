<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = Setting::create([   'logo' => 'https://drive.google.com/uc?export=view&id=1uMuKY4Lwu-eslgGnG9FoYCZL7OnQb1IF',
                                        'description'  => 'Emprendimiento de desarrollo tecnológico con la más avanzada tecnología del mercado en constante innovación.',
                                        'domain'  => 'programandoweb.net',
                                        'email'  => 'info@programandoweb.net',
                                        'phone'  => '3115000926',

                                        'payu_merchantId'  => '508029',
                                        'payu_accountId'  => '512321',
                                        'payu_description'  => 'Test PAYU',
                                        'payu_referenceCode'  => 'Test PAYU',
                                        'payu_amount'  => '100',
                                        'payu_currency'  => 'USD',
                                        'payu_signature'  => '',

                                        'payu_test'  => '',
                                        'payu_buyerEmail'  => 'info@programandoweb.net',

        ]);
    }
}

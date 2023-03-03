<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;

class BancosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json         = '[
{"id":"1","label":"Banco Agrario de Colombia S.A.","Nit":"800.037.800","DV":"8","Direccion":"Carrera 8 # 15 - 43","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3821400","token":"ma_bancos_907ac3752651b11fc52cd52ffaaea17dac1a19ffa3a267ecd23bc82fdd61b967983e73e66822fc228c5f99a99c8b9e2b","ref":""},
{"id":"2","label":"Banco Caja Social BCSC S.A.","Nit":"860.007.335","DV":"4","Direccion":"Carrera 7 # 77- 65, Torre Colmena","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3138000","token":"ma_bancos_9d9e81aa3500b23c25eaf20375d796a35726cbdfb5650dbed5807c3e3956a727983e73e66822fc228c5f99a99c8b9e2b","ref":"032.BCSC"},
{"id":"3","label":"Banco Colpatria Multibanca Colpatria S.A.","Nit":"860.034.594","DV":"1","Direccion":"Carrera 7 # 24 - 89, Piso # 10","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3386300","token":"ma_bancos_f58a498ca5a786fe4f465aa636e69de469af76eb49ab01a32178bbb25c14006b983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"4","label":"Banco Comercial AV Villas S.A.","Nit":"860.035.827","DV":"5","Direccion":"Carrera 13 # 27- 47","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"2875411","token":"ma_bancos_494cfc212f34cfaf2a2c5913a41ce54b327039422d8f02a6df3b7c06b7068f22983e73e66822fc228c5f99a99c8b9e2b","ref":"052.AV VILLAS"},
{"id":"5","label":"Banco Compartir S.A","Nit":"860.025.971","DV":"5","Direccion":"Calle 16 # 6 - 66, Edificio Avianca P.H.","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"2868609","token":"ma_bancos_2d56755d8659b49a89fe5605ecd8bf120f4acc8f9a430481b9c77359a08961ee983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"6","label":"Banco Coomeva S.A.","Nit":"900.406.150","DV":"5","Direccion":"Calle 13 # 57 - 50, Piso # 2","Ciudad":"Cali","Departamento":"Valle del Cauca","Telefono":"3330000","token":"ma_bancos_3d15e8d80c27f65be567b1a6786b8e0b05c681b9fb252ae465ffafde5a258562983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"7","label":"Banco Cooperativo Coopcentral S.A.","Nit":"890.203.088","DV":"9","Direccion":"Avenida Calle 116 # 23 - 06, Edificio Business Center 116 P.H.","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"7431088","token":"ma_bancos_2c916319263c02402798ad1a4ce7fde6e230ce82f1cc799d9126daa64da7399e983e73e66822fc228c5f99a99c8b9e2b","ref":"066.COOPCENTRAL"},
{"id":"8","label":"Banco Davivienda S.A.","Nit":"860.034.313","DV":"7","Direccion":"Avenida el Dorado # 68 C -61, Piso # 10","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3300000","token":"ma_bancos_b258ca3d206939297ecda817080f2f46af575e0006816124d4eecd3c6e886d64983e73e66822fc228c5f99a99c8b9e2b","ref":"051.DAVIVIENDA"},
{"id":"9","label":"Banco de Bogotá S.A.","Nit":"860.002.964","DV":"4","Direccion":"Calle 36 # 7 - 47","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3383396","token":"ma_bancos_e9bc240db6f95a275090311d6da844e9fea56d26b924a1651447597818415695983e73e66822fc228c5f99a99c8b9e2b","ref":"001.BOGOTA"},
{"id":"10","label":"Banco de las Microfinanzas Bancamía S.A.","Nit":"900.215.071","DV":"1","Direccion":"Carrera 9 # 66 - 25","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3139300","token":"ma_bancos_bef54f258e9c70a8c801451647badff193bedf5307102e1478eed47b4241c02b983e73e66822fc228c5f99a99c8b9e2b","ref":"059.BANCAMIA"},
{"id":"11","label":"Banco de Occidente S.A.","Nit":"890.300.279","DV":"4","Direccion":"Carrera 4 # 7- 61, Piso # 15","Ciudad":"Cali","Departamento":"Valle del Cauca","Telefono":"8861111","token":"ma_bancos_e7a18dfc976f317278c76454f498a8d67f1e1113d4a76b46efde6cb01018ce54983e73e66822fc228c5f99a99c8b9e2b","ref":"023.DE OCCIDENTE"},
{"id":"12","label":"Banco Falabella S.A.","Nit":"900.047.981","DV":"8","Direccion":"Avenida 19 # 120 - 71, Piso # 3","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"5878787","token":"ma_bancos_3836f3c5cd18724d6a56433632976de3ce8956f03fa43f793c71cad1f4e1a165983e73e66822fc228c5f99a99c8b9e2b","ref":"062.FALABELLA"},
{"id":"13","label":"Banco Finandina S.A.","Nit":"860.051.894","DV":"6","Direccion":"Kilometro 17 Vía Chía","Ciudad":"Chía","Departamento":"Cundinamarca","Telefono":"6511919","token":"ma_bancos_e0663f745f540b282256e137335d87be7d6127b57847886c97283d7b7ae11f23983e73e66822fc228c5f99a99c8b9e2b","ref":"063.FINANDINA"},
{"id":"14","label":"Banco GNB Sudameris Colombia S.A.","Nit":"860.050.750","DV":"1","Direccion":"Carrera 7 # 75 - 85","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"2750000","token":"ma_bancos_d2276171613fb4f3de27e00034dcc407b3a44027f2950761dde1eb07c30b660c983e73e66822fc228c5f99a99c8b9e2b","ref":"012.GNB SUDAMERIS"},
{"id":"15","label":"Banco ITAU Corpbanca Colombia S.A.","Nit":"890.903.937","DV":"0","Direccion":"Carrera 7 # 99 - 53","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"6448500","token":"ma_bancos_a60eef6e1fe898a5ff54fe869698077ddbb4e4ccfd653c0a4c2208bad824b9a5983e73e66822fc228c5f99a99c8b9e2b","ref":"014.ITAU"},
{"id":"16","label":"Banco Multibank S.A","Nit":"860.024.414","DV":"1","Direccion":"Carrera 7 # 73 - 47, Piso # 6","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3256600","token":"ma_bancos_700359f55ce6d68317f4b1388cd0e34b761d41be7fbb3dffde51e5cb3118921e983e73e66822fc228c5f99a99c8b9e2b","ref":"064.MULTIBANK"},
{"id":"17","label":"Banco Mundo Mujer S.A.","Nit":"900.768.933","DV":"8","Direccion":"Carrera 11 # 5 - 56","Ciudad":"Popayan","Departamento":"Cauca","Telefono":"8399900","token":"ma_bancos_0e62f0a576f228d21a63847cc78870ef37af2d01240d5798f97ca1d13a2d5744983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"18","label":"Banco Pichincha S.A.","Nit":"890.200.756","DV":"7","Direccion":"Carrera 35 # 42 - 39","Ciudad":"Bucaramanga","Departamento":"Santander","Telefono":"6800299","token":"ma_bancos_00f20afaeba829c82b9579ce3380928164ea0b2c2cba8a0b1c262a033605587b983e73e66822fc228c5f99a99c8b9e2b","ref":"060.PICHINCHA"},
{"id":"19","label":"Banco Popular S.A.","Nit":"860.007.738","DV":"9","Direccion":"Calle 17 # 7- 35","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3395500","token":"ma_bancos_f7d5c496bfc1860d79ceab302ad333c3f19e1401b1d00f261c91675247f1394c983e73e66822fc228c5f99a99c8b9e2b","ref":"002.POPULAR"},
{"id":"20","label":"Banco ProCredit Colombia S.A.","Nit":"900.200.960","DV":"9","Direccion":"Avenida Calle 39 # 13 A - 16","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"5978480","token":"ma_bancos_8ce48d9e67225f0bfce75d8010f35454be85a02b078f16d27b8e7527c529e39b983e73e66822fc228c5f99a99c8b9e2b","ref":"058.PROCREDIT"},
{"id":"21","label":"Banco Santander de Negocios Colombia S.A.","Nit":"900.628.110","DV":"3","Direccion":"Calle 93 A # 13 - 24, Piso # 4","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"7434222","token":"ma_bancos_905a24c1bc050030e05e2cc971dcf193db9d9fe6705099314743434b33f270a1983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"22","label":"Banco W S.A.","Nit":"900.378.212","DV":"2","Direccion":"Avenida 5 Norte # 16 N - 57, Piso # 4","Ciudad":"Cali","Departamento":"Valle del Cauca","Telefono":"6083947","token":"ma_bancos_52b74f5224af7355c8453c3a74c76da553ddd3224212220dc8cb253f5ad6ae7b983e73e66822fc228c5f99a99c8b9e2b","ref":null},
{"id":"23","label":"Bancolombia S.A.","Nit":"890.903.938","DV":"8","Direccion":"Carrera 48 # 26 - 85, Avenida Los Industriales","Ciudad":"Medellin","Departamento":"Antioquia","Telefono":"4040000","token":"ma_bancos_7f879bb4ef5875a7e6b504b973963816f9bc375f71b1b53d3ebc9bd408ed6a24983e73e66822fc228c5f99a99c8b9e2b","ref":"007.BANCOLOMBIA"},
{"id":"24","label":"BBVA Banco Bilbao Vizcaya Argentaria S.A.","Nit":"860.003.020","DV":"1","Direccion":"Carrera 9 # 72 - 21","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3471600","token":"ma_bancos_5a0591f3ac4e18f3ccd82d690f30f879b6d83b2998454916e730de890ae3aed3983e73e66822fc228c5f99a99c8b9e2b","ref":"013.BBVA"},
{"id":"36","label":"Nequi (Bancolombia S.A.)","Nit":"890.903.938","DV":"8","Direccion":"Carrera 48 # 26 - 85, Avenida Los Industriales","Ciudad":"Medellin","Departamento":"Colombia","Telefono":"4040000","token":"ma_bancos_777b7e16d5d0a717f8779acd19db26fdcbfc61e3518cf8984b3fa22cfa154c57983e73e66822fc228c5f99a99c8b9e2b","ref":"507.NEQUI"},
{"id":"39","label":"Daviplata S.A.","Nit":"860.034.313","DV":"7","Direccion":"Avenida el Dorado # 68 C -61, Piso # 10","Ciudad":"Bogota","Departamento":"Cundinamarca","Telefono":"3300000","token":"ma_bancos_8660cda801048b73297dcc07fd332ffd19b77ddf4c1ce02764f8fe1a749eb641983e73e66822fc228c5f99a99c8b9e2b","ref":"051.DAVIVIENDA"}
]';
          foreach (json_decode($json) as $key => $value) {
            unset($value->token,$value->id);
            $insert = [];
            foreach ($value as $key2 => $value2) {
              $insert[$key2]=$value2;
            }
            DB::table('bancos')->insert($insert);
          }
    }
}

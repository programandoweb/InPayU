<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products;
use App\Models\RelProductsMultimedia;
use App\Models\RelProductsCharacteristics;
use Illuminate\Support\Str;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $nombres="Dorita de Soto,Tecla Ortega-Oliva,Saturnino Ferrer Murillo,Carmelita Barrios Nicolau,Seve de Berenguer,Manuelita Flor Calvet,Araceli Pujol Alemany,Roldán Vila Bermejo,María Ropero Franco,Leopoldo José María Verdú Salamanca,Esmeralda Tovar Nuñez,Mario Hoz Andrés,Araceli Gimenez Herrero,Joel Guerra Falcó,Sandra Alberdi Cervantes,Irene Alberola,Felix Iborra Cabrera,Paola Peñalver,Bautista Goñi-Abascal,Arcelia Elorza Escribano,Herminia Gracia Guijarro,Clímaco Torres Cañas,Josué Murillo Villalba,Zacarías Quique Salazar Amo,Arsenio Fuertes Ros,Jacobo Roselló Ibarra,Víctor Montoya,Nilda Laura Carbó Gabaldón,Leocadia Carvajal,Araceli Mariscal Viñas,Isa Gil Borja,Vicenta Duran Ródenas,Olalla Gallardo,Custodio Grau Nebot,Florencia Borrell,Bárbara Carnero-Gárate,Lázaro Albero Olmo,Rosalina Manjón,Luz España Canals,Felisa Medina-Pedro,Daniela Santana Iglesia,Jeremías Ballester-Berenguer,Epifanio Gutiérrez-Martínez,Gabriela Ribas,Judith Calatayud-Dominguez,Édgar Bonet,Reynaldo de Llano,Ale Cañellas Perales,Jafet Natanael Álvarez Amat,Chema Andres Diez,Nico Prat Dominguez,Jesús Jordá Gutierrez,Horacio Olivera Esteve,Pastora Perez Rico,Olalla Cerdá Segura,Ligia Vives Galiano,Juanito Castells,Evangelina Iniesta Molins,Sergio Pedro-Lago,Jenaro Marin-Riba,Claudio Fabregat-Ribas,Severo Capdevila Barriga,Mariana Campos Sancho,Fortunato de Giralt,Zacarías Figueroa Frías,Santos Ibarra,María Rodrigo Tello,Pastora Lucena,Jose Ramón Valverde,Santos Prat Robledo,Trinidad Querol Cózar,Edgardo Galiano Vázquez,Agustín Calzada,Amalia Pino Ureña,Reyna de Soriano,Tiburcio Porfirio Arenas Quintero,Mario Sanz,Dora Aliaga Mir,Adolfo de Cortés,Alondra Azeneth Vallés Pozuelo,Cruz Gil Vera,Luz Pedraza Llabrés,Sigfrido Cervantes,Eleuterio Pelayo Moya Carpio,Saturnina Mascaró Valentín,Amelia Perez Alcántara,Julia Chico Tejera,Gala Córdoba-Gonzalez,Ángel Borrego Casado,Mireia Escobar Moliner,Juan Antonio Becerra Blanco,Luciano Barco Garmendia,Amarilis del Velasco,Julie Almansa,Inocencio Ibañez,Dora España Bermejo,Arturo Montalbán Cuervo,Perla Valls Viana,Gil Juan Luis Tenorio Murillo,Eric Abel Marin Raya,Rodrigo Cuesta,Zoraida Peral Araujo,Emilio Zabaleta,Marcial Casals Isern,Amarilis Castrillo-Bilbao,Borja Juliá Alcalde,María Manuela Jerez Solsona,Juana Torrecilla Barrena,Ezequiel Reig Villalba,Cristian Bello Novoa,Julio Vega Sanabria,Baldomero Carrillo Franco,Julio Gibert Guitart,Fabricio del Sanmartín,Lidia Murcia Perales,Albina Bernad Manzanares,Ignacio de Sánchez,Íngrid Frutos,Ramiro Suárez Galán,Jose Miguel Fabregat Nogueira,Rosario Peñas Valenciano,Olga Feliciana Jara Ros,Cruz Duarte,Faustino Sastre Calleja,José Ángel Castilla Bernat,Eugenio Guijarro,Marina Cózar-Verdejo,Sarita de Ferrándiz,Odalys África Cabello Borrell,Vanesa del Lasa,Ruth Cordero Tirado,Chuy Vives-Cruz,Ana Sofía de Cerro,Florencio Onofre Pinedo Arjona,Manola Carbajo,Brunilda Oriana Puga Caballero,Fortunato Cruz Torrecilla Corbacho,Chus Zapata Rocamora,Elisabet del Ríos,Víctor Luque-Porcel,María Pilar Lamas-Hervás,Susana Ariza Pinedo,Eli Sevilla,Alejandra Menéndez Donaire,Silvio Santamaria Vaquero,Corona Fabregat Trujillo,Sandra Patiño Montoya,Luís Gil Bayón,Isabela Casas Sastre,Silvia Girón Ayuso,Irma Prats Mosquera,Hernán Hoyos Rosado,Lupe Jover Rodríguez,Felix Páez-Pallarès,Ariel Pol Tejera,Goyo del Pablo,Ema Sola Galan,Claudio Daza Escribano,Azahara Correa Pintor,Eligia Río-Lumbreras,Heraclio Azorin Pou,Nidia Manso,Noa Calatayud Herranz,Candelario Tejada,José Antonio Collado Ayala,Octavia Maestre,Aarón Batalla Acuña,Aarón Rosselló Carpio,Renato Sacristán Morales,Ángela del Bosch,Nico Merino Moles,Amparo de Dávila,Odalis Ayuso,Ángela del Maldonado,Amancio Iriarte,Eligia Arcelia Oliveras Batlle,Bernardino Zabaleta Segovia,Sol Pacheco Alcalde,Severiano Arrieta Arenas,Amanda Nieves Gilabert Camps,Javier Paz Cerezo,Florencio Calderón Millán,Abril Olmedo Franch,Julián Gaya-Amador,Luís Crespi-Francisco,Nieves Ayala-Arce,Amador Corbacho Vallés,Ildefonso Sigfrido Franch Frías,Miguela Pacheco-Gabaldón,Lucas Gaya Calvet,María Cristina Isabela Cabrera Figueroa,Héctor Posada Vázquez,Balduino Silvestre Piñeiro Fiol,Claudia Solé Arranz,Ainara Barrio,Dorita Samper-Carbonell,Jacobo del Barral,Consuela Pablo Cerdá,Primitiva del Cuevas,Dora Palomar Carbonell,Fermín del Conde,Vinicio Merino Silva,Esmeralda Jordana Otero Elías,Adela de Francisco,José del Cañete,Óscar Ballesteros Cal,Quirino Sobrino Revilla,Pastor del Cuevas,Emma Alfonso Álvaro,Custodia de Crespo,Nico Garrido,Rodrigo Huerta Guillén,Débora Hoyos,Jennifer Cabezas Yáñez,Apolinar Prado Villegas,Tomasa Osuna Tejada,Rosa María Gimenez,Lucila Tello Escalona,Borja Tello Sastre,Adelaida Niño Sales,Luisa Benigna Dominguez Soriano,Beatriz Verdú,Leandra Barriga-García,Concha Caballero Muñoz,Angelina Rodriguez Rubio,Íngrid Mir,Claudia de Guardiola,Dulce Cid Pellicer,Desiderio Seguí Barrena,Melchor Lloret Duarte,Bibiana Trujillo Ros,Sigfrido Abellán Antón,Carolina Armas,León Garriga Aragón,Micaela de Abellán,Ale Buendía Blanch,Ligia Duarte,Luis Miguel del Sarabia,Marina Vilar Arce,Carlos Vizcaíno Bravo,Diego del Barreda,Evita Llorente Sedano,Casemiro del Manzano,Yolanda Barberá Lorenzo,Eusebia Corona Salmerón Pineda,Segismundo Echeverría Cid,Feliciano Iglesia Casanova,Régulo Hervás Anaya,Casandra Pineda Mesa,Santos Amo Barco,Odalys Portero Gallardo,Octavia Sanmartín Fernández,Amada Cornejo Barba,Casandra del Pino,Abel Meléndez Calvet,Ramona del Pardo,Maxi Madrigal Sanjuan,Julio Correa Sebastián,Osvaldo Fábregas Burgos,Marisela Isaura Serrano Páez,Luisa Prat-Lledó,Inés Garcés Grau,Estrella Godoy Gabaldón,Fortunato de Ribas,Juanita Gálvez Buendía,Juanita Oliver Hernando,Leopoldo de Sevillano,Adora Puig,Albina Carranza,Martirio Revilla Prado,Celestina Yáñez-Perales,Roberta Calzada,Yago Izaguirre,Miriam Barrios Riera,Juan Antonio Diego,Arsenio Cabrera Alegria,Natividad Puig-Lucena,Maristela Blázquez Conesa,Jenaro Múñiz Hervia,Lupe Vaquero Lamas,Gastón Torrents Morata,Santos Aitor Andrés Pinedo,Anacleto Iniesta Pozuelo,Amor Campo Prat,Serafina Esparza Palacio,Telmo Adadia,Tamara Ballesteros Burgos,Ovidio Pujadas Navas,Isabel Escudero,Angelino Carranza Pedrosa,Máxima Calatayud Barceló,Elvira Yuste Garriga,Pepita Solsona-Belmonte,Alexandra Azcona Casanova,Jordi Alegre Urrutia,Felisa Campo Canet,Héctor Jose Carlos Iglesias Soriano,Marcela Manjón Benet,Ana Belén Jimenez Falcón,Ulises Losa Osuna,Calista Font Aznar,Porfirio España Torre,Magdalena Manu Cifuentes Aguilera,Noa Pont Busquets,Asunción del Franco,Albano Fuertes Girón,Dionisia Mendizábal Navarro,Fulgencio Silvestre Ferrández Bermúdez,Emilia Baños Sarabia,Tania Ferrer Lobato,Teresa Huertas Abascal,Guillermo Guardia Cobo,Candelas Valenzuela-Pacheco,Lucas Almagro,Ana Folch Cabello,Quique Nacio Mosquera Garay,Jose Miguel del Puga,Fortunato Pinedo Gutierrez,Wálter Vicens Roda,Kike Carretero Marin,Rosa Echeverría Montoya,Delfina Castejón Marquez,Lucas Gonzalez Aguiló,Lalo Roselló Bas,Rosa Muro,Encarnita Marita Robledo Campillo,Diana Requena Hoz,Alejo Severino Lopez Tejada,Eliana Jáuregui,Plinio Arco Alemán,Gervasio Marquez Batalla,Mauricio Barranco Guillen,Vinicio Uriarte Valero,Eli Baró Pulido,María Pilar del Belda,Ignacia Cuenca Zorrilla,Aureliano Verdejo Flor,Marciano Cobo,Buenaventura Infante Guzmán,Arturo Lastra Arcos,Nazario Clímaco Roca Comas,Noemí Esperanza Hervás Torrens,Hipólito Torrecilla Nogueira,Fátima Dionisia Galán Mata,Dora Juárez Gras,Encarnacion Albina Barroso Parejo,Maricruz Cobo Amador,Florentino Bustos,Narcisa Santiago Vilar,Leocadio Santana Santana,Blas Ibañez Reig,Lorena Portero Otero,Horacio Tormo Casado,Bernabé Pons Mateu,Eloísa Aparicio González,Lara Goicoechea Oliveras,Octavio Escrivá Gil,Dolores Ferrero Espinosa,Domitila Chelo Sánchez Llabrés,Nidia Cortina Arana,Irene Caro Larrañaga,Anselmo Guillen Ramis,Cristian Cantero Artigas,Amado Tomé Costa,Morena Gaya Guillen,Palmira Aguilar Velázquez,Fortunato Ugarte Carro,Albina Marcos Collado,Humberto Isern Neira,Francisco Serna Frutos,Pili Pinto Barragán,Eusebia Rico-Maestre,Rosa María del Casanovas,Valentín Perera-Riera,Estela Serra-Prado,Imelda Roig Tejada,María Del Carmen de Almazán,Reynaldo Rios Pont,Pastor Landa-Gabaldón,Maricruz Nevado,Adolfo Goicoechea Muñoz,José Manuel Pedrero,Eligia Perera Fernandez,Manu Ángeles Solé Roma,Marta Gárate,María Ayllón Sanmartín,Felicidad Gámez Tejada,Maura Santiago,Rosario Heredia Jover,Osvaldo Benavente Real,Néstor Fernando Fernandez Verdú,Angélica Rosado Orozco,Urbano Kike Gimenez Hidalgo,María Manuela del Cepeda,Valeria de Boada,Desiderio Aníbal Olivé Vendrell,Ramona Barragán Jara,Adán del Benítez,Omar Falcó,Asdrubal Macías,Francisco Javier Franch Agullo,Benigno Vilar Barbero,Ildefonso Arrieta,Martina Amor Morera,Rosalina Vizcaíno Gomila,Ana Osuna Infante,Jesús Paco Roig Beltrán,Moreno de Barrena,Carmina de Roldan,Germán Martínez Arcos,Máxima Sans Castro,Alicia Llobet Luque,Adelina Pedrosa Requena,Damián del Sancho,Carina del Bermejo,Plácido Carrasco Badía,José Elías Casares,Priscila Amador Escribano,Maura Calderon Bru,Begoña Ferreras Ballesteros,Aurelia Adadia Casas,Cosme Morante Vallejo,Osvaldo Flores Vallés,Gerardo Vicens Valderrama,Cesar Barrio Palacio,Ángeles Gutiérrez,Loreto Ripoll Rebollo,Porfirio Amigó Ortiz,Loreto Duran Quero,Armando Bonet Pombo,Ciriaco Ariza-Vargas,Marcos Pío Iriarte Navarro,Feliciano del Acevedo,Rosalía de Santamaria,Teodosio Durán Real,Timoteo Gómez Arribas,Ale Gomis Arribas,Salomón Morcillo,Teófilo Calzada Bauzà,Estefanía Abascal Román,Toribio Rosado-Soriano,Juan Carlos Osuna Rueda,Fito Campoy-Crespo,Florinda Carnero Guerrero,Silvestre Arregui Gomila,Ofelia Jover Arnaiz,Mónica Romero-Medina,Pascual Roca Andrés,Gala Bayona,Erasmo Sotelo,Gema de Cardona,Manuel Manzano Mariscal,Juan Carlos Mesa-Ferrero,Pedro Guiomar Arévalo Torralba,Ileana del Carmona,Maristela Álvaro Pellicer,Olga Espada,Desiderio del Pino,Albano Bosch Cobo,Elodia Mancebo Sáez,Abilio Muro,Leocadia de Peiró,Benjamín del Hierro,Eric Mosquera Escolano,Raúl Jurado Osorio,Amor Castillo Garcés,Ariel Estevez Adán,Casemiro Corominas Villa,Maxi Alberto-Company,Leocadia Fabra-Egea,Flor Ferreras Garcés,Nacho Fuertes-Bermejo,Simón Eliseo Mena Navas,Anabel Agustí Clavero,Tiburcio Girón Trillo,Nazaret Amat,Juan Pablo Sancho Sanabria,Agustina de Núñez,Micaela Cerro Parra,Roldán Flor Vilanova,Ale Cano,Ascensión Alberto Bernat,Eligia Luján Oliva,Josué Mínguez-Cortés,Carlito Conesa Montserrat,Remigio Isidoro Rosales Ribera,Jose Carlos Marquez Garmendia,Silvestre Pi Amores,Tania Valle Enríquez,Candelaria Herrero,Lara Carro Menéndez,Rufino Guerrero,Tristán Montenegro Azorin,Emma Llano Manjón,Eligio Rosado Menéndez,Luisa Serrano,Dolores Vilalta Narváez,Ani Mínguez Pavón,Nazario Gallart Mateo,Gilberto Asensio Hernández,Osvaldo Jose Carlos Berrocal Lillo,Segismundo de Otero,Natalia María Teresa Rubio Gomila,Rufina Sevilla,Juan Bautista Pont Conde,Nieves Llorente Paniagua,Natanael Baquero Bastida,Amaro Chamorro Cobo,Eligia Escamilla Miguel,Matilde del Infante,Ignacia Río-Azcona,Rodrigo Báez Gallo,Arsenio Juan Alegre Estevez,Melania Peralta Barral,Ulises Adelardo Carrera Adán,Gloria Vicens-Bellido,Aurelia Fernandez,Bernarda Ana Belén Arenas Luís,Cintia Valverde Bastida,Ruy Salazar,Mar Pera Giménez,Ignacia del Hoyos,Juan Antonio Caparrós Rodríguez,Araceli Barreda Manrique,Alberto Solera Porcel,Américo Merino Ramírez,Ramón Jordi Moliner Zabaleta,Claudio Blasco Aznar,Corona Peinado-Silva,Nélida Porta Diez,Nacho Bermúdez Bermúdez,Reyes Rovira Romero,Haydée López Falcón,Paca Aguado Pons,Mario Clavero Escolano,Jordán Torrecilla,Zaida Ágata Osorio Puerta,Arturo Cerro Luján,Jimena Solsona Borja,Paula Fabra Gracia,Rosalinda Cánovas Cortina,Eustaquio Villanueva Carreño,Tania Montserrat Mateu Miralles,Georgina Mariño Rovira,Lucía Juana Moll Talavera,Urbano Calzada Fuster,Sara Emelina Castrillo Morera,Tito del Rodríguez,Tamara Fabra Arribas,Elpidio Somoza Cases,Donato Llamas Carrera,Carlota Carro Puerta,Roberta Bauzà Calderón,Hernán Lorenzo Castilla Pablo,Rogelio Patiño Padilla,Berta Tapia-Martínez,Nazario de Cruz,Adelardo Amorós Torrecilla,José Ángel de Soler,Martina de Solís,Emiliana Cañete Ortega,Débora Robledo Ocaña,Dalila Tudela Quero,Anastasio Soriano Noriega,Ramona Soriano Redondo,Begoña Tamarit Mascaró,Mar del Huguet,Joaquina Garzón Castilla,Rolando Villegas Cuadrado,Efraín Hurtado Mendez,Joaquín Cases Checa,Arsenio Murcia Marcos,Heraclio Manrique Fábregas,María Celestino Verdugo Francisco,Rita Cárdenas,Aarón del Escolano,Victorino del Bilbao,Victoriano Velasco Vargas,Xavier Hurtado Calderón,Sarita Luna Cortes,Virgilio Lucena Goicoechea,Cayetana Tomas,Horacio de Saez,Carmelita Robledo,Ignacio Tena,Leopoldo Díez Ballesteros,Agapito Pombo Fuentes,Nidia Anunciación Andres Rojas,Macarena Gallo Sanabria,Pío Guiomar Alvarado Castañeda,Patricia Acuña Serrano,Jaime Abella Torrens,Vicenta del Porcel,Geraldo Alberola Roca,Samu Barrena,Geraldo Espada,Amaro Calvet Aranda,Mirta Elodia Dominguez Benavent,Concha Rojas Muro,Aitor Sarmiento Jiménez,Lope Abellán Martinez,Amaya Ojeda Sarmiento,Fortunata Gallardo Yuste,Benita Zaragoza Valenzuela,Lina Botella Bárcena,Celia Bautista Bello,Calixta Gibert Villegas,Jacinta Carro Escribano,Nadia Montero-Nadal,Odalys Alcalde-Pedrosa,Amanda Valenzuela Salcedo";

        $explode  =   explode(",",$nombres);

        $items=[
                "label"=>"Colchón ".$explode[rand(1,80)]." Original",
                "summary"=>"El ".$explode[rand(1,80)]." Original cambia el juego cuando se trata de mejorar el sueño.",
                "price"=>1000000,
                "offer"=>980000,
                "categoria_id"=>1,
                "description"=>'  <div>
                                    <div>
                                      <h3>
                                        El colchón más premiado de Europa.
                                      </h3>
                                      <p>
                                        Calidad y comodidad excepcionales. Descansa con Emma y despierta lo mejor de ti.
                                      </p>
                                      <div>
                                        <ul>
                                          <li>
                                            <span>
                                              25 cm de comodidad premiada
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              25 cm de comodidad premiada
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              25 cm de comodidad premiada
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                ',
              ];

        //for ($i=0; $i < 528 ; $i++) {
        for ($i=0; $i < 5 ; $i++) {
          $price            =   rand(500000,1000000);

          $items["label"]           =     "Colchón ".$explode[rand(1,80)]." Original";
          $items["summary"]         =     "El ".$explode[rand(1,80)]." Original cambia el juego cuando se trata de mejorar el sueño.";
          $items["categoria_id"]    =  rand(1,3);
          $items["price"]           =   $price;
          $items["offer"]   =   $price-($price*15/100);
          $items["slug"]    =   Str::slug(($i+1). " - ".$items["label"]);
          $Products = Products::create($items);
          for ($i2=0; $i2 < 3 ; $i2++) {
            RelProductsCharacteristics::create([
              "products_id"=>$Products->id,
              "name"=>"Medidas",
              "valor"=>"Sencillo 0.90 x 1.90",
            ]);
          }
          for ($i2=0; $i2 < 2 ; $i2++) {
            RelProductsCharacteristics::create([
              "products_id"=>$Products->id,
              "name"=>"Incluye",
              "valor"=>($i2==0)?"1) colchón ortopédico":$i2.") regalo sorpresa",
            ]);
          }
          for ($i2=0; $i2 < 5 ; $i2++) {
            RelProductsCharacteristics::create([
              "products_id"=>$Products->id,
              "name"=>"Ficha",
              "valor"=>($i2==0)?"1) esta es la ficha del ortopédico":$i2.")  sorpresa",
            ]);
          }
          for ($i2=0; $i2 < 1 ; $i2++) {
            RelProductsCharacteristics::create([
              "products_id"=>$Products->id,
              "name"=>"Envio",
              "valor"=>($i2==0)?" El envío contiene y hay que estar pendiente de ":$i2." Pruebas",
            ]);
          }
          for ($i2=0; $i2 < 3 ; $i2++) {
            RelProductsMultimedia::create([
                                            "label"=>"Imagen de producto ".$i,
                                            "summary"=>"descripción #".$i2.' del producto '.$i,
                                            "products_id"=>$Products->id,
                                            "multimedia_id"=>rand(1,6),
                                            "order"=>$i2,
                                            "status"=>1,
                                          ]);
          }
        }
    }
}

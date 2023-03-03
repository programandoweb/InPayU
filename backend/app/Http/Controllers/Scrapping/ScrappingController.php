<?php

namespace App\Http\Controllers\Scrapping;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use HungCP\PhpSimpleHtmlDom\HtmlDomParser;
use App\Models\Scrapping;

class ScrappingController extends Controller
{

    public function getScrappingNew($id){
      try {

        $scrapping  = Scrapping::find($id);

        $json       = json_decode($scrapping->response);



        $ch       =   curl_init();
        $url      =   $json->url;
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $output   =   curl_exec($ch);
        $document =   HtmlDomParser::str_get_html($output);


        curl_close($ch);

        $item=[];

        foreach($document->find("section > div > div") as $article_title) {
            foreach (str_get_html( $article_title->outertext )->find("div") as $key => $value) {
              if (!empty($value->outertext)) {
                  $item[] = $value->outertext;
              }

            }

        }


        return response()->success(["scrap"=>$item,"html"=>$output], 'scraping Found');
      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }


    public function get(){
      try {

        // Initialize curl
        $ch = curl_init();

        $url= 'https://hireline.io/co/empleos?page=1';

        // URL for Scraping
        curl_setopt($ch, CURLOPT_URL,'https://hireline.io/co/empleos?page=1');

        // Return Transfer True
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);

        // Closing cURL
        //curl_close($ch);




        $document = HtmlDomParser::str_get_html($output);

        $num_vueltas   = 0;



        foreach ($document->find("section li a.transition-all") as $key => $value) {
          if (is_numeric(trim($value->plaintext))) {
            $num_vueltas = trim($value->plaintext);
          }
        }

        //p($num_vueltas);

        $return   = [];

        for ($i=0; $i < $num_vueltas ; $i++) {

          $url= 'https://hireline.io/co/empleos?page='.$i;


          if(!Scrapping::where("url","=",$url)->first()){

            // URL for Scraping

            curl_setopt($ch, CURLOPT_URL,$url);

            // Return Transfer True
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $output = curl_exec($ch);
            // Closing cURL


            $document = HtmlDomParser::str_get_html($output);

            foreach($document->find("a.w-full") as $article_title) {
              $item["url"]                =   $article_title->href;
              //$item["html_outertext"]     =   $article_title->outertext;
              $item["html_outertext"]     =    [];
              //foreach (str_get_html( $article_title->outertext )->find(".text-cornflower-blue") as $key => $value) {
              foreach (str_get_html( $article_title->outertext )->find("p") as $key => $value) {
                $item["html_outertext2"][]=$value->plaintext;
              }

              $return []                  =   [
                                                "url"=>$url,
                                                "scrapear"=>$item["url"],
                                                "response"=>json_encode($item)
                                              ];
              Scrapping::create([ "url"=>$url,
                                  "scrapear"=>$item["url"],
                                  "response"=>json_encode($item)]);
            }

          }



        }


        curl_close($ch);


        return response()->success([], 'scraping Found');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }

    public function getResult(){
      try {
          $scrapping = Scrapping::selectRaw(url_generator("id"))->where("status","=","standby")->paginate(env('RESULT_X_PAGE'));

          return response()->success($scrapping, 'scraping Found');
      } catch (\Exception $e) {
          return response()->error($e->getMessage(), $e->getCode());
      }

    }

    public function deleteResult( Request $request){
      try {
        Scrapping::where("id","=",$request->input("id"))->update(["status"=>"delete"]);

        return response()->success([], 'scraping Found');

      } catch (\Exception $e) {
        return response()->error($e->getMessage(), $e->getCode());
      }

    }
}

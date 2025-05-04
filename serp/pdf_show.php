<?php
require_once "tfpdf/tfpdf.php";
require_once "connect_to_db.php";
require_once "org.php";
require_once "models/all.php";

include_once "bootstrap.php";

use pChart\pDraw;
use pChart\pCharts;

$pdf = new tFPDF();

if(!isset($_GET['user_id'])) {
    $pdf->AddPage();

    $pdf->AddFont('TimesNewRoman','','TimesNewRoman.ttf',true);
    $pdf->SetFont('TimesNewRoman','',14);

    $pdf->Cell(40,10,'Нет номера пользователя для получения данных в системе!');
    $pdf->Output();
}
else{
    $org_id = getOrg($pdo, $_GET['user_id']);

    $sc = new Company();
    $wc = new Warehouse();
    $rc = new ResourceLink();
    $ric = new Resource();
    $snc = new Snapshot();

    $snapshots = $snc->getIf($pdo, "org_id = :id", ["id" => $org_id]);
    $resource_info = $ric->getIf($pdo, "org_id = :id", ["id" => $org_id]);

    $pdf->AddFont('TimesNewRoman','','TimesNewRoman.ttf',true);
    $pdf->SetFont('TimesNewRoman','',14);

    $pdf->AddPage();
    $pdf->MultiCell(0,10, "Данный отчёт является автогенерируемым посредством работы информационной системы SERP (Simple ERP). Любые странности в отчёте представлены лишь по причине неправильного функционирования системы и/или некорректного ввода данных пользователем.");


    $prices_values = [];
    $amounts_values = [];
    // $bplot = new BarPlot($data);

    foreach ($snapshots as $snapshot) {
        // listing => (suppliers => (warehouses => (resources)))
        $listing = json_decode($snapshot->listing);

        foreach ($listing as $supplier_id => $warehouses) {
            $pdf->AddPage();
            $supplier = $sc->getIf($pdo, "id = :id", ["id" => $supplier_id], true);
            $pdf->MultiCell(0, 10, "Поставщик: ".$supplier->name);
            foreach ($warehouses as $warehouse_id => $l_resources) {
                $warehouse = $wc->getIf($pdo, "id = :id", ["id" => $warehouse_id], true);
                foreach ($l_resources as $l_resource_id => $l_resource_info) {
                    $rlink = $rc->getIf($pdo, "id = :id", ["id" => $l_resource_id], true);
                    $resource = $ric->getIf($pdo, "id = :id", ["id" => $rlink->resources_id], true);
                    $pdf->MultiCell(0,10, "\n".$resource->name." в \"".$warehouse->name."\"\nКоличество ресурса: ".$l_resource_info->amount."\nЦена ресурса: ".$l_resource_info->price."\n\n");
                    @$amounts_values[$resource->name] ? null : $amounts_values[$resource->name] = [];
                    @$prices_values[$resource->name] ? null : $prices_values[$resource->name] = [];
                    array_push($amounts_values[$resource->name], $l_resource_info->amount);
                    array_push($prices_values[$resource->name], $l_resource_info->price);
                }
            }
        }
        // var_dump($amounts_values);
    }
    
    $pdf->AddPage();
    $pdf->MultiCell(0, 10, "Графики количества ресурсов за всё время:\n");
    $i = 0;
    foreach ($amounts_values as $name => $values) {
        // $pdf->MultiCell(0,10, $value);
        /* Create a pChart object and associate your dataset */ 
        $myPicture = new pDraw(700,230);

        $vals = ["04.05.2025" => $values[0], "05.05.2025" => $values[1]];
        /* Add data in your dataset */
        $myPicture->myData->addPoints($vals, "Serie1");
        $myPicture->myData->setAxisName(0, "Кол-во");
        
        $myPicture->myData->setAbscissaName($name);

        /* Choose a nice font */
        $myPicture->setFontProperties(["FontName"=>"serp/static/TimesNewRoman.ttf","FontSize"=>11]);

        /* Define the boundaries of the graph area */
        $myPicture->setGraphArea(60,40,670,190);

        /* Draw the scale, keep everything automatic */ 
        $myPicture->drawScale();

        /* Draw the scale, keep everything automatic */ 
        (new pCharts($myPicture))->drawSplineChart();

        /* Render the picture (choose the best way) */
        @$myPicture->render("serp/static/example$org_id$i.basic.png");

        $pdf->Image("serp/static/example$org_id$i.basic.png");
        $i++;
    }

    $pdf->AddPage();
    $pdf->MultiCell(0, 10, "Графики цен ресурсов за всё время:\n");
    $i = 0;
    foreach ($prices_values as $name => $values) {
        // $pdf->MultiCell(0,10, $value);
        /* Create a pChart object and associate your dataset */ 
        $myPicture = new pDraw(700,230);

        $vals = ["04.05.2025" => $values[0], "05.05.2025" => $values[1]];
        /* Add data in your dataset */
        $myPicture->myData->addPoints($vals, "Serie1");
        $myPicture->myData->setAxisName(0, "Кол-во");
        
        $myPicture->myData->setAbscissaName($name);

        /* Choose a nice font */
        $myPicture->setFontProperties(["FontName"=>"serp/static/TimesNewRoman.ttf","FontSize"=>11]);

        /* Define the boundaries of the graph area */
        $myPicture->setGraphArea(60,40,670,190);

        /* Draw the scale, keep everything automatic */ 
        $myPicture->drawScale();

        /* Draw the scale, keep everything automatic */ 
        (new pCharts($myPicture))->drawSplineChart();

        /* Render the picture (choose the best way) */
        @$myPicture->render("serp/static/2example$org_id$i.basic.png");

        $pdf->Image("serp/static/2example$org_id$i.basic.png");
        $i++;
    }


    $pdf->Output();
}


// $pdf->Image('', 10, 140, 100, 100);

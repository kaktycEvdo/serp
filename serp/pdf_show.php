<?php
require_once "tfpdf/tfpdf.php";
require_once "connect_to_db.php";
include_once "org.php";

$q = $pdo->prepare("SELECT * FROM resources");
$q->execute();
$q->fetchAll();

$pdf = new tFPDF();
$pdf->AddPage();

$pdf->AddFont('TimesNewRoman','','TimesNewRoman.ttf',true);
$pdf->SetFont('TimesNewRoman','',14);

$pdf->Cell(40,100,'Привет!');

$pdf->Output();
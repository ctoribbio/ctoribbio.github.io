<?php
$a[][]=" ";
$a[0][]="3-2";$a[0][]="5-3";$a[0][]="7-1";$a[0][]="0-2";
$a[][]="0-11";
$a[1][]=" ";$a[1][]="2-1";$a[1][]="1-0";$a[1][]="1-2";
$a[][]="0-0";
$a[2][]="1-3";$a[2][]=" ";$a[2][]="1-4";$a[2][]="2-0";
$a[][]="1-0";
$a[3][]="6-3";$a[3][]="14-3 ";$a[3][]=" ";$a[3][]="1-0";
$a[][]="1-1";
$a[4][]="2-3";$a[4][]="0-1 ";$a[4][]="1-1";$a[4][]="";
print ("<TABLE BORDER=2>");
for ($i=0;$i<5;$i++){
 print("<tr>");
 for($j=0;$j<5;$j++) {
 print("<td>".$a[$i][$j]."</td>");
 }
}
print("</table>");
?>
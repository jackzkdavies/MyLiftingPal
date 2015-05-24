var rm = [1, 0.95, 0.9, 0.88, 0.86, 0.83, 0.80, 0.78, 0.76, 0.75, 0.72, 0.70];

function rmcalc(){
    var w = document.getElementById("w").value;
    var r = document.getElementById("r").value;
    
    document.getElementById("rmResult").innerHTML=Number((w/(rm[r-1])).toFixed(2))+displayUnits;
}
//1	100
//2	95
//3	90
//4	88
//5	86
//6	83
//7	80
//8	78
//9	76
//10	75
//11	72
//12	70
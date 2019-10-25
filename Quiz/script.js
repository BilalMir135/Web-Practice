function check_answer(){
    let sum=0;
    let percentage=0;
    q1 = document.getElementById("option3");
    q2 = document.getElementById("option6");
    q3 = document.getElementById("option10");
    q4 = document.getElementById("option13");
    q5 = document.getElementById("option18");
    if(q1.checked){
        sum++;
        document.getElementById("ch1").innerHTML="&#10004";
        document.getElementById("ch1").style.color = "green";
    }
    else{
        document.getElementById("ch1").innerHTML="&#10006";
        document.getElementById("ch1").style.color = "red";
    }
    if(q2.checked){
        sum++;
        document.getElementById("ch2").innerHTML="&#10004";
        document.getElementById("ch2").style.color = "green";
    }
    else{
        document.getElementById("ch2").innerHTML="&#10006";
        document.getElementById("ch2").style.color = "red";
    }
    if(q3.checked){
        sum++;
        document.getElementById("ch3").innerHTML="&#10004";
        document.getElementById("ch3").style.color = "green";
    }
    else{
        document.getElementById("ch3").innerHTML="&#10006";
        document.getElementById("ch3").style.color = "red";
    }
    if(q4.checked){
        sum++;
        document.getElementById("ch4").innerHTML="&#10004";
        document.getElementById("ch4").style.color = "green";
    }
    else{
        document.getElementById("ch4").innerHTML="&#10006";
        document.getElementById("ch4").style.color = "red";
    }
    if(q5.checked){
        sum++
        document.getElementById("ch5").innerHTML="&#10004";
        document.getElementById("ch5").style.color = "green";
    }
    else{
        document.getElementById("ch5").innerHTML="&#10006";
        document.getElementById("ch5").style.color = "red";
    }
    document.getElementById("score").innerHTML = "Score =   "+sum;

    percentage = sum*100/5;
    if(percentage==100)
        document.getElementById("percentage").innerHTML = percentage+"%"+"      WELLDONE!";
    else
        document.getElementById("percentage").innerHTML = percentage+"%";
    if(percentage<50){
        document.getElementById("percentage").style.color = "red";
    }
    else
    document.getElementById("percentage").style.color = "green";
}
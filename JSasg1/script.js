function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function mult(a,b){
    return a*b;
}
function div(a,b){
    if(b===0)
        return "Cannot divide by zero";
    return a/b;
}

function calculate(){
    const val1= Number(document.getElementById("input1").value);
    const val2= Number(document.getElementById("input2").value);
    const op=document.getElementById("operation").value;
    let result;

    if(op==="add") result=add(val1, val2);
    else if(op==="sub") result=sub(val1,val2);
    else if(op==="mult") result=mult(val1,val2);
    else if(op==="div") result= div(val1,val2);

    document.getElementById("result").innerText = result;
}

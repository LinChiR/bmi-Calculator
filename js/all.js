var list = document.querySelector('.list');
var sendData = document.querySelector('.btn');
var str = '';
var data = JSON.parse(localStorage.getItem('listData')) || [];
sendData.addEventListener('click',addData,false)
list.addEventListener('click',del,false)
updataList(data);

function addData(e){
    e.preventDefault();
    var height = document.querySelector('#height').value;
    var weight = document.querySelector('#weight').value;
    var bmi = weight / ((height/100) * (height/100));
    var status = '';
    bmi = bmi.toFixed(2);

    if(bmi > 1 && bmi < 18.5){
        str = '過輕';
        sendData.setAttribute('class','btnThin');
        sendData.setAttribute('value',bmi+str);
        color = 'aqua'
    }
    else if(bmi >= 18.5 && bmi < 24.9){
        str = '理想';
        sendData.setAttribute('class','btnGood');
        sendData.setAttribute('value',bmi+str);
        color = 'green';
    }
    else if(bmi >= 24.9 && bmi < 29.9){
        str = '過重';
        sendData.setAttribute('class','btnLittleFat');
        sendData.setAttribute('value',bmi+str);
        color = 'gold';
    }
    else if(bmi >= 29.9 && bmi < 35){
        str = '輕度肥胖';
        sendData.setAttribute('class','btnFat');
        sendData.setAttribute('value',bmi+str);
        color = 'orange';
    }
    else if(bmi > 35){
        str = '重度肥胖';
        sendData.setAttribute('class','btnVeryFat');
        sendData.setAttribute('value',bmi+str);
        color = 'red';
    }
    var bodyCondition = {
        color: color,
        height: height,
        weight: weight,
        bmi: bmi,
        str: str
    }
    data.push(bodyCondition);
   updataList(data);
    localStorage.setItem('listData',JSON.stringify(data));
}

function updataList(data){
    var string  = '';
    var len = data.length;
    for (var i = 0; i < len; i++){
        string += '<li style = "border-left: 5px solid '+data[i].color+' ;margin-top: 20px;">';
        string += '<span style = "width: 100px; margin-left:20px; font-weight:bold; ">'+data[i].str+'</span>';
        string += '<span style = "width: 100px; margin-left:20px; font-weight:bold; "> BMI: '+data[i].bmi+' </span>';
        string += '<span style = "width: 100px; margin-left:20px; font-weight:bold; "> height: '+data[i].height+' cm </span>';
        string += '<span style = "width: 100px; margin-left:20px; font-weight:bold; "> weight: '+data[i].weight+' kg </span>';
        string += '<a href="#" data-index=' + i + ' />刪除</a>';
        string +=  '</li>';
    }
    list.innerHTML = string;

}

function del(e){
    if(e.target.nodeName !== 'A'){return}
    var index = e.target.dataset.index;
    data.splice(index,1);
    localStorage.setItem('listData',JSON.stringify(data));
    updataList(data);
}
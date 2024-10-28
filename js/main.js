let employeName = document.getElementById('EmployeName');
let position = document.getElementById('Position');
let inputsalery = document.querySelectorAll('#inputsalary input');
let department = document.querySelector('select');
let count = document.getElementById('count');
let tbody = document.getElementById('tbody');
let btn = document.querySelector('.btn');
let edit = document.getElementById('edit');
//table data
let emptytask = document.getElementById('emptytask');
let table = document.querySelector('table')
// clear all  item 
let clearAll = document.getElementById('clearall');
// model view data 
let model = document.getElementsByClassName('model');
let layout = document.getElementById('layout');
// complete update function 
let mood = 'create';
let tmp;
// valedition data 
let valedite = document.querySelectorAll('#span');
let inputs = document.querySelectorAll('input');
let valeditionError = false;

  
//-------------------------------------------------------
// function to check validition in input 
// function to check validition in string 
let validitionString = () =>
{
  for( let i=0 ; i < inputs.length; i++)
  {
    if(inputs[i].value.length==0){
      inputs[i].style.border=' solid 2px red';
     valedite[i].classList.remove('none');
     valeditionError= false;
     
    }else{
      valedite[i].classList.add('none');
      valeditionError=true;
     
    }
  }

} ;

for( let i=0 ; i < inputs.length; i++)
  {
    if(inputs[i].value.length==0){
      
     valeditionError= false;
     
    }else{
     
      valeditionError=true;
     
    }
    inputs[i].addEventListener('keyup',function(){
      if(inputs[i].value.length==0){
        inputs[i].style.border=' solid 2px red';
       valedite[i].classList.remove('none');
       valeditionError= false;
       
      }else{
        valedite[i].classList.add('none');
        valeditionError=true;
        inputs[i].style.border=' solid 2px green';
      }
     
    })
    
  }


// funcion for get total
function getTotal() {
  let gross = inputsalery[0].value
  let tax = inputsalery[1].value;
  let tarncost = inputsalery[2].value;
  let bouns = inputsalery[3].value;

  let taxx = +gross * (+tax / 100);
  let salaryaftertrancost = +gross - +tarncost - +taxx;
  let total = +salaryaftertrancost + +bouns;
  inputsalery[4].value = Math.ceil(+total);
}
// function to reset input 
let resetinput = () => {
  employeName.value = '';
  position.value = '';
  count.value = '';
  department.selectedIndex = 0;
  //inputsalery.forEach(input => input = '')
  inputsalery.forEach(input => input.value = '');

}




//عشان الارقام تظهر في الانبوت 
for (i = 0; i < inputsalery.length; i++) {
  inputsalery[i].addEventListener("keyup", getTotal);
}

//json
let all_proudect;
if (localStorage.myproudect == null) {
  all_proudect = [];
} else {
  all_proudect = JSON.parse(localStorage.getItem('myproudect'));
};
/* 
let all_proudect=localStorage.getItem('myproudect');
if(all_proudect==null){
  all_proudect=JSON.parse('all_proudect');
}else{
  all_proudect=[];
};*/

//fuction to creat object
let creatObject = () => {
  
  let new_producet = {
    employeName: employeName.value,
    position: position.value,
    gross: inputsalery[0].value,
    tax: inputsalery[1].value,
    tarncost: inputsalery[2].value,
    bouns: inputsalery[3].value,
    total: inputsalery[4].value,
    count: count.value,
    department: department.value
  }
  
if(valeditionError=true)
 {
  if (mood == 'create') {
    if (count.value <= 0 || count.value == '') {
      all_proudect.push(new_producet);
    } else {
      for (let i = 1; i <= count.value; i++) {
        all_proudect.push(new_producet);
      }
    }
  } else {
    all_proudect[tmp] = new_producet;
    mood = 'create';
    btn.innerHTML = `Create NEW employe`
    count.classList.remove('none');
    localStorage.setItem('myproudect', JSON.stringify(all_proudect));

    show_data();
    checkempty();
    resetinput();
   

  }
 }
 validitionString();
  //all_proudect.push(new_producet);

 
}



//----------------------------------------------
//function to create elemant in table

let show_data = () => {
  let row_table = '';
  for (let i = 0; i < all_proudect.length; i++) {

    row_table += `
   <tr>
   <th>${i + 1}</th>
   <th>${all_proudect[i].employeName}</th>
   <th>${all_proudect[i].position}</th>
   <th> <i onclick="viewOneitem(${i})" class="text-info fa-solid fa-eye"></i></th>
   <th><i onclick="removeOneitem(${i})" class="text-danger fa-solid fa-trash"></i></th>
   <th><i onclick="upDate(${i})" class="text-priamry fa-solid fa-pen-to-square"></i></th>
   </tr>
   `
  }

  tbody.innerHTML = row_table;


}
show_data();


// function to check empty emplyee 

let checkempty = () => {
  if (tbody.childElementCount == 0 || localStorage.length == 0 || all_proudect.length == 0) {
    emptytask.classList.remove('none');
    table.classList.add('none');
    clearAll.classList.add('none');

  } else {
    emptytask.classList.add('none');
    table.classList.remove('none');
    clearAll.classList.remove('none');
  }
};
checkempty();
//function to clear all 
let clearall = () => {
  if (confirm('are yousure to deleete all item ')) {
    localStorage.clear();
    clearAll.classList.add('none');
    // tbody.innerHTML+=``;
    all_proudect.splice(0);

    checkempty();
  } else {
    clearAll.classList.remove('none');

  }
  show_data();

}
clearAll.addEventListener('click', clearall);
//Remove one Item 

let removeOneitem = (i) => {
  //console.log(i);

  all_proudect.splice(i, 1);
  localStorage.setItem('myproudect', JSON.stringify(all_proudect));
  show_data();
  checkempty();
}
// view one itemData 
let viewOneitem = (i) => {
  layout.style.display = 'flex';
  layout.innerHTML = `
          <div class="card">
          <button onclick="closecard()" type="button" class="btn-close float-end btn-danger bg-danger" aria-label="Close"></button>
          <div class="card-body">
          <hr>
            <h6> Employe Name : ${all_proudect[i].employeName} </h6>
           <h6>position : ${all_proudect[i].position}</h6>
           <h6> Gross : ${all_proudect[i].gross}</h6>
           <h6>Tax : ${all_proudect[i].tax}</h6>
           <h6> TranCost : ${all_proudect[i].tarncost}</h6>
           <h6>Bouns: ${all_proudect[i].bouns}</h6>
           <h6> Total: ${all_proudect[i].total}</h6>
           <h6> Department : ${all_proudect[i].department}</h6>
            <hr>
          </div>
         </div>
`
}
// function to close card 
let closecard = () => {
  layout.style.display = "none";
  layout.innerHTML = ``;
}
//function to update data in table 
let upDate = (i) => {
  let selectemplyoo = all_proudect[i]; ///  هسأل البشمهندس عليها !!!

  employeName.value = selectemplyoo.employeName;
  position.value = selectemplyoo.position;
  inputsalery[0].value = selectemplyoo.gross;
  inputsalery[1].value = selectemplyoo.tax;
  inputsalery[2].value = selectemplyoo.tarncost;
  inputsalery[3].value = selectemplyoo.bouns;
  inputsalery[4].value = selectemplyoo.total;
  department.value = all_proudect[i].department;
  getTotal();
  //console.log(all_proudect.cost);
  count.classList.add('none');
  // edit.classList.remove('none');
  //btn.classList.add('none');
  mood = ' update ';
  tmp = i;
  btn.innerHTML = `UPDATE`
  scroll({
    top: 0,
    behavior: "smooth",
  })
}
// function to reset input 


btn.addEventListener('click', creatObject);


checkempty();

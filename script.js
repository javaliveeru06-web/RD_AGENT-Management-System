/* =========================
   RD MANAGEMENT SYSTEM
   FULL UPDATED SCRIPT
========================= */


/* LOAD SAVED CUSTOMERS */

let customers =
JSON.parse(
localStorage.getItem(
"customers"
)
) || [];



/* SAVE CUSTOMERS */

function saveCustomers(){

localStorage.setItem(

"customers",

JSON.stringify(customers)

);

}



/* =========================
   ADD CUSTOMER
========================= */

function addCustomer(){


const name =
document.getElementById(
"name"
).value;


const age =
document.getElementById(
"age"
).value;


const account =
document.getElementById(
"account"
).value;


const phone =
document.getElementById(
"phone"
).value;


const amount =
document.getElementById(
"amount"
).value;


const dueDate =
document.getElementById(
"dueDate"
).value;



/* VALIDATION */

if(

name=="" ||
age=="" ||
account=="" ||
phone=="" ||
amount=="" ||
dueDate==""

){

alert(
"Please fill all fields"
);

return;

}



/* CUSTOMER OBJECT */

const customer = {

name:name,

age:age,

account:account,

phone:phone,

amount:amount,

dueDate:dueDate,

status:"Pending"

};



/* PUSH DATA */

customers.push(customer);



/* SAVE */

saveCustomers();



/* RELOAD */

loadCustomers();

updateDashboard();

loadPaidTable();

loadPendingTable();

loadNotifications();



/* CLEAR INPUTS */

document.getElementById("name").value="";
document.getElementById("age").value="";
document.getElementById("account").value="";
document.getElementById("phone").value="";
document.getElementById("amount").value="";
document.getElementById("dueDate").value="";

}



/* =========================
   LOAD CUSTOMERS
========================= */

function loadCustomers(){


const table =
document.getElementById(
"customerTable"
);


if(!table)
return;



table.innerHTML = `

<tr>

<th>Name</th>

<th>Age</th>

<th>Account</th>

<th>Phone</th>

<th>Amount</th>

<th>Due Date</th>

<th>Status</th>

<th>Action</th>

</tr>

`;



customers.forEach((customer,index)=>{


table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.age}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>Rs.${customer.amount}</td>

<td>${customer.dueDate}</td>

<td>${customer.status}</td>

<td>


<button onclick="markPaid(${index})">

Paid

</button>


<button onclick="editCustomer(${index})">

Edit

</button>


<button onclick="deleteCustomer(${index})">

Delete

</button>


</td>

</tr>

`;

});

}



/* =========================
   MARK PAID
========================= */

function markPaid(index){

customers[index].status="Paid";

saveCustomers();

loadCustomers();

updateDashboard();

loadPaidTable();

loadPendingTable();

loadNotifications();

}



/* =========================
   DELETE CUSTOMER
========================= */

function deleteCustomer(index){

customers.splice(index,1);

saveCustomers();

loadCustomers();

updateDashboard();

loadPaidTable();

loadPendingTable();

loadNotifications();

}



/* =========================
   EDIT CUSTOMER
========================= */

function editCustomer(index){


customers[index].name =
prompt(
"Edit Name",
customers[index].name
);


customers[index].age =
prompt(
"Edit Age",
customers[index].age
);


customers[index].account =
prompt(
"Edit Account",
customers[index].account
);


customers[index].phone =
prompt(
"Edit Phone",
customers[index].phone
);


customers[index].amount =
prompt(
"Edit Amount",
customers[index].amount
);


customers[index].dueDate =
prompt(
"Edit Due Date",
customers[index].dueDate
);



saveCustomers();

loadCustomers();

updateDashboard();

}



/* =========================
   DASHBOARD UPDATE
========================= */

function updateDashboard(){


const totalCustomers =
customers.length;


const paidCustomers =
customers.filter(
c=>c.status=="Paid"
).length;


const pendingCustomers =
customers.filter(
c=>c.status=="Pending"
).length;



const totalCollection =

customers
.filter(
c=>c.status=="Paid"
)
.reduce(
(sum,c)=>
sum + Number(c.amount),
0
);



const remainingCollection =

customers
.filter(
c=>c.status=="Pending"
)
.reduce(
(sum,c)=>
sum + Number(c.amount),
0
);



/* DASHBOARD VALUES */

if(document.getElementById("total"))
document.getElementById(
"total"
).innerText=
totalCustomers;



if(document.getElementById("paid"))
document.getElementById(
"paid"
).innerText=
paidCustomers;



if(document.getElementById("pending"))
document.getElementById(
"pending"
).innerText=
pendingCustomers;



if(document.getElementById("collection"))
document.getElementById(
"collection"
).innerText=
"Rs."+totalCollection;



if(document.getElementById("remaining"))
document.getElementById(
"remaining"
).innerText=
"Rs."+remainingCollection;



/* REPORT VALUES */

if(document.getElementById("totalCustomers"))
document.getElementById(
"totalCustomers"
).innerText=
totalCustomers;



if(document.getElementById("paidCustomers"))
document.getElementById(
"paidCustomers"
).innerText=
paidCustomers;



if(document.getElementById("pendingCustomers"))
document.getElementById(
"pendingCustomers"
).innerText=
pendingCustomers;



if(document.getElementById("totalCollection"))
document.getElementById(
"totalCollection"
).innerText=
"Rs."+totalCollection;

}



/* =========================
   PAID TABLE
========================= */

function loadPaidTable(){


const table =
document.getElementById(
"paidTable"
);


if(!table)
return;



table.innerHTML = `

<tr>

<th>Name</th>

<th>Account</th>

<th>Phone</th>

<th>Amount</th>

</tr>

`;



customers.forEach(customer=>{

if(customer.status=="Paid"){

table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>Rs.${customer.amount}</td>

</tr>

`;

}

});

}



/* =========================
   PENDING TABLE
========================= */

function loadPendingTable(){


const table =
document.getElementById(
"pendingTable"
);


if(!table)
return;



table.innerHTML = `

<tr>

<th>Name</th>

<th>Account</th>

<th>Phone</th>

<th>Amount</th>

</tr>

`;



customers.forEach(customer=>{

if(customer.status=="Pending"){

table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.account}</td>

<td>${customer.phone}</td>

<td>Rs.${customer.amount}</td>

</tr>

`;

}

});

}



/* =========================
   NOTIFICATIONS
========================= */

function loadNotifications(){


const list =
document.getElementById(
"notificationList"
);


if(!list)
return;



list.innerHTML = "";


const today =
new Date();



customers.forEach(customer=>{


const dueDate =
new Date(customer.dueDate);



if(

customer.status=="Pending"
&&
dueDate <= today

){

list.innerHTML += `

<li>

🔔 ${customer.name}
payment overdue

<button
onclick="sendReminder('${customer.phone}','${customer.name}','${customer.amount}')">

Send

</button>

</li>

`;

}

});

}



/* =========================
   WHATSAPP REMINDER
========================= */

function sendReminder(
phone,
name,
amount
){

const message =

"Hello "+name+

", Your RD payment of Rs."+amount+

" is pending. Please pay soon.";


window.open(

"https://wa.me/91"+phone+

"?text="+

encodeURIComponent(message),

"_blank"

);

}



/* =========================
   SEARCH CUSTOMER
========================= */

function searchCustomer(){


const input =
document.getElementById(
"search"
);


const filter =
input.value.toUpperCase();


const table =
document.getElementById(
"customerTable"
);


const tr =
table.getElementsByTagName(
"tr"
);



for(let i=1;i<tr.length;i++){


const td =
tr[i].getElementsByTagName(
"td"
)[0];


if(td){

const txtValue =
td.textContent ||
td.innerText;


if(

txtValue.toUpperCase()
.indexOf(filter)>-1

){

tr[i].style.display="";

}
else{

tr[i].style.display="none";

}

}

}

}



/* =========================
   PAGE LOAD
========================= */

window.onload=function(){

loadCustomers();

updateDashboard();

loadPaidTable();

loadPendingTable();

loadNotifications();

};

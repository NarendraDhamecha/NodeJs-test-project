let list = document.getElementById("list");
let form = document.getElementById("form");
let button = document.getElementById("btn");
let itemName = document.getElementById("itemName");
let description = document.getElementById("description");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");

button.addEventListener("click", addItem);

async function addItem(e) {
  e.preventDefault();

  let obj = {
    itemName: itemName.value,
    description: description.value,
    price: price.value,
    quantity: quantity.value,
  };

  try {
    let res = await axios.post("http://localhost:3000/items", obj);
    showOnScreen(res.data);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await axios.get("http://localhost:3000/items");

    for (let i = 0; i < res.data.length; i++) {
      showOnScreen(res.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

function showOnScreen(user) {
  itemName.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";

  let child = `<li id=${user.id}> ${user.item} - ${user.description} - ${user.price} - ${user.quantity}
                 <button onclick=buyItem('${user.id}','one','${user.quantity}','${user.item}','${user.description}','${user.price}')>Buy One</button>
                 <button onclick=buyItem('${user.id}','two','${user.quantity}','${user.item}','${user.description}','${user.price}')>Buy Two</button></li>`;

  list.innerHTML = list.innerHTML + child;
}

async function buyItem(id, buyCount, quantity, item, description, price) {

  const obj = {
    quantity: buyCount === 'one' ? Number(quantity) - 1 : Number(quantity) - 2 
  }

  let obj1 = {
    item,
    description,
    price,
    quantity
  }
  
  try {
    let res = await axios.put(`http://localhost:3000/items/${id}`, obj)

  } catch (err) {
    console.log(err);
  }
}

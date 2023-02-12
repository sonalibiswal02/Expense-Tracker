let bal = 0;
let inc = 0;
let exp = 0;

var hastory = [];
function onSub(event) {
  event.preventDefault();
  //document.getElementById('desc').style.backgroundColor="red";
  // let desc1=document.getElementsByClassName('desc1');
  let desc = document.querySelector("#desc").value;
  let amount = document.querySelector("#amt").value;

  let type = document.querySelector('input[type="radio"]:checked').value;
  console.log(typeof desc, typeof amount, type);

  //console.log(history);
  //alert('Your form has been submitted');
  function abc(d, a) {
    if (d == "") {
      alert("desc missing");
      return false;
    }
    if (a == "") {
      alert("amount missing");
      return false;
    }
    return true;
  }
  if (abc(desc, amount)) {
    amount = Number(amount);

    if (type == "income") {
      inc = inc + amount;
      bal = bal + amount;

      document.querySelector("#income-number").innerHTML =
        "$ " + Math.round((inc + Number.EPSILON) * 100) / 100;
    }
    if (type == "expense") {
      exp = exp + amount;
      bal = bal - amount;
      document.querySelector("#expense-number").innerHTML =
        "$ " + Math.round((exp + Number.EPSILON) * 100) / 100;
    }
    document.querySelector("#bal-amt").innerHTML =
      "$ " + Math.round((bal + Number.EPSILON) * 100) / 100;
    document.querySelector("#desc").value = "";
    document.querySelector("#amt").value = "";
    hastory.push({
      description: desc,
      amount: Math.round((amount + Number.EPSILON) * 100) / 100,
      select: type,
    });

    let histList = "";
    hastory.forEach((transaction, ind) => {
      histList += `<li class="${
        transaction.select == "income" ? "good" : "bad"
      }"><span class="dex">${transaction.description}</span>
    <span class="anx">${
      transaction.amount
    }</span><button onclick="del(event)" > X </button></li>`;
    });
    console.log(hastory);
    document.querySelector("#his").innerHTML = histList;
  }
}
function del(event) {
  let selectedCross = event.target;

  let selectedItem = selectedCross.parentElement;

  let x = {
    description: selectedItem.querySelector(".dex").textContent,
    amount: Number(selectedItem.querySelector(".anx").textContent),
    select: selectedItem.classList[0] == "good" ? "income" : "expense",
  };

  //   let y = hastory.map((trans) => {
  //     if (JSON.stringify(x) !== JSON.stringify(trans)) {
  //       return trans;
  //     }
  //   });
  let y = hastory.filter((trans) => {
    if (JSON.stringify(x) !== JSON.stringify(trans)) {
      return true;
    }
    return false;
  });

  console.log(hastory, y);
  hastory = y;
  selectedItem.remove();
}

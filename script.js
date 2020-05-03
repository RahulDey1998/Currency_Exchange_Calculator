const currencyElement_1 = document.querySelector('#currency-1');
const currencyElement_2 = document.querySelector('#currency-2');
const amountElement_1= document.querySelector('#amount-1');
const amountElement_2= document.querySelector('#amount-2');

const rateElement = document.querySelector('#rate');
const swap = document.querySelector('#swap');

//Fetch exchange rate and update the DOM
function calculate()
{
   const curr1 = currencyElement_1.value;
   const curr2 = currencyElement_2.value;
   const amount1 = amountElement_1.value;
   const amount2 = amountElement_2.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${curr1}`)
   .then(res => res.json())
   .then(data => 
    {
        const rate = data.rates[curr2];
        const amnt2= (amount1 * rate).toFixed(3);
        rateElement.innerText = `1 ${curr1} = ${rate} ${curr2}`;
        amountElement_2.value = amnt2;
        // const timer = setInterval(() =>
        // {
        //     amountElement_2.value = i.toFixed(2);
        //     i = i+1;
        //     if(Math.round(i) === Math.round(amnt2))
        //     {
        //         clearInterval(timer);
        //         amountElement_2.value = amnt2;
        //     }
        // } , 2);
    });  
}

function swapValues()
{
    let temp = currencyElement_1.value;
    currencyElement_1.value = currencyElement_2.value;
    currencyElement_2.value = temp;
    calculate();
}

//Event Listener 
currencyElement_1.addEventListener('change' , calculate);
amountElement_1.addEventListener('input' , calculate);
currencyElement_2.addEventListener('change' , calculate);
amountElement_2.addEventListener('input' , calculate);
swap.addEventListener('click' , swapValues);

calculate();
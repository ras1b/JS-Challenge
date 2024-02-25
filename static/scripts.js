const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

// Create a List for Stocks and append them in the DOM
function listStock(stock){
  for (var i = 0; i < stock.array.length; i++){
    var list = stock.array[i];
    
    list = document.createElement('li');
    document.getElementByClass('stocks').appendChild(list);
  }  
 }

 // Method to Fetch a Stocks Data
 async function fetchStockData(symbol) {
  try {
    const response = await fetch(`/stocks/${symbol}`);
    if (!response.ok) {
      throw new Error(`Network response was not OK for stock symbol ${symbol}`); 
    }
    const data = await response.json();
    console.log(`Data for ${symbol}:`, data);
    console.log(`${symbol}: Data fetched successfully`); // Success message
  } catch (error) {
    console.error(`Failed to fetch data for stock ${symbol}:`, error); // No data found
  }
}

// Method to Fetch All Stock Data
async function fetchStocks() {
  try {
    const response = await fetch('/stocks');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Create Unordered List with all Stocks
    const fetchPromises = data.stockSymbols.map(symbol => {
      const li = document.createElement('li');
      li.textContent = symbol;
      document.querySelector('.stocks ul').appendChild(li);
      return fetchStockData(symbol);
    });
  
    await Promise.all(fetchPromises);

    // Execute task to Hide spinner
    document.querySelector('.spinner').style.display = 'none'; // Hide spinner
    
    // Display success message
    document.getElementById('successMessage').style.display = 'block';
    
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
  }
}

fetchStocks();   //initialisation
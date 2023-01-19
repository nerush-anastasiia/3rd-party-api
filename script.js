const tableColumns = ['symbol', 'name', 'priceUsd', 'volumeUsd24Hr', 'marketCapUsd'] /* Mapping the table columns to the API object keys. */
const tableBodyElem = document.getElementById('table-body') /* Getting the table body DOM element. */

const requestData = () => {
    /* Function to fetch the data from the API. 
    This section has been adapted from code shared in class during Week 3. I changed the link to the API to fit my case. */
    fetch('https://api.coincap.io/v2/assets', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        /* Sends the array of cryptocurrency data to the buildTableRows functio. */
        buildTableRows(res.data);
    })
    .catch(error => console.log(error))
    /* Logs errors to the console. */
};

let buildTableRows = (tableData) => {
    /* Extracts the cyptocurrency data from the API, places it into tr DOM elements, and places those elements inside the tbody DOM element. */
    var tableRow;
    var cellData;
    tableData.forEach((row) => {
        /* Starts a loop for each item in the cryptocurrency array. */
        tableRow = document.createElement('tr');
        tableColumns.forEach((columnName) => {
            /* Starts a loop for each column. */
            cellData = document.createElement('td');
            cellData.classList.add('table-cell');
            /* Here I learned how to define if a value is a number or not:
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN. */
            if (((typeof row[columnName]) === 'number') || !isNaN(parseInt(row[columnName]))) {
                /* Checks to see if the cell data contains a number. */
                if (columnName === 'priceUsd') {
                    /* Here I learned how to check if the cell data contains a number because the API I decided to use contained all its data being string:
                    https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/. */
                    cellData.innerHTML = parseFloat(row[columnName]).toFixed(2);
                    /* Here I reminded myself of how to truncate the number to 2 decimal points:
                     https://www.w3schools.com/jsref/jsref_tofixed.asp. */
                } else {
                    cellData.innerHTML = parseInt(row[columnName]);
                    /* Converts the string to a whole number (an integer). */
                };
            } else {
                cellData.innerHTML = row[columnName];
            };
            tableRow.appendChild(cellData);
            /* Adds the cell to the table row. */
        });
        tableBodyElem.appendChild(tableRow)
        /* Adds the table row to the table body. */
    });
};

requestData();
/* Calls the function to request the API data. */

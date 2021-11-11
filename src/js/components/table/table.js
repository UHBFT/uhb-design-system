export default () => {
  // Nodelist of all responsive tables
  const tables = document.querySelectorAll('.uhb-c-table--responsive');

  /**
   * 
   * @param {HTMLElement} table resposnive table
   */
  const buildResponsiveTable = ((table) => {
    // Nodelist of all th and tbody tr elements in table
    const tableHeadings = table.querySelectorAll('th');
    const tableRows = table.querySelectorAll('tbody tr')

    tableRows.forEach((row) => {
      // Nodelist of all table cells in a row
      const tableCells = row.querySelectorAll('td');

      tableCells.forEach((cell, index) => {
        // Create responsive table cell element
        const responsiveCell = document.createElement('span');
        responsiveCell.classList.add('uhb-c-table__responsive-cell');

        // Add class and heading attribute to cell
        cell.classList.add('uhb-c-table__responsive-heading');
        cell.setAttribute('data-table-heading', tableHeadings[index].innerText);

        // loop through last child in cell, clone node, append to responsivbe
        // cell and remove from DOM 
        while (cell.firstChild) {
          const content = cell.lastChild.cloneNode(true);
          responsiveCell.prepend(content);
          cell.removeChild(cell.lastChild);
        }

        // Append responsive cell with content to the cell
        cell.append(responsiveCell);
      })
    })
  })
  
  // Check if there are any responsive tables
  if (tables.length) {
    tables.forEach((table) => {
      buildResponsiveTable(table);
    })
  }
};

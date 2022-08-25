//generate a card element for each employee entered, return to loopThroughData
function generateEmployee(templateData){
  // Method to get last key and value in an object found here - https://bobbyhadz.com/blog/javascript-get-last-item-in-object#:~:text=To%20get%20the%20last%20item,keys(obj).
  const lastKey = Object.keys(templateData).pop();
  const lastValue = Object.values(templateData).pop();
  return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h4 class="card-title">${templateData.name}</h4>
            <h4 class="card-subtitle mb-2">${templateData.constructor.name}</h4>
            <h5 class="card-subtitle mb-2">ID: ${
              templateData.id
            }</h5>
            <h5 class="card-subtitle mb-2">Email: <a href ="mailto:${
              templateData.email
            }" class="card-link" target="_blank">${templateData.email}</a></h5>
            <h5>${roleSpecific(
              templateData.constructor.name,
              lastValue
            )}</h5>
        </div>
    </div>`;
};
//able to return card template for each employee entered
function loopThroughData(templateData){
    var cards = [];
    for (var i = 0; i < templateData.length; i++){
        var card = generateEmployee(templateData[i]);
        cards.push(card);
    }
    //remove comma between elements before returning HTML template
    cards = cards.join();
    cards = cards.replace(/,/g, '');
    return cards;

}
//add role specific information to the end of each card
function roleSpecific(role, value){
    if (role === "Manager"){
        return("Office number: " + value);
    }
    if (role === "Engineer"){
        return 'GitHub: <a href="https://github.com/' + value + '" target="_blank">' + value + '</a>';
    }
    if (role === "Intern"){
        return("School: " + value);
    }
}
// main HTML template
module.exports = templateData => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
    <header class="p-3 mb-2 bg-primary text-white">My Team</header>
    <main>
        ${loopThroughData(templateData)}
    </main>
    </body>
    <html>
    `;
}
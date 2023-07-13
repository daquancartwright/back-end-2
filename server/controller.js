// Create a variable that requires your controller file
const houses = require('./db.json')
let houseId = 4

// Set up a module with the following Signatures: getHouses, deleteHouse, createHouse, updateHouse
module.exports = {
    // Send all the houses in the houses db to the front-end
    getHouses: (req, res) => res.status(200).send(houses),

    // Find the index of the house in the houses db whose id correlates to the id passed in as a parameter on your endpoint
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: houseId,
            address,
            price,
            imageURL
        }

        // Add your new newHouse object to your houses db using push
        houses.push(newHouse)
        // Send all your houses to the front end so that the view can be updated to include your new house
        res.status(200).send(houses)
        // Increment your variable tracking your upcoming house id
        houseId++
    },

    updateHouse: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        // Iterate through the houses array and locate the house with the correct id
        let index = houses.findIndex(elem => +elem.id === +id)

        // Use a sequence of conditional checks to see if the type is 'minus' or 'plus', then decrease or increase the price of the house by $10,000
        if (houses[index].price <= 10000 && type === 'minus') {
            houses[index].price = 0
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}

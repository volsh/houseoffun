export default (isChief) => {
    const vehicles = {
        BIRD_SCOOTER: "Big scooter",
        MERKAVA_TANK: "Merkava tank",
    }
    return isChief ? {...vehicles, EGGED_BUS: "Egged bus"} : vehicles
}
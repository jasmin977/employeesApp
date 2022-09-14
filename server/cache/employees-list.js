
let employesState = [];

const CHECK_TIMEOUT = 1000 * 60;
const CHECK_INTERVAL = 1000;    

function addToCache(socket_id, user) {
    const index = employesState.findIndex(u => u.id=== user.id)
    if(index!== -1) return
    employesState.push({user, socket_id})
}
function removeFromCache()
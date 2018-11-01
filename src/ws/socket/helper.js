let rooms = []
// [{id: 'roomId', joiners: [user1Id, user2Id]}, ...]

function compare(inRoom, joiners) {
  return (
    inRoom.every(i => joiners.includes(i))
    &&
    joiners.every(i => inRoom.includes(i))
  )
}

module.exports = {
  getUser: (soc) => {
    return soc.user
  },
  getRoom: (id) => {
    return rooms.find(i => i.id === id)
  },
  getRoomsByUser: (id) => {
    const filters = rooms.filter(i => i.joiners.includes(id))
    return filters.map(i => i.id)
  },
  getRoomByJoiners: (joiners) => {
    return rooms.find(i => compare(i.joiners, joiners))
  },
  addRoom: (joiners) => {
    const id = `channel.${rooms.length}`
    rooms.push({
      id,
      joiners
    })
    return id
  },
  removeRoom: (item) => {
    if (Array.isArray(item)) {
      rooms = rooms.filter(i => !compare(i.joiners, item))
    } else {
      rooms = rooms.filter(i => i.id !== item)
    }
  }
}
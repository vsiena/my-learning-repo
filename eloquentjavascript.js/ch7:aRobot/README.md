# Chapter notes

### Meadowfield

```javascript
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
```

The network of roads in the village forms a `graph`. A graph is a collection of points (places in the village) with lines between them (roads).

```javascript 
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
```
Given an array of edges, buildGraph creates a map object that, for each node, stores an array of connected nodes.

### The task

let’s condense the village’s state down to the minimal set of values that define it. There’s the robot’s current location and the collection of undelivered parcels, each of which has a current location and a destination address. That’s it.

While we’re at it, let’s make it so that we don’t `change` this state when the robot moves but rather compute a `new` state for the situation after the move.

```javscript
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}
```

The `move` method is where the action happens. It first checks whether there is a road going from the current place to the destination, and if not, it returns the old state, since this is not a valid move.

Next, the method creates a new state with the destination as the robot’s new place. It also needs to create a new set of parcels—parcels that the robot is carrying (that are at the robot’s current place) need to be moved along to the new place. And parcels that are addressed to the new place need to be delivered—that is, they need to be removed from the set of undelivered parcels. The call to `map` takes care of the moving, and the call to `filter` does the delivering.

Parcel objects aren’t changed when they are moved but re-created. The `move` method gives us a new village state but leaves the old one entirely intact.
```javascript
let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office
```
The move causes the parcel to be delivered, which is reflected in the next state. But the initial state still describes the situation where the robot is at the post office and the parcel is undelivered.

### Persistent data

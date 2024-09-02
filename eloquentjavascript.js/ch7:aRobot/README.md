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

Data structures that don't change are called `immutable` or `persistent`. They behave a lot like strings and numbers in that they are who they are and stay the way, rather than containing different things at different times. 

There is a function called `Object.freeze` that changes an object so that writing to its properties is ignored.

```javascript
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5
```

### Simulation

Because we want robots to be able to remember things so they can make and execute plans, we also pass them their memory and allow them to return a new memory. Thus, the thing a robot returns is an object containing both the direction it wants to move in and a memory value that will be given back to it the next time it is called.

```javascript
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
```

What is the dumbest strategy that could possibly work? The robot could just walk in a random direction every turn. That means, with great likelihood, it will eventually run into all parcels and then also at some point reach the place where they should be delivered.

Here's what that could look like:
```javascript
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
```

Remember that `Math.random()` returns a number between 0 and 1—but always below 1. Multiplying such a number by the length of an array and then applying `Math.floor` to it gives us a random index for the array.

Since this robot does not need to remember anything, it ignores its second argument (remember that JavaScript functions can be called with extra arguments without ill effects) and omits the memory property in its returned object.

To put this sophisticated robot to work, we’ll first need a way to create a new state with some parcels. A static method (written here by directly adding a property to the constructor) is a good place to put that functionality.

```javascript
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};
```

We don’t want any parcels to be sent from the same place that they are addressed to. For this reason, the `do` loop keeps picking new places when it gets one that’s equal to the address.

Let’s start up a virtual world.
```javascript
runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns
```
It takes the robot a lot of turns to deliver the parcels because it isn’t planning ahead very well. We’ll address that soon.

### The mail truck’s route

We should be able to do a lot better than the random robot. An easy improvement would be to take a hint from the way real-world mail delivery works. If we find a route that passes all places in the village, the robot could run that route twice, at which point it is guaranteed to be done. Here is one such route (starting from the post office):

```javascript 
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
```

To implement the route-following robot, we’ll need to make use of robot memory. The robot keeps the rest of its route in its memory and drops the first element every turn.

```javascript
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
```
This robot is a lot faster already. It’ll take a maximum of 26 turns (twice the 13-step route) but usually less.

```javascript 
runRobotAnimation(VillageState.random(), routeRobot, []);
```

### Pathfinding

Since we are mostly interested in the shortest route, we want to make sure we look at short routes before we look at longer ones. A good approach would be to “grow” routes from the starting point, exploring every reachable place that hasn’t been visited yet until a route reaches the goal. That way, we’ll explore only routes that are potentially interesting, and we know that the first route we find is the shortest route (or one of the shortest routes, if there are more than one).

```javascript
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}
```
The exploring has to be done in the right order—the places that were reached first have to be explored first. We can’t immediately explore a place as soon as we reach it because that would mean places reached from there would also be explored immediately, and so on, even though there may be other, shorter paths that haven’t yet been explored.

Therefore, the function keeps a work list. This is an array of places that should be explored next, along with the route that got us there. It starts with just the start position and an empty route.

The search then operates by taking the next item in the list and exploring that, which means it looks at all roads going from that place. If one of them is the goal, a finished route can be returned. Otherwise, if we haven’t looked at this place before, a new item is added to the list. If we have looked at it before, since we are looking at short routes first, we’ve found either a longer route to that place or one precisely as long as the existing one, and we don’t need to explore it.

You can visualize this as a web of known routes crawling out from the start location, growing evenly on all sides (but never tangling back into itself). As soon as the first thread reaches the goal location, that thread is traced back to the start, giving us our route.

Our code doesn’t handle the situation where there are no more work items on the work list because we know that our graph is connected, meaning that every location can be reached from all other locations. We’ll always be able to find a route between two points, and the search can’t fail.

```javascript
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
```

This robot uses its memory value as a list of directions to move in, just like the route-following robot. Whenever that list is empty, it has to figure out what to do next. It takes the first undelivered parcel in the set and, if that parcel hasn’t been picked up yet, plots a route toward it. If the parcel has been picked up, it still needs to be delivered, so the robot creates a route toward the delivery address instead.

Let’s see how it does.
```javascript
runRobotAnimation(VillageState.random(), goalOrientedRobot, []);
```

This robot usually finishes the task of delivering 5 parcels in about 16 turns. That’s slightly better than routeRobot but still definitely not optimal. We’ll continue refining it in the exercises.


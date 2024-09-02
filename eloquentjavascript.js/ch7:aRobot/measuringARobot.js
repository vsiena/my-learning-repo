/*
It’s hard to objectively compare robots by just letting 
them solve a few scenarios. Maybe one robot just happened to get 
easier tasks or the kind of tasks that it is good at, 
whereas the other didn’t.

Write a function compareRobots that takes two robots 
(and their starting memory). It should generate 100 tasks 
and let both of the robots solve each of these tasks. 
When done, it should output the average number of 
steps each robot took per task.

For the sake of fairness, make sure you give 
each task to both robots, rather than generating 
different tasks per robot.

*/

/* 
Hint:

You’ll have to write a variant of the runRobot function that, 
instead of logging the events to the console, 
returns the number of steps the robot took to complete the task.

Your measurement function can then, in a loop, 
generate new states and count the steps each of 
the robots takes. When it has generated enough measurements, 
it can use console.log to output the average for each robot, 
which is the total number of steps taken divided by the 
number of measurements.
*/

const { goalOrientedRobot } = require('./aRobot.js')
const { routeRobot } = require('./aRobot.js')
const { VillageState } = require('./aRobot.js')

function countSteps(state, robot, memory) {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length == 0) return steps;
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}
function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++){
        let state = VillageState.random();
        total1 += countSteps(state, robot1, memory1);
        total2 += countSteps(state, robot2, memory2)
    }
    console.log(`Robot 1 needed ${total1 / 100} steps per task`)
    console.log(`Robot 2 needed ${total2 / 100}`)
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
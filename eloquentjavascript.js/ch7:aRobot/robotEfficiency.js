/* 
Can you write a robot that finishes the delivery task faster than goalOrientedRobot? 
If you observe that robot’s behavior, what obviously stupid things does it do? 
How could those be improved?

If you solved the previous exercise, 
you might want to use your compareRobots function to verify 
whether you improved the robot.
*/

/*
Hint:
The main limitation of goalOrientedRobot is that it considers only one parcel at a time. 
It will often walk back and forth across the village because the parcel it 
happens to be looking at happens to be at the other side of the map, even if there are others much closer.

One possible solution would be to compute routes for all packages 
and then take the shortest one. Even better results can be obtained, 
if there are multiple shortest routes, by preferring the ones that go 
to pick up a package instead of delivering a package.
*/

// Your code here

runRobotAnimation(VillageState.random(), yourRobot, memory);
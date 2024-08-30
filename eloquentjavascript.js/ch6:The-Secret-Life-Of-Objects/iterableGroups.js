/*

Make the Group class from the previous exercise iterable.
Refer to the section about the iterator interface earlier in the chapter
if you aren't clear on the exact form of the interface anymore. 

If you use an array to represent the group's members, 
don't just return the iterator created by 
calling the Symbol.iterator method on the array.
That would work, but it defeats the purpose of this exercise. 

It is okay if your iterator behaves strangely 
when the group is modified during the iteration.

*/

// Your code here (and the code from the previous exercies)
class Group {
    // Your code here
    #members = [];
    add(value){
        if(!this.has(value)){
            this.#members.push(value);
        }
    }
    delete(value){
        this.#members = this.#members.filter(v => v !== value);
    }
    has(value){
        return this.#members.includes(value);
    }
    static from(collection){
        let group = new Group;
        for (let value of collection){
            group.add(value);
        }
        return group;
    }
    [Symbol.iterator]() {
        return new GroupIterator(this.#members);
    }
}

class GroupIterator{
    #members
    #position

    constructor(members){
        this.#members = members;
        this.#position = 0;
    }
    next() {
        if (this.#position >= this.#members.length){
            return {done: true};
        } else {
            let result = {value: this.#members[this.#position], done: false};
            this.#position++
            return result;
        }
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// -> a
// -> b
// -> c
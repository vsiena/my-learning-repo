type Check = (n: number, y?: any) => any;

const addthre: Check = (r) => {
    return r + 3;

}

const addFourString: Check = (r) => {
    return r + "4"
}

console.log(addthre(4),addFourString(4))
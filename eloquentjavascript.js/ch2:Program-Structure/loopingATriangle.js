/* Write a loop that makes seven calls to console.log to output the following triangle: 
#
##
###
####
#####
######
#######
*/
let block = "#";
for (let i = 0; i <= 6; i++){
    console.log(block)
    block = block + "#"
}
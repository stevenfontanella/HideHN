"use strict"

const getTitle = (athing) => {
    return athing.querySelector(".title>a").innerHTML
}

/**
 * get next `count` nodes after a node
 */
const nextElems = (elem, count) => {
    const ret = [elem]

    // TODO: could maybe clean up this iteration logic
    let curr = elem;
    for(const _ of Array(count).keys()) {
        curr = curr.nextSibling
        ret.push(curr)
    }

    return ret
}

const shouldFilter = (athing) => {
    return fetch("http://localhost:3000/?abc=the%20quick%20brown%20fox")
          .then(data => data.json())
    // ret.then(data => {
    //     console.log(data)
    //     console.log(data.json().filter)
    //     data.json().filter})

    return ret
}

/** Remove a post 
 * @param  {Node} athing an .athing class element
 */
const remove = (athing) => {
    for(const elem of nextElems(athing, 4)) {
        elem.parentNode.removeChild(elem)
    }
}

function* reverseCollection(collection) {
    for(let i = collection.length-1; i >= 0; --i ) {
        yield collection[i]
    }
}

const things = document.getElementsByClassName("athing")

for(const thing of reverseCollection(things)) {
    const title = getTitle(thing)
    shouldFilter(thing)
        .then(should => {
            console.log(should.filter)
            if(should.filter)
                remove(thing)
        })
//     if(shouldFilter(thing)) {
//         remove(thing)
//     }
// }
}


fetch("http://localhost:3000/?abc=the%20quick%20brown%20fox")
   .then(data => data.json())
   .then(json => {console.log(json)})

// a = fetch("http://localhost:3000/?abc=the%20quick%20brown%20fox")
//     .then(data => data.json())
//     .then(json => {console.log(json.filter)})

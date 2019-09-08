"use strict"
console.log("Loaded HideHN")

const root = "https://eutpj14kkj.execute-api.us-west-2.amazonaws.com/prod/"

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

/**
 * path - a domain i.e. google.com
 * params - an array of ids to include in the uri
 */
const buildUri = (path, ids) => {
    if(path[path.length - 1] != '/') {
        path += '/'
    }

    if(ids.length === 0) {
        return path
    }

    let query = [`?id=${ids[0]}`]
    for(const id of ids.slice(1)) {
        query.push(`&id=${id}`)
    }

    return path + query.join("")
}

/**
 * take in a list of ids and return a list of bools, where `true` means the post should be filtered
 */
const shouldFilter = (idList) => {
    let uri = buildUri(root, idList)
    return fetch(uri)
        .then(data => {
            return data.text()
        })
        .catch(error => console.log(`Promise returned error ${error}`))
}

/** Remove a post
 * @param  {Node} athing an .athing class element
 */
const remove = (athing) => {
    for(const elem of nextElems(athing, 4)) {
        elem.parentNode.removeChild(elem)
    }
}

function* reverse(collection) {
    for(let i = collection.length-1; i >= 0; --i ) {
        yield collection[i]
    }
}

function* zip(...iters) {
    while(true) {
        let ret = []
        for(const iter of iters) {
            let val = iter.next()
            if(val.done) {
                return
            }

            ret.push(val.value)
        }
        yield ret
    }
}

const things = Array.from(reverse(document.getElementsByClassName("athing")))
const ids = things.map(thing => thing.id)

shouldFilter(ids)
    .then(preds => {
        let predList = JSON.parse(preds)
        let numFiltered = 0
        for(const [thing, pred] of zip(things.values(), predList.values())) {
            if(pred) {
                numFiltered ++
                remove(thing)
            }
        }
        console.log(`Filtered ${numFiltered} posts`)
    })

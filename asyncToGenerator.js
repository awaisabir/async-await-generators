const fetch = require("node-fetch");


// async function
const asyncActivity = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const result = await response.json();

    return result;
}

asyncActivity().then(result => console.log(`Original async/await Function: ${JSON.stringify(result)}`));


// basic generator
function * generator() {
    for (let i=0; i<5; i++) {
        yield i;
    }
}

const gen = generator();

console.log(`\n\n=============================`);
console.log(`GENERATOR DEMO WITH ITERATOR CALLS`);

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

console.log(`=============================\n\n`);

// implementing async/await with generators

const asyncPolyfill = (generator) => {
    const iterator = generator();

    const evaluateGenerator = (args) => {
        const result = iterator.next(args);

        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(evaluateGenerator);
        }
    };

    return evaluateGenerator();
};

function * asyncGenerator() {
    const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
    const result = yield response.json();

    console.log(`Generator Implementation: "${JSON.stringify(result)}"`);
}

asyncPolyfill(asyncGenerator);
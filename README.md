typescript-module-factory-pattern
===

An example showing how to implement a module factory pattern when using Typescript.

(See the note at the bottom about whether this is actually a sensible thing to do!)

## Rationale

There is a well used pattern in JavaScript that allows one to load and initialise a module of code and inject dependencies, without the use of Classes, DI containers or anything that might be considered hacky.

The module exports only a top level function - the "factory" - which accepts dependencies as its arguments. When run, the factory returns an inner function (or object containing a set of functions). These inner functions have access to the top level function's arguments as a natural result of Javascript's support for closures.

The main reason to use a pattern like this is to avoid tight-coupling of dependencies, meaning that modules can be supplied with ready-instantiated dependencies, and that they can easily be swapped out if a module is tested in isolation.

```js
// logger.js
module.exports = function() {
    return {
        info: function() {
          console.log(...arguments);
        }
    }
}


// calc.js
module.exports = function(logger) {
    return {
        sum,
    }

    function sum(a, b) {
        logger.info(`Start summing numbers ${a} and ${b}`);
        const result = a + b;
        logger.info(`Finish summing, result was ${result}`);
        return result;
    }
}


// index.js
const Logger = require('./logger');
const Calc = require('./calc');

// Initialise logger
const logger = Logger();

// Initialise module, injecting the logger dependency
const calc = Calc(logger);

// Run module
console.log(calc.sum(1, 2))
```

The above pattern is not the only way to do it, and not the most popular. These days it is common to use a Class, and to inject dependencies in through the constructor. Another popular technique is - using a test framework like Jest - to override Node's `require` function to intercept module loading. Various DI containers are available that solve the same problem.

In Javascript I prefer this module factory pattern as I consider it the simplest approach, and most idiomatic to the language.


## The module factory pattern in Typescript

In Typescript codebases it is standard to use the Class based approach. It's not obvious that this factory pattern can be used at all.

In the example above, `calc` has a dependency of `logger`, and it would be desirable to be able to type this.

Unfortunately the logger is only ever described in the return of its factory function - it is not available to be exposed directly to the module interface.

A standard solution given online is to repeat the definition of the logger as an exported interface or type, and to implement it in the factory.

```ts
export interface Logger {
    info: (args: any) => void
}

export function LoggerInit(): Logger {
    return {
        info: function(args: any): void {
          console.log(...arguments);
        }
    }
};
```

This is not ideal as it means repeating type definitions twice.

A better approach uses Typescript's `ReturnType` utility to automatically create an exportable type definition for the logger. Both the factory and type definition can be exported like so:

```ts
function LoggerInit() {
    return {
        info: function(args: any): void {
          console.log(...arguments);
        }
    }
};

export { LoggerInit };
export type Logger = ReturnType<typeof LoggerInit>;
```

See the code in this repository for the full example.

## Why not just use a class?

There doesn't seem to be much difference between the two. This version of the module-factory pattern, as well as class patterns, both composite together state, functions and identity.

I looked at this from the point of view of adding typing to an existing codebase that already used the factory-module pattern, so this approach may be most useful there to avoid significant refactoring.

Some pros and cons for each pattern:

Classes:
- the preferred approach of most Typescript developers, and therefore most code examples will show this approach.
- more performant when creating more than one of the same module (though in most CRUD web apps only one of each module is instantiated).
- more explicit about public and private functions, which may aid readability.

Factory-module:
- more idiomatic to standard functional Javascript, which for much of its life never had classes.
- potentially less verbose, which may aid readability.
- potentially easier for a developer to understand if they lack prior knowledge of OO programming.
- by avoiding the use of classes entirely, there is less risk of a developer bringing complicated OO patterns into the codebase (e.g. inheritance, which is often unwanted in a CRUD web app).

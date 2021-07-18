function create() {
    return {
        timeout: null,
        listener: {
            tick: ()=>{
            }
        }
    };
}
function start(state) {
    if (state.timeout !== null) return;
    state.timeout = setInterval(()=>{
        state.listener.tick();
    }, 1000);
}
function stop(state) {
    if (state.timeout === null) return;
    clearInterval(state.timeout);
    state.timeout = null;
}
const mod = function() {
    return {
        start: start,
        stop: stop
    };
}();
const mod1 = function() {
    return {
        behavior: mod,
        create
    };
}();
function create1() {
    return {
        value: 0,
        listener: {
            change: ()=>{
            }
        }
    };
}
function change(state, value) {
    state.value = value;
    state.listener.change(value);
}
function set(state, value) {
    if (state.value === value) return;
    change(state, value);
}
function increment(state) {
    set(state, state.value + 1);
}
function reset(state) {
    set(state, 0);
}
const mod2 = function() {
    return {
        change: change,
        set: set,
        increment: increment,
        reset: reset
    };
}();
const mod3 = function() {
    return {
        behavior: mod2,
        create: create1
    };
}();
function create2() {
    const dom = document.createElement("b");
    dom.innerHTML = "-";
    dom.style.fontSize = "100px";
    dom.style.background = "gray";
    dom.style.fontFamily = '"JetBrains Mono", monospace';
    return {
        dom,
        value: 0
    };
}
function set1(state, value) {
    const { dom , value: prevValue  } = state;
    if (value === prevValue) return;
    state.value = value;
    const output = String(Math.round(value));
    dom.innerHTML = output;
}
function reset1(state) {
    set1(state, 0);
    state.dom.style.background = "gray";
}
function increment1(state) {
    set1(state, state.value + 1);
    state.dom.style.background = "transparent";
}
const mod4 = function() {
    return {
        set: set1,
        reset: reset1,
        increment: increment1
    };
}();
const mod5 = function() {
    return {
        behavior: mod4,
        create: create2
    };
}();
function create3() {
    const counterView = mod5.create();
    const counter = {
        ...mod3.create(),
        listener: {
            change: (value)=>{
                mod5.behavior.set(counterView, value);
            }
        }
    };
    const clock = {
        ...mod1.create(),
        listener: {
            tick: ()=>{
                mod3.behavior.increment(counter);
            }
        }
    };
    return {
        root: document.body,
        clock,
        counter,
        counterView
    };
}
function render(state) {
    mod1.behavior.start(state.clock);
    state.root.appendChild(state.counterView.dom);
}
const mod6 = function() {
    return {
        render: render
    };
}();
new WebSocket("ws://localhost:1234").addEventListener("message", ()=>window.location.reload()
);
const state = create3();
mod6.render(state);

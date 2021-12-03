type Listener<EventType> = (event: EventType) => void;
type Observer<EventType> = {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
};

function createObserver<EventType>(): Observer<EventType> {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach(listener => listener(event));
    },
  };
}

const myListener: Listener<string> = event => {
  console.log(`Received event, listener 1: ${event}`);
};
const myListener2: Listener<string> = event => {
  console.log(`Received event, listener 2: ${event}`);
};

const myObserver = createObserver<string>();
const unsubscribe = myObserver.subscribe(myListener);

myObserver.publish('Hello 1');

myObserver.subscribe(myListener2);
myObserver.publish('Hello 2');

unsubscribe();

myObserver.publish('Hello 3');

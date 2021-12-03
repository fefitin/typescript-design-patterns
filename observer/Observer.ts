type Listener<EventType> = (event: EventType) => void;
class Observer<EventType> {
  listeners: Listener<EventType>[] = [];

  subscribe(listener: Listener<EventType>): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  publish(event: EventType) {
    this.listeners.forEach(listener => listener(event));
  }
}

const myListener: Listener<string> = event => {
  console.log(`Received event, listener 1: ${event}`);
};
const myListener2: Listener<string> = event => {
  console.log(`Received event, listener 2: ${event}`);
};

const myObserver = new Observer<string>();
const unsubscribe = myObserver.subscribe(myListener);

myObserver.publish('Hello 1');

myObserver.subscribe(myListener2);
myObserver.publish('Hello 2');

unsubscribe();

myObserver.publish('Hello 3');

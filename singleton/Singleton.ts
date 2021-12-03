interface BasicRecord {
  id: number;
}

interface KeyValueDatabase<T extends BasicRecord> {
  save(data: T): void;
  get(id: number): T | undefined;
}

function createKeyValueDatabase<T extends BasicRecord>() {
  class InMemoryKeyValueDatabase implements KeyValueDatabase<T> {
    static instance: InMemoryKeyValueDatabase = new InMemoryKeyValueDatabase();
    private data: Record<string, T> = {};

    private constructor() {}

    save(data: T): void {
      this.data[data.id] = data;
    }

    get(id: number): T | undefined {
      return this.data[id];
    }
  }

  return InMemoryKeyValueDatabase;
}

type Contact = {
  id: number;
  name: string;
  surname: string;
  phone?: string;
};

const DB = createKeyValueDatabase<Contact>();
DB.instance.save({ id: 1, name: 'Federico', surname: 'García' });
DB.instance.save({ id: 2, name: 'Juan', surname: 'Pérez' });
DB.instance.save({ id: 3, name: 'María', surname: 'Rodríguez' });

console.log(DB.instance.get(1));
console.log(DB.instance.get(5));

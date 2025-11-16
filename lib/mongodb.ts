import {
  MongoClient,
  ServerApiVersion,
  type Db,
  type MongoClientOptions,
} from "mongodb";

declare global {
   
  var mongoClient: MongoClient | undefined;
   
  var mongoClientPromise: Promise<MongoClient> | undefined;
   
  var mongoCleanupRegistered: boolean | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const mongoClientOptions: MongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const ensureClient = () => {
  if (!global.mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, mongoClientOptions);

    global.mongoClientPromise = client
      .connect()
      .then(async (connectedClient) => {
        await connectedClient.db("admin").command({ ping: 1 });
        global.mongoClient = connectedClient;
        return connectedClient;
      })
      .catch((error) => {
        global.mongoClientPromise = undefined;
        throw error;
      });
  }

  return global.mongoClientPromise;
};

const clientReady = ensureClient();

async function closeClient() {
  if (!global.mongoClient && global.mongoClientPromise) {
    try {
      await global.mongoClientPromise;
    } catch {
      // Swallow errors so shutdown can continue.
    }
  }

  if (global.mongoClient) {
    await global.mongoClient.close();
    global.mongoClient = undefined;
    global.mongoClientPromise = undefined;
  }
}

if (!global.mongoCleanupRegistered) {
  global.mongoCleanupRegistered = true;

  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

  signals.forEach((signal) => {
    process.once(signal, () => {
      closeClient()
        .catch((error) => {
          console.error("MONGODB_DISCONNECT_ERROR", error);
        })
        .finally(() => {
          process.exit(0);
        });
    });
  });

  process.once("beforeExit", () => {
    void closeClient();
  });
}

export function connectToDatabase(): Promise<MongoClient> {
  return clientReady;
}

export async function getMongoDatabase(name?: string): Promise<Db> {
  const client = await connectToDatabase();
  return name ? client.db(name) : client.db();
}

export async function disconnectFromDatabase() {
  await closeClient();
}

// Trigger the connection as soon as the module loads.
void clientReady;

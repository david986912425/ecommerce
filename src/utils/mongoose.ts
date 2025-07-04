import { connect, connection } from "mongoose";

const conn = {
    isConnected: false,
};

export async function dbConnect() {
    if (conn.isConnected) {
        return;
    }

    const db = await connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs"
    );

    conn.isConnected = db.connections[0].readyState === 1;
}

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.on("error", (err) => console.error("Mongodb Error:", err.message));

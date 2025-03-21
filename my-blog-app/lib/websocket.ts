import io from "socket.io-client";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "wss://fullstack.exercise.applifting.cz";

export const initSocket = () => {
  return io(WS_URL, {
    transports: ["websocket"],
    auth: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
  });
};

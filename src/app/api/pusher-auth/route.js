// pages/api/pusher-auth.js
import { pusherServer } from "../../libs/pusher";

export default (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusherServer.authenticate(socketId, channel);
  res.send(auth);
};

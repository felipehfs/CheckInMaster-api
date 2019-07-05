const User = require("../models/user");

module.exports = function(io) {
  let user = null;

  return function(socket) {
    socket.on("sendPositionToFriends", async data => {
      try {
        const changedUser = await User.findOneAndUpdate(
          { _id: data.id },
          {
            $set: {
              online: true,
              location: {
                type: "Point",
                coordinates: [...data.userPosition]
              }
            }
          }
        );

        user = emitPosition(user, changedUser, socket, data);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      if (!user) return
      User.findOneAndUpdate({ _id: user.id }, { $set: { online: false } }).then(
        updatedUser => {
          updatedUser.password = undefined;
          io.emit("friendOffline", updatedUser);
        }
      );
    });
  };
};

function emitPosition(user, changedUser, socket, data) {
  const isMoving = () =>
    user.location.coordinates[0] !== data.userPosition[0] &&
    user.location.coordinates[1] !== data.userPosition[1];

  if (!user) {
    changedUser.password = undefined;
    user = changedUser;
    socket.broadcast.emit("friendOnline", data);
  } else {
    if (isMoving()) {
      socket.broadcast.emit("friendOnline", data);
    }
  }
  return user;
}

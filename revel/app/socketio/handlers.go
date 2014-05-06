package socketio

import (
	"fmt"
	sio "github.com/googollee/go-socket.io"
)

func onConnect(ns *sio.NameSpace) {
	fmt.Printf("Connect: %v", ns.Id())
	ns.Emit("welcome", "Welcome aboard!")
}

func onDisconnect(ns *sio.NameSpace) {
	fmt.Printf("Disconnect: %v", ns.Id())
}

func onRevelRocks(ns *sio.NameSpace) {
	msg := fmt.Sprintf("Why thank you %s", ns.Id())
	ns.Emit("revelrocks", msg)
}

func registerHandlers(sioServer *sio.SocketIOServer) {
	sioServer.On("connect", onConnect)
	sioServer.On("disconnect", onConnect)
	sioServer.On("revelrocks", onRevelRocks)
}

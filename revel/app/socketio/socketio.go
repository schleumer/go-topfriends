package socketio

import (
	sio "github.com/googollee/go-socket.io"
	"github.com/revel/revel"
	"net/http"
	"strings"
)

var (
	sioServer   *sio.SocketIOServer
	revelHandle http.Handler
)

func handle(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	// route socketio requests to the socketio handler
	// and send everything else to the revel handler
	if strings.HasPrefix(path, "/socket.io/1/") {
		sioServer.ServeHTTP(w, r)
	} else {
		revelHandle.ServeHTTP(w, r)
	}
}

func PatchServer() {
	// create socketio server config
	config := &sio.Config{}
	config.HeartbeatTimeout = 2
	config.ClosingTimeout = 4

	// create socketio server
	sioServer = sio.NewSocketIOServer(config)

	// register global and namespace handlers
	registerHandlers(sioServer)

	// store a reference to revel's old http.Handler
	revelHandle = revel.Server.Handler

	// replace revel.Server.Handler with our new handler
	revel.Server.Handler = http.HandlerFunc(handle)
}

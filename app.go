package main

import "github.com/schleumer/go-mvc"
import "github.com/schleumer/go-topfriends/controllers"

func main() {
	var app = gomvc.GotServed()

	app.Routing = gomvc.RouteMap{
		"GET /":     controllers.Index.Index,
		"GET /test": controllers.Index.Test,
	}

	app.Run()
}

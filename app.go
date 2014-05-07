package main

import "github.com/schleumer/go-mvc"
import "github.com/schleumer/go-topfriends/controllers"
import "path"
import "os"
import "fmt"

func main() {
	app := gomvc.GotServed()
	root, _ := os.Getwd()
	app.StaticRoot = path.Join(root, "static", "public")
	app.ViewsRoot = path.Join(root, "views")
	app.Routing = gomvc.RouteMap{
		"GET /":     controllers.Index.Index,
		"GET /test": controllers.Index.Test,
		"GET /pool": controllers.Index.Pool,
	}
	fmt.Println("hello world")
	app.Run()
}

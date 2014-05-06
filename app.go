package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/schleumer/go-topfriends/conf"
	"log"
	"net/http"
	"os"
	"reflect"
	"regexp"
	"strings"
	"time"
)

func handle(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "<script>console.log('xd');</script>\n"+strings.Repeat("\n", 1024))
	f := res.(http.Flusher)
	f.Flush()
	amt := time.Duration(10000)
	time.Sleep(time.Millisecond * amt)
	fmt.Fprintf(res, "<script>console.log('cu');</script>\n")
}

func handle2(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, `
        <html>
            <head>
            </head>  
            <body>
                <iframe id="transport"></iframe>
                <script type="text/javascript">
                    document.onreadystatechange = function(){
                        if(document.readyState == "complete"){
                            //document.getElementById("transport").src = "/"
                        }
                    }
                </script>
            </body>
        </html>
    `)
}

type FutureReq func(res http.ResponseWriter, req *http.Request)

func ReqWrapper(name string) FutureReq {
	return func(res http.ResponseWriter, req *http.Request) {
		daType := reflect.ValueOf(Controller{}).MethodByName("handle2")

		fmt.Println(daType)

		//in := []reflect.Value{reflect.ValueOf(res), reflect.ValueOf(req)}
		//fmt.Println(f.Type())
		daType.Call([]reflect.Value{})
	}
}

func main() {
	// http.HandleFunc("/", handle)
	// http.HandleFunc("/test", handle2)
	// if err := http.ListenAndServe(":8080", nil); err != nil {
	// 	panic(err)
	// }\
	r := mux.NewRouter()

	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	for _, v := range conf.Routes {
		reg := regexp.MustCompile(`[^\s\t]+`)
		routeParams := reg.FindAllString(v, -1)
		method := routeParams[0]
		route := routeParams[1]
		handler := routeParams[2]
		r.HandleFunc(route, ReqWrapper(handler)).Methods(method)
		fmt.Println(route)
		fmt.Println(method)
	}

	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)
}

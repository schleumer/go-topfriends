package controllers

import (
	"github.com/schleumer/go-mvc"
	"time"
)

type Index struct{}

func (c Index) Index(w gomvc.Wrapper) {
	w.Write(`
        <html>
            <head>
            </head>  
            <body>
                <iframe id="transport"></iframe>
                <script type="text/javascript">
                    document.onreadystatechange = function(){
                        if(document.readyState == "complete"){
                            document.getElementById("transport").src = "/pool"
                        }
                    }
                </script>
            </body>
        </html>
    `)
	w.Render("index.html")
}

func (c Index) Test(w gomvc.Wrapper) {
	w.Write("shit")
}

func (c Index) Pool(w gomvc.Wrapper) {
	w.Push("Gay")
	amt := time.Duration(1000)
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	time.Sleep(time.Millisecond * amt)
	w.Push("Gay")
	w.End()
}

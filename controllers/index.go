package controllers

import (
	"github.com/schleumer/go-mvc"
)

type Index struct {
	*gomvc.Controller
}

func (c Index) Index(wrapper gomvc.Wrapper) {
	wrapper.Write(`
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

func (c Index) Test(w gomvc.Wrapper) {
	w.Write("shit")
}

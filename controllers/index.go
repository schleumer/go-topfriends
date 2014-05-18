package controllers

import (
	"encoding/json"
	//"fmt"
	"github.com/schleumer/go-mvc"
	"time"
)

type Index struct{}

func (c Index) Index(w gomvc.Wrapper) {
	w.Session.Values["xd2"] = "lel"
	w.SaveSession()
	w.RenderWithVars("index.html", gomvc.TemplateVars{
		"ay": gomvc.TemplateVars{
			"ay": "lmao",
		},
	})
}

func (c Index) Test(w gomvc.Wrapper) {
	var m, _ = json.Marshal(w.Session.Values["xd2"])
	w.Write(string(m))
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
